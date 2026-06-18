import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  ShieldCheck, FileText, Check, X, ExternalLink, Loader2, LogOut,
  Users, Crown, UserX, UserCheck, Package, Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import { supabase, Profile } from '../../lib/supabase';

interface VReq {
  id: string;
  user_id: string;
  document_url: string;
  created_at: string;
  profiles: { full_name: string | null; email: string | null; university: string | null; course: string | null } | null;
}

interface PendingListing {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string | null;
  images: string[];
  created_at: string;
  profiles: { full_name: string | null; email: string | null } | null;
}

export function Admin() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [vreqs, setVreqs] = useState<VReq[]>([]);
  const [listings, setListings] = useState<PendingListing[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [v, l, u] = await Promise.all([
      supabase
        .from('verification_requests')
        .select(
          'id,user_id,document_url,created_at,profiles:profiles!verification_requests_user_id_fkey(full_name,email,university,course)'
        )
        .eq('status', 'pending')
        .order('created_at', { ascending: true }),
      supabase
        .from('listings')
        .select(
          'id,title,description,price,category,images,created_at,profiles:profiles!listings_seller_id_fkey(full_name,email)'
        )
        .eq('status', 'pending')
        .order('created_at', { ascending: true }),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    ]);
    setVreqs((v.data as any) ?? []);
    setListings((l.data as any) ?? []);
    setUsers((u.data as Profile[]) ?? []);
    setLoading(false);
  }, []);

  async function toggleVerified(u: Profile) {
    setBusy(u.id);
    const next = !u.is_verified;
    await supabase
      .from('profiles')
      .update({ is_verified: next, verification_status: next ? 'approved' : 'rejected' })
      .eq('id', u.id);
    setUsers((prev) =>
      prev.map((x) =>
        x.id === u.id
          ? { ...x, is_verified: next, verification_status: next ? 'approved' : 'rejected' }
          : x
      )
    );
    setBusy(null);
    toast.success(next ? 'Usuário verificado' : 'Verificação removida');
  }

  async function toggleAdmin(u: Profile) {
    setBusy(u.id);
    const next = u.role === 'admin' ? 'user' : 'admin';
    await supabase.from('profiles').update({ role: next }).eq('id', u.id);
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role: next } : x)));
    setBusy(null);
    toast.success(next === 'admin' ? 'Agora é admin' : 'Admin removido');
  }

  useEffect(() => {
    load();
  }, [load]);

  async function viewDocument(path: string) {
    const { data, error } = await supabase.storage.from('documents').createSignedUrl(path, 120);
    if (error || !data) {
      toast.error('Não foi possível abrir o documento');
      return;
    }
    window.open(data.signedUrl, '_blank');
  }

  async function decideVerification(req: VReq, approve: boolean) {
    setBusy(req.id);
    try {
      const { data: userData } = await supabase.auth.getUser();
      await supabase
        .from('verification_requests')
        .update({
          status: approve ? 'approved' : 'rejected',
          reviewed_by: userData.user?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', req.id);

      await supabase
        .from('profiles')
        .update({
          is_verified: approve,
          verification_status: approve ? 'approved' : 'rejected',
        })
        .eq('id', req.user_id);

      toast.success(approve ? 'Usuário verificado' : 'Verificação recusada');
      setVreqs((prev) => prev.filter((r) => r.id !== req.id));
    } catch {
      toast.error('Erro ao processar');
    } finally {
      setBusy(null);
    }
  }

  async function decideListing(l: PendingListing, approve: boolean) {
    setBusy(l.id);
    try {
      await supabase
        .from('listings')
        .update({
          status: approve ? 'approved' : 'rejected',
          approved_at: approve ? new Date().toISOString() : null,
        })
        .eq('id', l.id);
      toast.success(approve ? 'Anúncio aprovado' : 'Anúncio recusado');
      setListings((prev) => prev.filter((x) => x.id !== l.id));
    } catch {
      toast.error('Erro ao processar');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-semibold">Painel Administrativo</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate('/login'); }}>
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <Tabs defaultValue="verificacoes">
            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Stat icon={Users} label="Usuários" value={users.length} />
              <Stat icon={Clock} label="Verif. pendentes" value={vreqs.length} />
              <Stat icon={Package} label="Anúncios pendentes" value={listings.length} />
            </div>

            <TabsList className="mb-6">
              <TabsTrigger value="verificacoes">
                Verificações <Badge className="ml-2" variant="secondary">{vreqs.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="anuncios">
                Anúncios <Badge className="ml-2" variant="secondary">{listings.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="usuarios">
                Usuários <Badge className="ml-2" variant="secondary">{users.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="verificacoes" className="space-y-4">
              {vreqs.length === 0 && <Empty text="Nenhuma verificação pendente 🎉" />}
              {vreqs.map((req) => (
                <Card key={req.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      {req.profiles?.full_name || 'Sem nome'}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{req.profiles?.email}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">
                      {req.profiles?.university || '—'} · {req.profiles?.course || '—'}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => viewDocument(req.document_url)}>
                      <ExternalLink className="w-4 h-4 mr-2" /> Ver documento
                    </Button>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        disabled={busy === req.id}
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => decideVerification(req, true)}
                      >
                        <Check className="w-4 h-4 mr-1" /> Aprovar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={busy === req.id}
                        onClick={() => decideVerification(req, false)}
                      >
                        <X className="w-4 h-4 mr-1" /> Recusar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="anuncios" className="space-y-4">
              {listings.length === 0 && <Empty text="Nenhum anúncio pendente 🎉" />}
              {listings.map((l) => (
                <Card key={l.id}>
                  <CardContent className="flex gap-4 pt-6">
                    {l.images?.[0] && (
                      <img src={l.images[0]} alt={l.title} className="w-24 h-24 rounded object-cover" />
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{l.title}</h3>
                          <p className="text-sm text-gray-500">
                            R$ {Number(l.price).toFixed(2)} · {l.category || 'sem categoria'}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{l.description}</p>
                      <p className="text-xs text-gray-400">por {l.profiles?.full_name || l.profiles?.email}</p>
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          disabled={busy === l.id}
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => decideListing(l, true)}
                        >
                          <Check className="w-4 h-4 mr-1" /> Aprovar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={busy === l.id}
                          onClick={() => decideListing(l, false)}
                        >
                          <X className="w-4 h-4 mr-1" /> Recusar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="usuarios" className="space-y-3">
              {users.length === 0 && <Empty text="Nenhum usuário ainda" />}
              {users.map((u) => (
                <Card key={u.id}>
                  <CardContent className="flex items-center gap-3 pt-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center font-medium shrink-0">
                      {(u.full_name || u.email || 'U')[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium truncate">{u.full_name || 'Sem nome'}</p>
                        {u.role === 'admin' && (
                          <Badge className="bg-purple-600"><Crown className="w-3 h-3 mr-1" />Admin</Badge>
                        )}
                        {u.is_verified ? (
                          <Badge className="bg-green-500"><ShieldCheck className="w-3 h-3 mr-1" />Verificado</Badge>
                        ) : (
                          <Badge variant="secondary">Não verif.</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{u.email}</p>
                      <p className="text-xs text-gray-400 truncate">
                        {u.university || '—'} · {u.course || '—'}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busy === u.id}
                        onClick={() => toggleVerified(u)}
                      >
                        {u.is_verified
                          ? <><UserX className="w-4 h-4 mr-1" />Tirar</>
                          : <><UserCheck className="w-4 h-4 mr-1" />Verificar</>}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={busy === u.id}
                        onClick={() => toggleAdmin(u)}
                      >
                        <Crown className="w-4 h-4 mr-1" />
                        {u.role === 'admin' ? 'Rebaixar' : 'Tornar admin'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="text-center text-gray-400 py-16">{text}</div>;
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <Icon className="w-6 h-6 mx-auto text-purple-600 mb-1" />
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}
