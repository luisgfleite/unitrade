import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Loader2, ShoppingCart, Receipt } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { fetchMyOrders, formatPrice, FALLBACK_IMG, Order } from '../../lib/data';
import { BottomNav } from './shared/BottomNav';

const STATUS_LABEL: Record<Order['status'], { text: string; cls: string }> = {
  awaiting_payment: { text: 'Aguardando pagamento', cls: 'bg-amber-500' },
  paid: { text: 'Em garantia', cls: 'bg-blue-500' },
  completed: { text: 'Concluído', cls: 'bg-green-600' },
  cancelled: { text: 'Cancelado', cls: 'bg-gray-400' },
};

export function Pedidos() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [buying, setBuying] = useState<Order[]>([]);
  const [selling, setSelling] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    Promise.all([
      fetchMyOrders('buyer', session.user.id),
      fetchMyOrders('seller', session.user.id),
    ]).then(([b, s]) => {
      setBuying(b);
      setSelling(s);
      setLoading(false);
    });
  }, [session]);

  const card = (o: Order, role: 'buyer' | 'seller') => {
    const other = role === 'buyer' ? o.seller : o.buyer;
    const st = STATUS_LABEL[o.status];
    return (
      <Card
        key={o.id}
        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => navigate(`/pedido/${o.id}`)}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <img
            src={o.listing_image || FALLBACK_IMG}
            alt={o.listing_title || ''}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
            onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_IMG)}
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{o.listing_title}</p>
            <p className="text-lg font-bold text-purple-600">{formatPrice(o.amount)}</p>
            <p className="text-xs text-gray-500 truncate">
              {role === 'buyer' ? 'Vendedor' : 'Comprador'}: {other?.full_name || 'Estudante'}
            </p>
          </div>
          <Badge className={st.cls}>{st.text}</Badge>
        </CardContent>
      </Card>
    );
  };

  const empty = (text: string, Icon: any) => (
    <div className="text-center py-16 text-gray-400">
      <Icon className="w-12 h-12 mx-auto mb-3" />
      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-3">Meus Pedidos</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-28">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <Tabs defaultValue="buying">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="buying">Comprando ({buying.length})</TabsTrigger>
              <TabsTrigger value="selling">Vendendo ({selling.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="buying" className="space-y-4">
              {buying.length === 0 ? empty('Você ainda não comprou nada', ShoppingCart) : buying.map((o) => card(o, 'buyer'))}
            </TabsContent>
            <TabsContent value="selling" className="space-y-4">
              {selling.length === 0 ? empty('Nenhuma venda ainda', Receipt) : selling.map((o) => card(o, 'seller'))}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
