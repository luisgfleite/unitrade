import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle, Home, MessageCircle } from 'lucide-react';

export function Confirmacao() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-full">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Pedido Confirmado!
            </h1>
            <p className="text-gray-600">
              Seu pagamento foi aprovado com sucesso
            </p>
          </div>

          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Número do pedido:</span>
                <span className="font-bold text-purple-600">#UNI2024-0842</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Valor pago:</span>
                <span className="font-bold text-2xl text-purple-600">R$ 230,00</span>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">Próximos passos:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>O vendedor foi notificado sobre sua compra</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Combine o horário de retirada via chat</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Após receber o produto, não esqueça de avaliar</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => navigate('/home')}
            >
              <Home className="w-4 h-4 mr-2" />
              Início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
