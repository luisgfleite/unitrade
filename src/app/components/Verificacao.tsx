import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Upload, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';

export function Verificacao() {
  const navigate = useNavigate();
  const { session, profile, refreshProfile } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const status = profile?.verification_status ?? 'none';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !session) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande (máx. 5MB)');
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${session.user.id}/${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from('documents')
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from('verification_requests').insert({
        user_id: session.user.id,
        document_url: path,
        status: 'pending',
      });
      if (insErr) throw insErr;

      await supabase
        .from('profiles')
        .update({ verification_status: 'pending' })
        .eq('id', session.user.id);

      await refreshProfile();
      toast.success('Documento enviado! Aguarde a aprovação da administração.');
      navigate('/perfil');
    } catch (err: any) {
      toast.error('Erro ao enviar: ' + (err.message ?? 'tente novamente'));
    } finally {
      setUploading(false);
    }
  };

  // Já verificado / em análise / recusado → mostra o estado
  if (status === 'approved') {
    return (
      <StatusCard
        icon={<CheckCircle className="w-16 h-16 text-green-500 mx-auto" />}
        title="Conta verificada"
        desc="Você já pode comprar, anunciar e negociar na UniTrade."
        onBack={() => navigate('/home')}
      />
    );
  }
  if (status === 'pending') {
    return (
      <StatusCard
        icon={<Clock className="w-16 h-16 text-amber-500 mx-auto" />}
        title="Documento em análise"
        desc="Recebemos seu comprovante. A administração vai aprovar em breve."
        onBack={() => navigate('/home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verificação Acadêmica</CardTitle>
          <CardDescription>
            Faça upload do seu comprovante de matrícula para verificar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'rejected' && (
            <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
              <XCircle className="w-4 h-4 shrink-0" />
              Seu documento anterior foi recusado. Envie um comprovante válido.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                file
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
              }`}
              onClick={() => fileRef.current?.click()}
            >
              {file ? (
                <div className="space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <p className="text-green-600 break-all">{file.name}</p>
                  <p className="text-sm text-gray-500">Clique para trocar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-700">Clique para fazer upload</p>
                    <p className="text-sm text-gray-500 mt-2">PDF, PNG ou JPG (máx. 5MB)</p>
                  </div>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={!file || uploading}
            >
              {uploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enviar para verificação
            </Button>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              Fazer isso depois
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusCard({
  icon,
  title,
  desc,
  onBack,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          {icon}
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Ir para o início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
