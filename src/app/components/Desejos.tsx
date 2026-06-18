import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowLeft, Search, Heart, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import {
  fetchWishlistListings,
  toggleWishlist,
  formatPrice,
  FALLBACK_IMG,
  ListingWithSeller,
} from '../../lib/data';
import { BottomNav } from './shared/BottomNav';

export function Desejos() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [items, setItems] = useState<ListingWithSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!session) return;
    fetchWishlistListings(session.user.id).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [session]);

  async function remove(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (!session) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      await toggleWishlist(session.user.id, id, false);
      toast.success('Removido dos favoritos');
    } catch {
      toast.error('Erro ao remover');
    }
  }

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold ml-3">Lista de Desejos</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar nos favoritos..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-28">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum favorito ainda</h3>
            <p className="text-gray-500 mb-6">Explore produtos e adicione aos favoritos</p>
            <Button
              onClick={() => navigate('/home')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Explorar produtos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative">
                <button
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 z-10 group"
                  onClick={(e) => remove(e, item.id)}
                  aria-label="Remover"
                >
                  <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-500" />
                </button>
                <div onClick={() => navigate(`/produto/${item.id}`)}>
                  <img
                    src={item.images?.[0] || FALLBACK_IMG}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_IMG)}
                  />
                  <CardContent className="p-3 space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                    <p className="text-lg font-bold text-purple-600">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                          {(item.seller?.full_name || '?')[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 truncate">
                          {item.seller?.full_name || 'Estudante'}
                        </p>
                        {item.seller?.course && (
                          <Badge variant="secondary" className="text-xs">
                            {item.seller.course}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
