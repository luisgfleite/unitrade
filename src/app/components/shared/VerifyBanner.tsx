import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Clock } from 'lucide-react';
import { useAuth } from '../../../lib/auth';

// Banner que avisa o usuário não-verificado que ele só pode ver (não comprar/anunciar).
export function VerifyBanner() {
  const navigate = useNavigate();
  const { profile, isVerified } = useAuth();

  if (isVerified) return null;

  const pending = profile?.verification_status === 'pending';

  if (pending) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3 flex items-center gap-3 text-sm">
        <Clock className="w-5 h-5 shrink-0" />
        <span>Seu documento está <b>em análise</b>. Assim que aprovado você poderá comprar e anunciar.</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => navigate('/verificacao')}
      className="w-full text-left bg-purple-50 border border-purple-200 text-purple-800 rounded-lg p-3 flex items-center gap-3 text-sm hover:bg-purple-100 transition-colors"
    >
      <ShieldAlert className="w-5 h-5 shrink-0" />
      <span>
        Você está no modo <b>visualização</b>. <u>Verifique sua conta acadêmica</u> para comprar, anunciar e conversar.
      </span>
    </button>
  );
}
