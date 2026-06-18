import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { ArrowLeft, DollarSign, MessageSquare } from 'lucide-react';

export function Negociacao() {
  const navigate = useNavigate();
  const [offerPrice, setOfferPrice] = useState('');

  const product = {
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
    title: 'Tênis Nike Air Max 2024',
    price: 'R$ 250',
    seller: {
      name: 'Maria Santos',
      course: 'Engenharia Civil',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/pagamento');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-3">Fazer Proposta</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-2xl font-bold text-purple-600 mb-2">
                  {product.price}
                </p>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      {product.seller.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{product.seller.name}</p>
                    <p className="text-xs text-gray-500">{product.seller.course}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="offer" className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  Sua Proposta
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">R$</span>
                  <Input
                    id="offer"
                    type="number"
                    placeholder="0,00"
                    className="pl-10 text-lg"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOfferPrice('200')}
                  >
                    R$ 200
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOfferPrice('225')}
                  >
                    R$ 225
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOfferPrice('250')}
                  >
                    R$ 250
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  Mensagem (Opcional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Adicione uma mensagem para o vendedor..."
                  rows={4}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Valor da proposta:</span>
                <span className="text-2xl font-bold text-purple-600">
                  R$ {offerPrice || '0,00'}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                O vendedor será notificado e poderá aceitar, recusar ou fazer uma contraproposta.
              </p>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            Enviar proposta
          </Button>
        </form>
      </div>
    </div>
  );
}
