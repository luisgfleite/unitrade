-- ============================================================
-- UniTrade — Pedidos com escrow (rode DEPOIS do schema.sql)
-- Fluxo: aguardando pagamento → pago (em garantia) → concluído (liberado)
--        com cancelamento/estorno.
-- ============================================================

-- Permite o status "reserved" no anúncio (reservado enquanto em garantia)
alter table public.listings drop constraint if exists listings_status_check;
alter table public.listings add constraint listings_status_check
  check (status in ('pending','approved','rejected','sold','reserved'));

-- ---------- PEDIDOS ----------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  -- snapshot do item (não depende de RLS do anúncio depois)
  listing_title text,
  listing_image text,
  amount numeric(10,2) not null default 0,
  status text not null default 'awaiting_payment'
    check (status in ('awaiting_payment','paid','completed','cancelled')),
  payment_method text,
  shipped boolean not null default false,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  shipped_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz
);

create index if not exists orders_buyer_idx on public.orders(buyer_id);
create index if not exists orders_seller_idx on public.orders(seller_id);

alter table public.orders enable row level security;

-- Só comprador/vendedor/admin enxergam o pedido
drop policy if exists orders_select on public.orders;
create policy orders_select on public.orders
  for select to authenticated
  using (buyer_id = auth.uid() or seller_id = auth.uid() or public.is_admin());

-- Mutações acontecem só pelas funções abaixo (security definer)
alter publication supabase_realtime add table public.orders;

-- ============================================================
-- TRANSIÇÕES DE ESTADO (funções seguras)
-- ============================================================

-- Cria pedido (comprador verificado, anúncio aprovado, não é o próprio)
create or replace function public.create_order(p_listing uuid)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_listing public.listings; v_id uuid;
begin
  if not public.is_verified() then raise exception 'Conta não verificada'; end if;
  select * into v_listing from public.listings where id = p_listing;
  if v_listing.id is null then raise exception 'Anúncio não encontrado'; end if;
  if v_listing.status <> 'approved' then raise exception 'Anúncio indisponível'; end if;
  if v_listing.seller_id = auth.uid() then raise exception 'Você não pode comprar seu próprio anúncio'; end if;

  -- reaproveita pedido em aberto do mesmo comprador
  select id into v_id from public.orders
   where listing_id = p_listing and buyer_id = auth.uid()
     and status in ('awaiting_payment','paid');
  if v_id is not null then return v_id; end if;

  insert into public.orders (listing_id, buyer_id, seller_id, listing_title, listing_image, amount)
  values (p_listing, auth.uid(), v_listing.seller_id, v_listing.title,
          (case when array_length(v_listing.images,1) > 0 then v_listing.images[1] else null end),
          v_listing.price)
  returning id into v_id;
  return v_id;
end; $$;

-- Comprador paga → valor em garantia, anúncio reservado
create or replace function public.pay_order(p_order uuid, p_method text)
returns void language plpgsql security definer set search_path = public as $$
declare v public.orders;
begin
  select * into v from public.orders where id = p_order;
  if v.id is null then raise exception 'Pedido não encontrado'; end if;
  if v.buyer_id <> auth.uid() then raise exception 'Sem permissão'; end if;
  if v.status <> 'awaiting_payment' then raise exception 'Pedido não está aguardando pagamento'; end if;

  update public.orders set status = 'paid', payment_method = p_method, paid_at = now() where id = p_order;
  update public.listings set status = 'reserved' where id = v.listing_id and status = 'approved';
end; $$;

-- Vendedor marca como enviado/entregue (informativo)
create or replace function public.mark_shipped(p_order uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v public.orders;
begin
  select * into v from public.orders where id = p_order;
  if v.id is null then raise exception 'Pedido não encontrado'; end if;
  if v.seller_id <> auth.uid() then raise exception 'Sem permissão'; end if;
  if v.status <> 'paid' then raise exception 'Pedido não está pago'; end if;
  update public.orders set shipped = true, shipped_at = now() where id = p_order;
end; $$;

-- Comprador confirma recebimento → libera pro vendedor, anúncio vendido
create or replace function public.confirm_delivery(p_order uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v public.orders;
begin
  select * into v from public.orders where id = p_order;
  if v.id is null then raise exception 'Pedido não encontrado'; end if;
  if v.buyer_id <> auth.uid() then raise exception 'Sem permissão'; end if;
  if v.status <> 'paid' then raise exception 'Pedido não está em garantia'; end if;

  update public.orders set status = 'completed', completed_at = now() where id = p_order;
  update public.listings set status = 'sold', sold_to = v.buyer_id where id = v.listing_id;
end; $$;

-- Cancela/estorna (comprador ou vendedor) enquanto não concluído
create or replace function public.cancel_order(p_order uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v public.orders;
begin
  select * into v from public.orders where id = p_order;
  if v.id is null then raise exception 'Pedido não encontrado'; end if;
  if v.buyer_id <> auth.uid() and v.seller_id <> auth.uid() then raise exception 'Sem permissão'; end if;
  if v.status not in ('awaiting_payment','paid') then raise exception 'Não é possível cancelar'; end if;

  update public.orders set status = 'cancelled', cancelled_at = now() where id = p_order;
  -- devolve o anúncio ao feed se estava reservado
  update public.listings set status = 'approved' where id = v.listing_id and status = 'reserved';
end; $$;

grant execute on function
  public.create_order(uuid),
  public.pay_order(uuid, text),
  public.mark_shipped(uuid),
  public.confirm_delivery(uuid),
  public.cancel_order(uuid)
to authenticated;
