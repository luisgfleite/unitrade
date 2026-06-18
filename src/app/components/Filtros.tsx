import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { ArrowLeft, X } from 'lucide-react';

export function Filtros() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    'Eletrônicos',
    'Livros',
    'Roupas',
    'Calçados',
    'Acessórios',
    'Esportes',
    'Casa',
    'Beleza',
    'Outros',
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Filtros e Categorias</h1>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Categorias</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedCategories.includes(category)
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      : ''
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                  {selectedCategories.includes(category) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Faixa de Preço</Label>
            <div className="pt-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                step={10}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-purple-600">
                R$ {priceRange[0]}
              </span>
              <span className="text-gray-500">até</span>
              <span className="font-semibold text-purple-600">
                R$ {priceRange[1]}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Cursos Populares</Label>
            <div className="flex flex-wrap gap-2">
              {['Engenharia', 'Medicina', 'Direito', 'Administração', 'Computação', 'Design'].map(
                (course) => (
                  <Badge
                    key={course}
                    variant="outline"
                    className="cursor-pointer px-4 py-2 hover:bg-purple-50"
                  >
                    {course}
                  </Badge>
                )
              )}
            </div>
          </div>
        </Card>

        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          size="lg"
          onClick={() => navigate('/home')}
        >
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
}
