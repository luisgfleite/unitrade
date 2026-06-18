-- ============================================================
-- UniTrade — Endereço/ponto de encontro nos anúncios (rode após orders.sql)
-- ============================================================

-- Endereço do ponto de encontro no anúncio
alter table public.listings add column if not exists cep text;
alter table public.listings add column if not exists street text;
alter table public.listings add column if not exists number text;
alter table public.listings add column if not exists complement text;
alter table public.listings add column if not exists neighborhood text;
alter table public.listings add column if not exists city text;
alter table public.listings add column if not exists state text;

-- Snapshot do endereço no pedido (não depende da RLS do anúncio depois)
alter table public.orders add column if not exists meeting_address text;

-- Recria create_order para gravar o endereço de encontro no pedido
create or replace function public.create_order(p_listing uuid)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_listing public.listings; v_id uuid; v_addr text;
begin
  if not public.is_verified() then raise exception 'Conta não verificada'; end if;
  select * into v_listing from public.listings where id = p_listing;
  if v_listing.id is null then raise exception 'Anúncio não encontrado'; end if;
  if v_listing.status <> 'approved' then raise exception 'Anúncio indisponível'; end if;
  if v_listing.seller_id = auth.uid() then raise exception 'Você não pode comprar seu próprio anúncio'; end if;

  select id into v_id from public.orders
   where listing_id = p_listing and buyer_id = auth.uid()
     and status in ('awaiting_payment','paid');
  if v_id is not null then return v_id; end if;

  v_addr := nullif(
    concat_ws(' - ',
      nullif(concat_ws(', ',
        nullif(trim(coalesce(v_listing.street,'') || ' ' || coalesce(v_listing.number,'')), ''),
        v_listing.neighborhood
      ), ''),
      nullif(concat_ws('/', v_listing.city, v_listing.state), '')
    ), '');

  insert into public.orders (listing_id, buyer_id, seller_id, listing_title, listing_image, amount, meeting_address)
  values (p_listing, auth.uid(), v_listing.seller_id, v_listing.title,
          (case when array_length(v_listing.images,1) > 0 then v_listing.images[1] else null end),
          v_listing.price, v_addr)
  returning id into v_id;
  return v_id;
end; $$;
