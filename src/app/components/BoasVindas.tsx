import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sparkles, ShoppingBag, MessageCircle, Heart } from 'lucide-react';

export function BoasVindas() {
  const navigate = useNavigate();

  const features = [
    { icon: ShoppingBag, title: 'Compre e Venda', description: 'Produtos entre estudantes' },
    { icon: MessageCircle, title: 'Chat Direto', description: 'Negocie com segurança' },
    { icon: Heart, title: 'Salve Favoritos', description: 'Organize seus desejos' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="pt-12 pb-8 text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-full">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Bem-vindo ao UniTrade!
            </h1>
            <p className="text-gray-600">
              Sua comunidade universitária de compra e venda
            </p>
          </div>
          <div className="grid gap-4 py-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100"
              >
                <div className="bg-white p-2 rounded-lg">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-1 bg-purple-600 rounded-full"></div>
            <div className="flex-1 h-1 bg-purple-600 rounded-full"></div>
            <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
          </div>
          <Button
            onClick={() => navigate('/home')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            Começar a explorar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
