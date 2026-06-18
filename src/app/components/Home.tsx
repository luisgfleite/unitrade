import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Search, Heart, Loader2, ShieldCheck, PackageOpen } from 'lucide-react';

const CATEGORIES = ['Todos', 'Eletrônicos', 'Livros', 'Roupas', 'Calçados', 'Acessórios', 'Outros'];
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import {
  fetchFeed,
  fetchWishlistIds,
  toggleWishlist,
  formatPrice,
  FALLBACK_IMG,
  ListingWithSeller,
} from '../../lib/data';
import { BottomNav } from './shared/BottomNav';
import { VerifyBanner } from './shared/VerifyBanner';

export function Home() {
  const navigate = useNavigate();
  const { session, profile, isAdmin } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [listings, setListings] = useState<ListingWithSeller[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (term?: string) => {
    setLoading(true);
    const data = await fetchFeed(term);
    setListings(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    if (session) fetchWishlistIds(session.user.id).then(setWishlist);
  }, [load, session]);

  // Busca com debounce
  useEffect(() => {
    const t = setTimeout(() => load(search), 350);
    return () => clearTimeout(t);
  }, [search, load]);

  async function handleHeart(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (!session) return;
    const on = !wishlist.has(id);
    const next = new Set(wishlist);
    on ? next.add(id) : next.delete(id);
    setWishlist(next);
    try {
      await toggleWishlist(session.user.id, id, on);
    } catch {
      toast.error('Não foi possível atualizar os favoritos');
      load(search);
    }
  }

  const visible =
    category === 'Todos' ? listings : listings.filter((l) => l.category === category);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              UniTrade
            </h1>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button onClick={() => navigate('/admin')} variant="outline" size="sm">
                  <ShieldCheck className="w-4 h-4 mr-1" /> Admin
                </Button>
              )}
              <Avatar
                className="w-9 h-9 cursor-pointer"
                onClick={() => navigate('/perfil')}
              >
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm">
                  {(profile?.full_name || profile?.email || 'U')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produtos..."
              className="pl-10 pr-4"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm transition-colors ${
                  category === c
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 pb-28 space-y-4">
        <VerifyBanner />

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <PackageOpen className="w-16 h-16 mx-auto mb-4" />
            <p className="font-medium text-gray-600">
              {search || category !== 'Todos' ? 'Nenhum produto encontrado' : 'Ainda não há anúncios por aqui'}
            </p>
            <p className="text-sm">
              {search || category !== 'Todos' ? 'Tente outra busca ou categoria' : 'Que tal ser o primeiro a anunciar?'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
              >
              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full"
                onClick={() => navigate(`/produto/${p.id}`)}
              >
                <div className="relative">
                  <img
                    src={p.images?.[0] || FALLBACK_IMG}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_IMG)}
                  />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                    onClick={(e) => handleHeart(e, p.id)}
                    aria-label="Favoritar"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlist.has(p.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                <CardContent className="p-3 space-y-2">
                  <h3 className="font-semibold text-sm line-clamp-2">{p.title}</h3>
                  <p className="text-lg font-bold text-purple-600">{formatPrice(p.price)}</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                        {(p.seller?.full_name || '?')[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 truncate">
                        {p.seller?.full_name || 'Estudante'}
                      </p>
                      {p.seller?.course && (
                        <Badge variant="secondary" className="text-xs">
                          {p.seller.course}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
