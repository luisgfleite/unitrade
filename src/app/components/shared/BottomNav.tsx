import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home as HomeIcon, Heart, Plus, MessageCircle, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../../lib/auth';

const items = [
  { path: '/home', icon: HomeIcon, label: 'Início' },
  { path: '/desejos', icon: Heart, label: 'Desejos' },
  { path: '/chat', icon: MessageCircle, label: 'Chat' },
  { path: '/perfil', icon: User, label: 'Perfil' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isVerified } = useAuth();

  const createAnuncio = () => {
    if (!isVerified) {
      toast.error('Verifique sua conta acadêmica para anunciar.');
      navigate('/verificacao');
      return;
    }
    navigate('/criar-anuncio');
  };

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t shadow-lg z-20"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-around px-4 py-2 relative">
        {items.slice(0, 2).map((it) => (
          <NavBtn key={it.path} {...it} active={pathname === it.path} onClick={() => navigate(it.path)} />
        ))}

        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={createAnuncio}
          aria-label="Criar anúncio"
          className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg w-14 h-14 flex items-center justify-center text-white -mt-8 ring-4 ring-white"
        >
          <Plus className="w-7 h-7" />
        </motion.button>

        {items.slice(2).map((it) => (
          <NavBtn key={it.path} {...it} active={pathname === it.path} onClick={() => navigate(it.path)} />
        ))}
      </div>
    </motion.div>
  );
}

function NavBtn({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      aria-label={label}
      className="relative flex flex-col items-center gap-0.5 px-3 py-1"
    >
      <Icon className={`w-6 h-6 transition-colors ${active ? 'text-purple-600' : 'text-gray-400'}`} />
      <span className={`text-[10px] ${active ? 'text-purple-600 font-medium' : 'text-gray-400'}`}>
        {label}
      </span>
      {active && (
        <motion.span
          layoutId="nav-dot"
          className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-purple-600"
        />
      )}
    </motion.button>
  );
}
