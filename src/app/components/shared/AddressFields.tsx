import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2, MapPin, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Address, fetchCep, maskCep } from '../../../lib/cep';

// Formulário de endereço com autopreenchimento via ViaCEP.
export function AddressFields({
  value,
  onChange,
}: {
  value: Address;
  onChange: (a: Address) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);

  function set<K extends keyof Address>(key: K, v: Address[K]) {
    onChange({ ...value, [key]: v });
  }

  async function handleCep(raw: string) {
    const masked = maskCep(raw);
    set('cep', masked);
    setFound(false);
    if (masked.replace(/\D/g, '').length === 8) {
      setLoading(true);
      const data = await fetchCep(masked);
      setLoading(false);
      if (data) {
        onChange({ ...value, ...data, cep: masked } as Address);
        setFound(true);
      } else {
        toast.error('CEP não encontrado');
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-purple-600">
        <MapPin className="w-4 h-4" />
        <span className="font-medium text-sm">Ponto de encontro</span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <div className="relative">
          <Input
            id="cep"
            value={value.cep}
            onChange={(e) => handleCep(e.target.value)}
            placeholder="00000-000"
            inputMode="numeric"
          />
          <span className="absolute right-3 top-2.5">
            {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
            {!loading && found && <Check className="w-4 h-4 text-green-500" />}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="street">Rua</Label>
          <Input id="street" value={value.street} onChange={(e) => set('street', e.target.value)} placeholder="Av. ..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="number">Número</Label>
          <Input id="number" value={value.number} onChange={(e) => set('number', e.target.value)} placeholder="123" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="complement">Complemento / referência</Label>
        <Input id="complement" value={value.complement} onChange={(e) => set('complement', e.target.value)} placeholder="Bloco B, portão da biblioteca..." />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input id="neighborhood" value={value.neighborhood} onChange={(e) => set('neighborhood', e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" value={value.city} onChange={(e) => set('city', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">UF</Label>
            <Input id="state" value={value.state} maxLength={2} onChange={(e) => set('state', e.target.value.toUpperCase())} />
          </div>
        </div>
      </div>
    </div>
  );
}
