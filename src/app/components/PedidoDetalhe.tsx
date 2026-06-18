import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  ArrowLeft, Loader2, CreditCard, ShieldCheck, Truck, PackageCheck,
  XCircle, Check, MessageCircle, MapPin,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import {
  fetchOrder, confirmDelivery, markShipped, cancelOrder,
  formatPrice, FALLBACK_IMG, Order,
} from '../../lib/data';

const STEPS = [
  { key: 'awaiting_payment', label: 'Pagamento', icon: CreditCard },
  { key: 'paid', label: 'Em garantia', icon: ShieldCheck },
  { key: 'completed', label: 'Liberado', icon: PackageCheck },
];

function stepIndex(status: Order['status']) {
  if (status === 'awaiting_payment') return 0;
  if (status === 'paid') return 1;
  if (status === 'completed') return 2;
  return -1; // cancelled
}

export function PedidoDetalhe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { session } = useAuth();
  const me = session?.user.id;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    setOrder(await fetchOrder(id));
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
    if (!id) return;
    const channel = supabase
      .channel(`order-${id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${id}` },
        () => load()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, load]);

  async function run(fn: () => Promise<void>, ok: string) {
    setBusy(true);
    try {
      await fn();
      toast.success(ok);
      await load();
    } catch (err: any) {
      toast.error(err.message ?? 'Erro');
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-500">Pedido não encontrado.</p>
        <Button onClick={() => navigate('/home')}>Voltar ao início</Button>
      </div>
    );
  }

  const isBuyer = order.buyer_id === me;
  const isSeller = order.seller_id === me;
  const idx = stepIndex(order.status);
  const cancelled = order.status === 'cancelled';
  const other = isBuyer ? order.seller : order.buyer;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/pedidos')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-3">Pedido</h1>
          <Badge className="ml-auto" variant={isBuyer ? 'default' : 'secondary'}>
            {isBuyer ? 'Comprando' : 'Vendendo'}
          </Badge>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Item */}
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <img
              src={order.listing_image || FALLBACK_IMG}
              alt={order.listing_title || ''}
              className="w-20 h-20 rounded-lg object-cover"
              onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_IMG)}
            />
            <div className="flex-1">
              <p className="font-semibold">{order.listing_title}</p>
              <p className="text-2xl font-bold text-purple-600">{formatPrice(order.amount)}</p>
              <p className="text-sm text-gray-500">
                {isBuyer ? 'Vendedor' : 'Comprador'}: {other?.full_name || 'Estudante'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ponto de encontro */}
        {order.meeting_address && (
          <Card>
            <CardContent className="p-4 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Ponto de encontro</p>
                <p className="text-sm text-gray-600">{order.meeting_address}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline / status */}
        {cancelled ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center space-y-2">
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
              <p className="font-semibold text-red-700">Pedido cancelado</p>
              <p className="text-sm text-red-600">O valor foi estornado ao comprador.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {STEPS.map((s, i) => {
                  const done = i <= idx;
                  const Icon = s.icon;
                  return (
                    <div key={s.key} className="flex-1 flex flex-col items-center relative">
                      {i > 0 && (
                        <div
                          className={`absolute top-5 right-1/2 left-[-50%] h-1 ${
                            i <= idx ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                          done ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`mt-2 text-xs text-center ${done ? 'text-purple-700 font-medium' : 'text-gray-400'}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                {order.status === 'awaiting_payment' && 'Aguardando pagamento do comprador.'}
                {order.status === 'paid' && (
                  <>
                    <b>{formatPrice(order.amount)} em garantia.</b>{' '}
                    {order.shipped
                      ? 'Vendedor marcou como enviado. Aguardando o comprador confirmar o recebimento.'
                      : 'O dinheiro será liberado ao vendedor quando o comprador confirmar o recebimento.'}
                  </>
                )}
                {order.status === 'completed' && (
                  <span className="text-green-700">
                    <b>Concluído!</b> O valor foi liberado para o vendedor.
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ações */}
        <div className="space-y-2">
          {isBuyer && order.status === 'awaiting_payment' && (
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => navigate(`/pagamento?order=${order.id}`)}
            >
              <CreditCard className="w-4 h-4 mr-2" /> Pagar agora
            </Button>
          )}

          {isSeller && order.status === 'paid' && !order.shipped && (
            <Button
              variant="outline"
              className="w-full"
              disabled={busy}
              onClick={() => run(() => markShipped(order.id), 'Marcado como enviado')}
            >
              <Truck className="w-4 h-4 mr-2" /> Marcar como enviado
            </Button>
          )}

          {isBuyer && order.status === 'paid' && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={busy}
              onClick={() => run(() => confirmDelivery(order.id), 'Recebimento confirmado! Pagamento liberado.')}
            >
              <Check className="w-4 h-4 mr-2" /> Confirmar recebimento
            </Button>
          )}

          <Button variant="outline" className="w-full" onClick={() => navigate('/chat')}>
            <MessageCircle className="w-4 h-4 mr-2" /> Abrir conversas
          </Button>

          {(order.status === 'awaiting_payment' || order.status === 'paid') && (
            <Button
              variant="ghost"
              className="w-full text-red-600 hover:text-red-700"
              disabled={busy}
              onClick={() => run(() => cancelOrder(order.id), 'Pedido cancelado e estornado')}
            >
              <XCircle className="w-4 h-4 mr-2" /> Cancelar pedido
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
