import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  // Erro claro no console se as variáveis não foram configuradas
  console.error(
    '[UniTrade] Faltam variáveis de ambiente. Copie .env.example para .env.local e preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
  );
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// ---- Tipos centrais (espelham o schema.sql) ----
export type Role = 'user' | 'admin';
export type VerificationStatus = 'none' | 'pending' | 'approved' | 'rejected';
export type ListingStatus = 'pending' | 'approved' | 'rejected' | 'sold';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  university: string | null;
  course: string | null;
  phone: string | null;
  bio: string | null;
  avatar_url: string | null;
  role: Role;
  is_verified: boolean;
  verification_status: VerificationStatus;
  profile_completed: boolean;
  created_at: string;
}

export interface Listing {
  id: string;
  seller_id: string;
  title: string;
  description: string | null;
  price: number;
  category: string | null;
  condition: string | null;
  images: string[];
  status: ListingStatus;
  reject_reason: string | null;
  sold_to: string | null;
  created_at: string;
  approved_at: string | null;
  cep: string | null;
  street: string | null;
  number: string | null;
  complement: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
}
