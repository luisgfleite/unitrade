import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ArrowLeft, Upload, X, Loader2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import { AddressFields } from './shared/AddressFields';
import { Address, emptyAddress } from '../../lib/cep';

export function CriarAnuncio() {
  const navigate = useNavigate();
  const { session, isVerified, loading: authLoading } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [submitting, setSubmitting] = useState(false);

  // Bloqueio: só verificado anuncia
  if (!authLoading && !isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="max-w-md w-full p-8 text-center space-y-4">
          <ShieldAlert className="w-14 h-14 text-purple-500 mx-auto" />
          <h2 className="text-xl font-semibold">Verifique sua conta para anunciar</h2>
          <p className="text-gray-500 text-sm">
            Só estudantes com a conta acadêmica verificada podem criar anúncios.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => navigate('/home')}>
              Voltar
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => navigate('/verificacao')}
            >
              Verificar agora
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).slice(0, 3 - files.length);
    setFiles((f) => [...f, ...incoming]);
    setPreviews((p) => [...p, ...incoming.map((f) => URL.createObjectURL(f))]);
  }

  function removeImage(i: number) {
    setFiles((f) => f.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!title || !category || !condition) {
        toast.error('Preencha título, categoria e estado');
        return;
      }
      setStep(2);
      return;
    }

    if (!session) return;
    if (!price || Number(price) <= 0) {
      toast.error('Informe um preço válido');
      return;
    }

    setSubmitting(true);
    try {
      // Upload das imagens
      const urls: string[] = [];
      for (const file of files) {
        const ext = file.name.split('.').pop();
        const path = `${session.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from('listing-images').upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from('listing-images').getPublicUrl(path);
        urls.push(data.publicUrl);
      }

      const { error: insErr } = await supabase.from('listings').insert({
        seller_id: session.user.id,
        title,
        description,
        price: Number(price),
        category,
        condition,
        images: urls,
        status: 'pending',
        cep: address.cep || null,
        street: address.street || null,
        number: address.number || null,
        complement: address.complement || null,
        neighborhood: address.neighborhood || null,
        city: address.city || null,
        state: address.state || null,
      });
      if (insErr) throw insErr;

      toast.success('Anúncio enviado! Aguarde a aprovação da administração.');
      navigate('/meus-anuncios');
    } catch (err: any) {
      toast.error('Erro ao publicar: ' + (err.message ?? 'tente novamente'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Criar Anúncio - Passo {step}</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-6 flex gap-2">
          <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-purple-600' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <Card className="p-6 space-y-4">
                <Label>Fotos do produto</Label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
                <div className="grid grid-cols-3 gap-3">
                  {previews.map((img, index) => (
                    <div key={index} className="relative aspect-square">
                      <img src={img} alt={`Produto ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {previews.length < 3 && (
                    <button
                      type="button"
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition-colors"
                      onClick={() => fileRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Adicionar</span>
                    </button>
                  )}
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do anúncio</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Notebook Dell Inspiron 15"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                      <SelectItem value="Livros">Livros</SelectItem>
                      <SelectItem value="Roupas">Roupas</SelectItem>
                      <SelectItem value="Calçados">Calçados</SelectItem>
                      <SelectItem value="Acessórios">Acessórios</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Condição do produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Semi-novo">Semi-novo</SelectItem>
                      <SelectItem value="Usado">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </>
          )}

          {step === 2 && (
            <>
              <Card className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva seu produto em detalhes..."
                    rows={6}
                    required
                  />
                </div>
              </Card>
              <Card className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0,00"
                    required
                  />
                </div>
              </Card>

              <Card className="p-6">
                <AddressFields value={address} onChange={setAddress} />
              </Card>
            </>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {step === 1 ? 'Próximo' : 'Publicar anúncio'}
          </Button>
        </form>
      </div>
    </div>
  );
}
