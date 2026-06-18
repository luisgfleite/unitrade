import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Plus, Trash2, CheckCircle2, Loader2, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import { supabase, Listing } from '../../lib/supabase';
import { formatPrice, FALLBACK_IMG } from '../../lib/data';
import { BottomNav } from './shared/BottomNav';

export function MeusAnuncios() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [ads, setAds] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!session) return;
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('seller_id', session.user.id)
      .order('created_at', { ascending: false });
    setAds((data as Listing[]) ?? []);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    load();
  }, [load]);

  async function removeAd(id: string) {
    setBusy(id);
    await supabase.from('listings').delete().eq('id', id);
    setAds((prev) => prev.filter((a) => a.id !== id));
    setBusy(null);
    toast.success('Anúncio excluído');
  }

  async function markSold(id: string) {
    setBusy(id);
    await supabase.from('listings').update({ status: 'sold' }).eq('id', id);
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'sold' } : a)));
    setBusy(null);
    toast.success('Marcado como vendido');
  }

  const active = ads.filter((a) => a.status === 'approved');
  const pending = ads.filter((a) => a.status === 'pending' || a.status === 'rejected');
  const sold = ads.filter((a) => a.status === 'sold');

  const statusBadge = (s: Listing['status']) => {
    if (s === 'approved') return <Badge className="bg-green-500">Ativo</Badge>;
    if (s === 'pending') return <Badge className="bg-amber-500"><Clock className="w-3 h-3 mr-1" />Em análise</Badge>;
    if (s === 'rejected') return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Recusado</Badge>;
    if (s === 'sold') return <Badge className="bg-gray-500">Vendido</Badge>;
    return null;
  };

  const renderAd = (ad: Listing) => (
    <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex gap-4 p-4">
        <img
          src={ad.images?.[0] || FALLBACK_IMG}
          alt={ad.title}
          className="w-24 h-24 object-cover rounded-lg shrink-0"
          onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_IMG)}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1 gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{ad.title}</h3>
              <p className="text-lg font-bold text-purple-600">{formatPrice(ad.price)}</p>
            </div>
            {statusBadge(ad.status)}
          </div>
          {ad.status === 'rejected' && ad.reject_reason && (
            <p className="text-xs text-red-500 mb-2">Motivo: {ad.reject_reason}</p>
          )}
          <div className="flex gap-2 mt-2">
            {ad.status === 'approved' && (
              <Button
                variant="outline"
                size="sm"
                disabled={busy === ad.id}
                onClick={() => markSold(ad.id)}
              >
                <CheckCircle2 className="w-3 h-3 mr-1" /> Marcar vendido
              </Button>
            )}
            {ad.status !== 'sold' && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                disabled={busy === ad.id}
                onClick={() => removeAd(ad.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  const empty = (text: string) => (
    <div className="text-center py-16 text-gray-400">
      <Plus className="w-12 h-12 mx-auto mb-3" />
      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold ml-3">Meus Anúncios</h1>
          </div>
          <Button
            onClick={() => navigate('/criar-anuncio')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" /> Novo
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-28">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="active">Ativos ({active.length})</TabsTrigger>
              <TabsTrigger value="pending">Análise ({pending.length})</TabsTrigger>
              <TabsTrigger value="sold">Vendidos ({sold.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4">
              {active.length === 0 ? empty('Nenhum anúncio ativo') : active.map(renderAd)}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              {pending.length === 0 ? empty('Nada em análise') : pending.map(renderAd)}
            </TabsContent>
            <TabsContent value="sold" className="space-y-4">
              {sold.length === 0 ? empty('Nenhum item vendido') : sold.map(renderAd)}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
