import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { ArrowLeft, CreditCard, Wallet, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { fetchOrder, payOrder, formatPrice, SERVICE_FEE, FALLBACK_IMG, Order } from '../../lib/data';

export function Pagamento() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get('order');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState('pix');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    fetchOrder(orderId).then((o) => {
      setOrder(o);
      setLoading(false);
    });
  }, [orderId]);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!order) return;
    setPaying(true);
    try {
      await payOrder(order.id, method);
      toast.success('Pagamento aprovado! Valor retido em garantia.');
      navigate(`/pedido/${order.id}`);
    } catch (err: any) {
      toast.error(err.message ?? 'Erro no pagamento');
    } finally {
      setPaying(false);
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
  if (order.status !== 'awaiting_payment') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 p-4 text-center">
        <ShieldCheck className="w-14 h-14 text-green-500" />
        <p className="text-gray-600">Este pedido já foi pago.</p>
        <Button onClick={() => navigate(`/pedido/${order.id}`)}>Acompanhar pedido</Button>
      </div>
    );
  }

  const total = Number(order.amount) + SERVICE_FEE;

  return (
    <div className="min-h-screen bg-gray-50 pb-36">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-3">Pagamento</h1>
        </div>
      </div>

      <form onSubmit={handlePay} className="max-w-2xl mx-auto p-4 space-y-4">
        <Card>
          <CardContent className="p-6 space-y-4">
            <Label className="text-lg font-semibold">Resumo do Pedido</Label>
            <div className="flex items-center gap-3">
              <img
                src={order.listing_image || FALLBACK_IMG}
                alt={order.listing_title || ''}
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_IMG)}
              />
              <div className="flex-1">
                <p className="font-medium">{order.listing_title}</p>
                <p className="text-sm text-gray-500">Vendedor: {order.seller?.full_name || 'Estudante'}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Produto</span>
                <span>{formatPrice(order.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxa de serviço</span>
                <span>{formatPrice(SERVICE_FEE)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-purple-600">{formatPrice(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="w-5 h-5 text-purple-600" /> Método de Pagamento
            </Label>
            <RadioGroup value={method} onValueChange={setMethod}>
              <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
                <RadioGroupItem value="pix" id="pix" />
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">PIX</p>
                    <p className="text-sm text-gray-600">Aprovação instantânea</p>
                  </div>
                </div>
              </label>
              <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
                <RadioGroupItem value="card" id="card" />
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Cartão de Crédito</p>
                    <p className="text-sm text-gray-600">Parcelamento disponível</p>
                  </div>
                </div>
              </label>
            </RadioGroup>
            {method === 'card' && (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do cartão</Label>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Validade</Label>
                    <Input id="expiry" placeholder="MM/AA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
          <span>
            <b>Compra protegida.</b> O valor fica <b>retido em garantia</b> e só é liberado para o
            vendedor depois que você confirmar que recebeu o produto.
          </span>
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total a pagar:</span>
            <span className="text-2xl font-bold text-purple-600">{formatPrice(total)}</span>
          </div>
          <Button
            onClick={handlePay}
            disabled={paying}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            {paying && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Pagar {formatPrice(total)}
          </Button>
        </div>
      </div>
    </div>
  );
}
