import { supabase, Listing } from './supabase';

export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#ede9fe"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="#a78bfa" text-anchor="middle" dy=".3em">UniTrade</text></svg>`
  );

export function formatPrice(value: number): string {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export interface Seller {
  id?: string;
  full_name: string | null;
  course: string | null;
  university?: string | null;
  avatar_url?: string | null;
}

export interface ListingWithSeller extends Listing {
  seller: Seller | null;
}

const SELECT_WITH_SELLER =
  '*, seller:profiles!listings_seller_id_fkey(id,full_name,course,university,avatar_url)';

// Feed: só anúncios aprovados (RLS reforça). Busca opcional por título.
export async function fetchFeed(search?: string): Promise<ListingWithSeller[]> {
  let q = supabase
    .from('listings')
    .select(SELECT_WITH_SELLER)
    .eq('status', 'approved')
    .order('approved_at', { ascending: false });

  if (search && search.trim()) {
    q = q.ilike('title', `%${search.trim()}%`);
  }
  const { data } = await q;
  return (data as any) ?? [];
}

export async function fetchListing(id: string): Promise<ListingWithSeller | null> {
  const { data } = await supabase
    .from('listings')
    .select(SELECT_WITH_SELLER)
    .eq('id', id)
    .single();
  return (data as any) ?? null;
}

// IDs dos anúncios que o usuário favoritou
export async function fetchWishlistIds(userId: string): Promise<Set<string>> {
  const { data } = await supabase.from('wishlists').select('listing_id').eq('user_id', userId);
  return new Set((data ?? []).map((r: any) => r.listing_id));
}

// Anúncios favoritados (com dados completos) — para a tela de Desejos
export async function fetchWishlistListings(userId: string): Promise<ListingWithSeller[]> {
  const { data } = await supabase
    .from('wishlists')
    .select(`listing:listings(${SELECT_WITH_SELLER})`)
    .eq('user_id', userId);
  return ((data ?? []) as any[]).map((r) => r.listing).filter(Boolean);
}

export async function toggleWishlist(userId: string, listingId: string, on: boolean) {
  if (on) {
    await supabase.from('wishlists').insert({ user_id: userId, listing_id: listingId });
  } else {
    await supabase.from('wishlists').delete().match({ user_id: userId, listing_id: listingId });
  }
}

// ---------- PEDIDOS (escrow) ----------
export type OrderStatus = 'awaiting_payment' | 'paid' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  listing_title: string | null;
  listing_image: string | null;
  amount: number;
  status: OrderStatus;
  payment_method: string | null;
  shipped: boolean;
  created_at: string;
  paid_at: string | null;
  shipped_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  meeting_address: string | null;
  buyer?: Seller | null;
  seller?: Seller | null;
}

export const SERVICE_FEE = 5; // taxa de serviço simulada

export async function createOrder(listingId: string): Promise<string> {
  const { data, error } = await supabase.rpc('create_order', { p_listing: listingId });
  if (error) throw error;
  return data as string;
}

export async function fetchOrder(id: string): Promise<Order | null> {
  const { data } = await supabase
    .from('orders')
    .select(
      '*, buyer:profiles!orders_buyer_id_fkey(id,full_name,course), seller:profiles!orders_seller_id_fkey(id,full_name,course)'
    )
    .eq('id', id)
    .single();
  return (data as any) ?? null;
}

export async function fetchMyOrders(role: 'buyer' | 'seller', userId: string): Promise<Order[]> {
  const col = role === 'buyer' ? 'buyer_id' : 'seller_id';
  const { data } = await supabase
    .from('orders')
    .select(
      '*, buyer:profiles!orders_buyer_id_fkey(id,full_name,course), seller:profiles!orders_seller_id_fkey(id,full_name,course)'
    )
    .eq(col, userId)
    .order('created_at', { ascending: false });
  return (data as any) ?? [];
}

export async function payOrder(orderId: string, method: string) {
  const { error } = await supabase.rpc('pay_order', { p_order: orderId, p_method: method });
  if (error) throw error;
}
export async function markShipped(orderId: string) {
  const { error } = await supabase.rpc('mark_shipped', { p_order: orderId });
  if (error) throw error;
}
export async function confirmDelivery(orderId: string) {
  const { error } = await supabase.rpc('confirm_delivery', { p_order: orderId });
  if (error) throw error;
}
export async function cancelOrder(orderId: string) {
  const { error } = await supabase.rpc('cancel_order', { p_order: orderId });
  if (error) throw error;
}
