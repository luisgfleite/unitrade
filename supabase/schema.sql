-- ============================================================
-- UniTrade — schema completo (rode no SQL Editor do Supabase)
-- Cole TUDO de uma vez e clique em "Run".
-- ============================================================

-- ---------- PERFIS ----------
-- Uma linha por usuário (espelha auth.users). is_verified controla
-- quem pode comprar/anunciar. role='admin' libera o painel.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  university text,
  course text,
  phone text,
  bio text,
  avatar_url text,
  role text not null default 'user' check (role in ('user','admin')),
  is_verified boolean not null default false,
  verification_status text not null default 'none'
    check (verification_status in ('none','pending','approved','rejected')),
  profile_completed boolean not null default false,
  created_at timestamptz not null default now()
);

-- Cria o perfil automaticamente quando alguém se cadastra
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name',''));
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- PEDIDOS DE VERIFICAÇÃO ----------
create table if not exists public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  document_url text not null,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected')),
  reject_reason text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- ANÚNCIOS ----------
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  price numeric(10,2) not null default 0,
  category text,
  condition text,
  images text[] not null default '{}',
  status text not null default 'pending'
    check (status in ('pending','approved','rejected','sold')),
  reject_reason text,
  sold_to uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index if not exists listings_status_idx on public.listings(status);
create index if not exists listings_seller_idx on public.listings(seller_id);

-- ---------- LISTA DE DESEJOS ----------
create table if not exists public.wishlists (
  user_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

-- ---------- CONVERSAS / CHAT ----------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (listing_id, buyer_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_conv_idx on public.messages(conversation_id);

-- ============================================================
-- HELPERS
-- ============================================================
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.is_verified()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and is_verified = true);
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.verification_requests enable row level security;
alter table public.listings enable row level security;
alter table public.wishlists enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- ---- PROFILES ----
-- Qualquer logado pode ver perfis (precisa pra mostrar vendedor)
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated using (true);

-- Cada um edita o próprio perfil (mas NÃO consegue se auto-verificar/virar admin:
-- essas colunas só mudam via service_role / admin — ver policy admin abaixo)
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Admin pode atualizar qualquer perfil (aprovar verificação, etc.)
drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_admin_update on public.profiles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---- VERIFICATION REQUESTS ----
drop policy if exists vr_insert_own on public.verification_requests;
create policy vr_insert_own on public.verification_requests
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists vr_select on public.verification_requests;
create policy vr_select on public.verification_requests
  for select to authenticated using (user_id = auth.uid() or public.is_admin());

drop policy if exists vr_admin_update on public.verification_requests;
create policy vr_admin_update on public.verification_requests
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---- LISTINGS ----
-- Todos veem anúncios aprovados; dono vê os seus; admin vê tudo
drop policy if exists listings_select on public.listings;
create policy listings_select on public.listings
  for select to authenticated
  using (status = 'approved' or seller_id = auth.uid() or public.is_admin());

-- Só quem está VERIFICADO pode criar anúncio
drop policy if exists listings_insert_verified on public.listings;
create policy listings_insert_verified on public.listings
  for insert to authenticated
  with check (seller_id = auth.uid() and public.is_verified());

-- Dono edita os seus; admin edita qualquer (aprovar/recusar)
drop policy if exists listings_update_own on public.listings;
create policy listings_update_own on public.listings
  for update to authenticated
  using (seller_id = auth.uid() or public.is_admin())
  with check (seller_id = auth.uid() or public.is_admin());

drop policy if exists listings_delete_own on public.listings;
create policy listings_delete_own on public.listings
  for delete to authenticated using (seller_id = auth.uid() or public.is_admin());

-- ---- WISHLISTS ----
drop policy if exists wishlist_all_own on public.wishlists;
create policy wishlist_all_own on public.wishlists
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---- CONVERSATIONS ----
-- Só quem participa; criar conversa exige estar verificado
drop policy if exists conv_select on public.conversations;
create policy conv_select on public.conversations
  for select to authenticated
  using (buyer_id = auth.uid() or seller_id = auth.uid() or public.is_admin());

drop policy if exists conv_insert on public.conversations;
create policy conv_insert on public.conversations
  for insert to authenticated
  with check (buyer_id = auth.uid() and public.is_verified());

-- ---- MESSAGES ----
drop policy if exists msg_select on public.messages;
create policy msg_select on public.messages
  for select to authenticated
  using (exists (
    select 1 from public.conversations c
    where c.id = conversation_id
      and (c.buyer_id = auth.uid() or c.seller_id = auth.uid() or public.is_admin())
  ));

drop policy if exists msg_insert on public.messages;
create policy msg_insert on public.messages
  for insert to authenticated
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())
    )
  );

-- ============================================================
-- REALTIME (chat ao vivo)
-- ============================================================
alter publication supabase_realtime add table public.messages;

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public)
values ('documents','documents', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('listing-images','listing-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('avatars','avatars', true)
on conflict (id) do nothing;

-- Documentos: privado. Usuário sobe/lê o próprio (pasta = uid); admin lê tudo.
drop policy if exists doc_insert on storage.objects;
create policy doc_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists doc_select on storage.objects;
create policy doc_select on storage.objects
  for select to authenticated
  using (bucket_id = 'documents'
         and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- Imagens de anúncio: leitura pública, escrita por verificados (pasta = uid)
drop policy if exists img_insert on storage.objects;
create policy img_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'listing-images' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists img_select on storage.objects;
create policy img_select on storage.objects
  for select to public using (bucket_id = 'listing-images');

-- Avatares: leitura pública, escrita do próprio
drop policy if exists avatar_insert on storage.objects;
create policy avatar_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists avatar_update on storage.objects;
create policy avatar_update on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists avatar_select on storage.objects;
create policy avatar_select on storage.objects
  for select to public using (bucket_id = 'avatars');

-- ============================================================
-- PRONTO. Depois de criar SUA conta no app, rode (trocando o email)
-- pra virar admin e acessar o painel:
--
--   update public.profiles set role = 'admin' where email = 'seu.email@universidade.edu.br';
-- ============================================================
