import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowLeft, Send, Loader2, MessageCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';

interface Party { id: string; full_name: string | null; course: string | null }
interface Conv {
  id: string;
  buyer_id: string;
  seller_id: string;
  listing: { title: string | null } | null;
  buyer: Party | null;
  seller: Party | null;
}
interface Msg { id: string; sender_id: string; content: string; created_at: string }

export function Chat() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const convId = params.get('c');
  const { session } = useAuth();
  const me = session?.user.id;

  const [convs, setConvs] = useState<Conv[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!me) return;
    supabase
      .from('conversations')
      .select(
        'id,buyer_id,seller_id,listing:listings(title),buyer:profiles!conversations_buyer_id_fkey(id,full_name,course),seller:profiles!conversations_seller_id_fkey(id,full_name,course)'
      )
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setConvs((data as any) ?? []);
        setLoading(false);
      });
  }, [me]);

  if (convId) return <Thread convId={convId} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Mensagens</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : convs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <MessageCircle className="w-16 h-16 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Nenhuma conversa ainda</p>
            <p className="text-sm">Converse com um vendedor a partir de um anúncio.</p>
          </div>
        ) : (
          convs.map((c) => {
            const other = c.buyer_id === me ? c.seller : c.buyer;
            return (
              <div
                key={c.id}
                className="bg-white border-b p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/chat?c=${c.id}`)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      {(other?.full_name || '?')[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{other?.full_name || 'Estudante'}</p>
                    <p className="text-sm text-gray-600 truncate">{c.listing?.title || 'Anúncio'}</p>
                    {other?.course && (
                      <Badge variant="secondary" className="mt-1 text-xs">{other.course}</Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function Thread({ convId }: { convId: string }) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const me = session?.user.id;
  const [conv, setConv] = useState<Conv | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase
      .from('conversations')
      .select(
        'id,buyer_id,seller_id,listing:listings(title),buyer:profiles!conversations_buyer_id_fkey(id,full_name,course),seller:profiles!conversations_seller_id_fkey(id,full_name,course)'
      )
      .eq('id', convId)
      .single()
      .then(({ data }) => setConv(data as any));

    supabase
      .from('messages')
      .select('id,sender_id,content,created_at')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })
      .then(({ data }) => setMessages((data as Msg[]) ?? []));

    // Tempo real
    const channel = supabase
      .channel(`conv-${convId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${convId}` },
        (payload) => {
          const m = payload.new as Msg;
          setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [convId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !me) return;
    const content = text.trim();
    setText('');
    setSending(true);
    const { data } = await supabase
      .from('messages')
      .insert({ conversation_id: convId, sender_id: me, content })
      .select('id,sender_id,content,created_at')
      .single();
    if (data) setMessages((prev) => (prev.some((x) => x.id === data.id) ? prev : [...prev, data as Msg]));
    setSending(false);
  }

  const other = conv ? (conv.buyer_id === me ? conv.seller : conv.buyer) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="sticky top-0 bg-white border-b z-10 shadow-sm">
        <div className="max-w-2xl mx-auto p-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/chat')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
              {(other?.full_name || '?')[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{other?.full_name || 'Estudante'}</p>
            <p className="text-xs text-gray-500">{conv?.listing?.title || ''}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full p-4 space-y-3 overflow-y-auto">
        {messages.map((m) => {
          const mine = m.sender_id === me;
          return (
            <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  mine ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white border'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{m.content}</p>
                <p className={`text-xs mt-1 ${mine ? 'text-purple-100' : 'text-gray-500'}`}>
                  {new Date(m.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="sticky bottom-0 bg-white border-t p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={sending || !text.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
