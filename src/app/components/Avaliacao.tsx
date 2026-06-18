import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ArrowLeft, Star } from 'lucide-react';

export function Avaliacao() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const seller = {
    name: 'Maria Santos',
    course: 'Engenharia Civil',
    productImage: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400',
    productTitle: 'Tênis Nike Air Max 2024',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-3">Avaliar Compra</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100">
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              <img
                src={seller.productImage}
                alt={seller.productTitle}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{seller.productTitle}</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      {seller.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{seller.name}</p>
                    <p className="text-xs text-gray-600">{seller.course}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4 text-center">
                <Label className="text-lg font-semibold block">
                  Como foi sua experiência?
                </Label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-600">
                    {rating === 5 && 'Excelente! 🎉'}
                    {rating === 4 && 'Muito bom! 👍'}
                    {rating === 3 && 'Bom'}
                    {rating === 2 && 'Poderia ser melhor'}
                    {rating === 1 && 'Não atendeu expectativas'}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">
                  Conte mais sobre sua experiência (opcional)
                </Label>
                <Textarea
                  id="review"
                  placeholder="O que você achou do produto e do vendedor?"
                  rows={5}
                  className="resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-semibold">Aspectos da compra</Label>
                <div className="space-y-2">
                  {[
                    'Produto conforme anunciado',
                    'Boa comunicação',
                    'Entrega pontual',
                    'Recomendo o vendedor',
                  ].map((aspect, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                      />
                      <span className="text-sm">{aspect}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
            disabled={rating === 0}
          >
            Enviar avaliação
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => navigate('/home')}
          >
            Pular por enquanto
          </Button>
        </form>
      </div>
    </div>
  );
}
