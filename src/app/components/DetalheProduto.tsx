import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, Heart, Clock, MapPin, MessageCircle, ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import { formatAddress } from '../../lib/cep';
import {
  fetchListing, fetchWishlistIds, toggleWishlist, createOrder, formatPrice, FALLBACK_IMG, ListingWithSeller,
} from '../../lib/data';

export function DetalheProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { session, isVerified } = useAuth();
  const [product, setProduct] = useState<ListingWithSeller | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [starting, setStarting] = useState(false);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchListing(id).then((p) => {
      setProduct(p);
      setLoading(false);
    });
    if (session) fetchWishlistIds(session.user.id).then((s) => setLiked(s.has(id)));
  }, [id, session]);

  async function toggleLike() {
    if (!session || !id) return;
    const on = !liked;
    setLiked(on);
    try {
      await toggleWishlist(session.user.id, id, on);
    } catch {
      setLiked(!on);
      toast.error('Erro ao favoritar');
    }
  }

  function requireVerified(): boolean {
    if (!isVerified) {
      toast.error('Verifique sua conta para negociar.');
      navigate('/verificacao');
      return false;
    }
    return true;
  }

  async function startChat() {
    if (!product || !session) return;
    if (product.seller_id === session.user.id) {
      toast.info('Este anúncio é seu.');
      return;
    }
    if (!requireVerified()) return;

    setStarting(true);
    try {
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .eq('listing_id', product.id)
        .eq('buyer_id', session.user.id)
        .maybeSingle();

      let convId = existing?.id;
      if (!convId) {
        const { data, error } = await supabase
          .from('conversations')
          .insert({ listing_id: product.id, buyer_id: session.user.id, seller_id: product.seller_id })
          .select('id')
          .single();
        if (error) throw error;
        convId = data.id;
      }
      navigate(`/chat?c=${convId}`);
    } catch (err: any) {
      toast.error('Erro ao abrir conversa: ' + (err.message ?? ''));
    } finally {
      setStarting(false);
    }
  }

  async function buyNow() {
    if (!product || !session) return;
    if (product.seller_id === session.user.id) {
      toast.info('Este anúncio é seu.');
      return;
    }
    if (!requireVerified()) return;
    setBuying(true);
    try {
      const orderId = await createOrder(product.id);
      navigate(`/pagamento?order=${orderId}`);
    } catch (err: any) {
      toast.error(err.message ?? 'Erro ao iniciar compra');
    } finally {
      setBuying(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-500">Produto não encontrado.</p>
        <Button onClick={() => navigate('/home')}>Voltar ao início</Button>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [FALLBACK_IMG];
  const isOwn = product.seller_id === session?.user.id;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleLike}>
            <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative overflow-hidden bg-white">
          <div className="flex overflow-x-auto snap-x snap-mandatory">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className="w-full h-96 object-cover flex-shrink-0 snap-center"
                onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_IMG)}
              />
            ))}
          </div>
        </div>

        <div className="p-4 bg-white space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.category && <Badge variant="secondary">{product.category}</Badge>}
                  {product.condition && <Badge variant="outline">{product.condition}</Badge>}
                </div>
              </div>
            </div>
            <span className="text-3xl font-bold text-purple-600">{formatPrice(product.price)}</span>
          </div>

          <Separator />

          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              Publicado em {new Date(product.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>

          {formatAddress(product as any) && (
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-purple-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-800">Ponto de encontro</p>
                <p>{formatAddress(product as any)}</p>
                {product.complement && <p className="text-gray-500">{product.complement}</p>}
              </div>
            </div>
          )}

          <Separator />

          <div>
            <h2 className="font-semibold mb-2">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{product.description || 'Sem descrição.'}</p>
          </div>

          <Separator />

          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100">
            <CardContent className="p-4 flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  {(product.seller?.full_name || '?')[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{product.seller?.full_name || 'Estudante'}</p>
                <p className="text-sm text-gray-600">
                  {product.seller?.course || ''} {product.seller?.university ? `· ${product.seller.university}` : ''}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {!isOwn && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-2xl mx-auto flex gap-3">
            <Button
              variant="outline"
              size="lg"
              disabled={starting}
              className="flex-1"
              onClick={startChat}
            >
              {starting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <MessageCircle className="w-5 h-5 mr-2" />}
              Conversar
            </Button>
            <Button
              size="lg"
              disabled={buying}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={buyNow}
            >
              {buying ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <ShoppingCart className="w-5 h-5 mr-2" />}
              Comprar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
