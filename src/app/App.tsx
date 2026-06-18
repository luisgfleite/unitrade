import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { Login } from './components/Login';
import { Verificacao } from './components/Verificacao';
import { Perfil } from './components/Perfil';
import { BoasVindas } from './components/BoasVindas';
import { Home } from './components/Home';
import { Filtros } from './components/Filtros';
import { DetalheProduto } from './components/DetalheProduto';
import { CriarAnuncio } from './components/CriarAnuncio';
import { Chat } from './components/Chat';
import { Negociacao } from './components/Negociacao';
import { Pagamento } from './components/Pagamento';
import { Desejos } from './components/Desejos';
import { MeusAnuncios } from './components/MeusAnuncios';
import { Confirmacao } from './components/Confirmacao';
import { Avaliacao } from './components/Avaliacao';
import { Pedidos } from './components/Pedidos';
import { PedidoDetalhe } from './components/PedidoDetalhe';
import { Admin } from './components/Admin';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from '../lib/auth';
import { Loader2 } from 'lucide-react';

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    </div>
  );
}

// Exige estar logado
function Protected({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();
  if (loading) return <FullScreenLoader />;
  if (!session) return <Navigate to="/login" replace state={{ from: location }} />;
  return <>{children}</>;
}

// Exige ser admin
function AdminOnly({ children }: { children: ReactNode }) {
  const { session, isAdmin, loading } = useAuth();
  if (loading) return <FullScreenLoader />;
  if (!session) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/home" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Disponíveis logo após o cadastro (não dependem de doc aprovado) */}
      <Route path="/boas-vindas" element={<Protected><BoasVindas /></Protected>} />
      <Route path="/perfil" element={<Protected><Perfil /></Protected>} />
      <Route path="/verificacao" element={<Protected><Verificacao /></Protected>} />

      {/* Navegação geral (logado) */}
      <Route path="/home" element={<Protected><Home /></Protected>} />
      <Route path="/filtros" element={<Protected><Filtros /></Protected>} />
      <Route path="/produto/:id" element={<Protected><DetalheProduto /></Protected>} />
      <Route path="/desejos" element={<Protected><Desejos /></Protected>} />
      <Route path="/meus-anuncios" element={<Protected><MeusAnuncios /></Protected>} />

      {/* Ações que exigem verificação (a checagem fina fica dentro de cada tela) */}
      <Route path="/criar-anuncio" element={<Protected><CriarAnuncio /></Protected>} />
      <Route path="/chat" element={<Protected><Chat /></Protected>} />
      <Route path="/negociacao" element={<Protected><Negociacao /></Protected>} />
      <Route path="/pagamento" element={<Protected><Pagamento /></Protected>} />
      <Route path="/pedidos" element={<Protected><Pedidos /></Protected>} />
      <Route path="/pedido/:id" element={<Protected><PedidoDetalhe /></Protected>} />
      <Route path="/confirmacao" element={<Protected><Confirmacao /></Protected>} />
      <Route path="/avaliacao" element={<Protected><Avaliacao /></Protected>} />

      {/* Painel administrativo */}
      <Route path="/admin" element={<AdminOnly><Admin /></AdminOnly>} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
          <Toaster />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
