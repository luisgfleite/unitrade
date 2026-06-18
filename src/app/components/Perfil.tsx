import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  ArrowLeft, LogOut, ShieldCheck, ShieldAlert, Clock, Loader2, ShieldQuestion, Receipt, Package,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import { BottomNav } from './shared/BottomNav';

export function Perfil() {
  const navigate = useNavigate();
  const { session, profile, refreshProfile, signOut, isAdmin } = useAuth();
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setUniversity(profile.university || '');
      setCourse(profile.course || '');
      setPhone(profile.phone || '');
      setBio(profile.bio || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          university,
          course,
          phone,
          bio,
          profile_completed: true,
        })
        .eq('id', session.user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success('Perfil salvo!');
    } catch (err: any) {
      toast.error('Erro ao salvar: ' + (err.message ?? ''));
    } finally {
      setSaving(false);
    }
  };

  async function handleLogout() {
    await signOut();
    navigate('/login');
  }

  const VerifBadge = () => {
    const s = profile?.verification_status;
    if (profile?.is_verified)
      return <Badge className="bg-green-500"><ShieldCheck className="w-3 h-3 mr-1" />Verificado</Badge>;
    if (s === 'pending')
      return <Badge className="bg-amber-500"><Clock className="w-3 h-3 mr-1" />Em análise</Badge>;
    if (s === 'rejected')
      return <Badge variant="destructive"><ShieldAlert className="w-3 h-3 mr-1" />Recusado</Badge>;
    return <Badge variant="secondary"><ShieldQuestion className="w-3 h-3 mr-1" />Não verificado</Badge>;
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold ml-3">Meu Perfil</h1>
          </div>
          <Button variant="ghost" size="sm" className="text-red-600" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-28 space-y-6">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-2xl">
                {(profile.full_name || profile.email || 'U')[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <p className="font-semibold text-lg">{profile.full_name || 'Sem nome'}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <VerifBadge />
            </div>
          </CardContent>
        </Card>

        {!profile.is_verified && profile.verification_status !== 'pending' && (
          <Button
            variant="outline"
            className="w-full border-purple-300 text-purple-700"
            onClick={() => navigate('/verificacao')}
          >
            <ShieldCheck className="w-4 h-4 mr-2" /> Verificar conta acadêmica
          </Button>
        )}

        <Button variant="outline" className="w-full" onClick={() => navigate('/meus-anuncios')}>
          <Package className="w-4 h-4 mr-2" /> Meus anúncios
        </Button>

        <Button variant="outline" className="w-full" onClick={() => navigate('/pedidos')}>
          <Receipt className="w-4 h-4 mr-2" /> Meus pedidos (compras e vendas)
        </Button>

        {isAdmin && (
          <Button variant="outline" className="w-full" onClick={() => navigate('/admin')}>
            <ShieldCheck className="w-4 h-4 mr-2" /> Painel administrativo
          </Button>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dados do perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university">Universidade</Label>
                  <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="Ex: USP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Curso</Label>
                  <Input id="course" value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Ex: Computação" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 90000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="resize-none" placeholder="Conte um pouco sobre você..." />
              </div>
              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Salvar perfil
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
