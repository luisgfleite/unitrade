# 📋 UX Cheatsheet - UniTrade
## Referência Rápida para Design e Desenvolvimento

---

## 🎨 Design Tokens

### Cores

```css
/* Primary */
--purple-600: #7c3aed;
--blue-600: #3b82f6;
--gradient: linear-gradient(135deg, #7c3aed, #3b82f6);

/* Status */
--green-500: #10b981;  /* Success */
--red-500: #ef4444;    /* Error */
--yellow-500: #f59e0b; /* Warning */

/* Neutrals */
--gray-50: #f9fafb;
--gray-900: #111827;
```

### Spacing

```css
4px  8px  16px  24px  32px  48px  64px
xs   sm   md    lg    xl    2xl   3xl
```

### Typography

```css
/* Headings */
h1: 32px / 700
h2: 24px / 700
h3: 20px / 600

/* Body */
base: 16px / 400
small: 14px / 400
tiny: 12px / 400
```

---

## 📱 Telas (16 Total)

### Onboarding (4)
```
1. Login/Cadastro      → Verificação
2. Verificação         → Perfil
3. Perfil              → Boas-vindas
4. Boas-vindas         → Home
```

### Principal (5)
```
Home ──┬─→ Desejos
       ├─→ Criar
       ├─→ Meus Anúncios
       └─→ Chat
```

### Transação (7)
```
Produto → Negociação → Pagamento → Confirmação
   ↓
 Chat ←────────────────┘
```

---

## 🔄 Fluxos Principais

### 1. Onboarding (4 min)
```
Login → Verificação → Perfil → Boas-vindas → Home
[2m]     [1m]         [1m]     [30s]         [✓]

Drop-off: 30% (Verificação)
Solução: Background verification
```

### 2. Compra (6 min)
```
Home → Produto → Chat → Negociação → Pagamento → ✓
[30s]  [2m]     [1m]   [2m]         [1m]         

Conversão: 5%
Otimização: Unificar Chat + Negociação
```

### 3. Venda (5 min)
```
Home → Criar P1 → Criar P2 → Publicado
[30s]  [2m]      [2m]       [✓]

Taxa conclusão: 80%
Otimização: Upload múltiplo
```

---

## 📊 Métricas Críticas

### Onboarding
```yaml
Conclusão: > 70%
Tempo: < 5 min
Drop-off Máx: 30% (por etapa)
```

### Compra
```yaml
Conversão: > 5% (view → purchase)
Abandono Pagamento: < 20%
Tempo Médio: 6-7 min
```

### Venda
```yaml
Anúncios/usuário: > 1.5/mês
Time to First Sale: < 7 dias
Taxa Conclusão Criação: > 80%
```

### Engajamento
```yaml
DAU/MAU: > 25%
Retention D7: > 40%
Sessões/semana: > 5
NPS: > 50
```

---

## 🎯 Componentes Principais

### Botões
```tsx
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

Size: sm | md | lg
Icon: <Button><Icon />Text</Button>
```

### Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Desc</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>
```

### Input
```tsx
<Label>Label</Label>
<Input 
  placeholder="..." 
  type="text|email|password|number"
  required
/>
```

### Avatar
```tsx
<Avatar>
  <AvatarImage src={url} />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

### Badge
```tsx
<Badge variant="default|secondary|outline">
  Texto
</Badge>
```

---

## 🧭 Navegação

### Bottom Bar (5 itens)
```
[🏠 Home] [❤️ Desejos] [➕ Criar] [📦 Meus] [💬 Chat]
```

### Header Actions
```
← Voltar    Título    ⋮ Mais
```

### Rotas
```typescript
/login              // Onboarding
/verificacao
/perfil
/boas-vindas

/home               // Principal
/filtros
/produto/:id
/criar-anuncio
/chat
/desejos
/meus-anuncios

/negociacao         // Transação
/pagamento
/confirmacao
/avaliacao
```

---

## 🚦 Estados de UI

### Loading
```tsx
<Skeleton className="h-48 w-full" />
```

### Empty
```tsx
<EmptyState
  icon="📭"
  title="Nada aqui"
  description="Descrição"
  action={<Button>CTA</Button>}
/>
```

### Error
```tsx
<Alert variant="destructive">
  <AlertTitle>Erro!</AlertTitle>
  <AlertDescription>Mensagem</AlertDescription>
</Alert>
```

### Success
```tsx
<Toast type="success">
  ✅ Operação realizada!
</Toast>
```

---

## 🎨 Padrões de Design

### Cartão de Produto (Home)
```tsx
<Card>
  <Image /> {/* 16:9 ratio */}
  <CardContent>
    <h3>{title}</h3>
    <Price>{price}</Price>
    <Avatar + Nome + Curso />
  </CardContent>
  <HeartButton /> {/* Top-right */}
</Card>
```

### Chat Message
```tsx
{messages.map(msg => (
  <div className={msg.sender === 'me' ? 'justify-end' : 'justify-start'}>
    <MessageBubble
      variant={msg.sender === 'me' ? 'primary' : 'secondary'}
    >
      {msg.text}
      <Time>{msg.time}</Time>
    </MessageBubble>
  </div>
))}
```

### Form Layout (2 colunas)
```tsx
<form>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label>Campo 1</Label>
      <Input />
    </div>
    <div>
      <Label>Campo 2</Label>
      <Input />
    </div>
  </div>
</form>
```

---

## 📏 Breakpoints

```css
sm:  640px  /* Mobile landscape */
md:  768px  /* Tablet */
lg:  1024px /* Desktop */
xl:  1280px /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile First
```tsx
<div className="
  grid 
  grid-cols-1     /* Mobile */
  md:grid-cols-2  /* Tablet */
  lg:grid-cols-3  /* Desktop */
">
```

---

## ♿ Acessibilidade

### Contraste Mínimo
```
AA: 4.5:1 (texto normal)
AA: 3:1   (texto grande)
AAA: 7:1  (texto normal)
```

### Touch Target
```
Mínimo: 44×44px
Recomendado: 48×48px
```

### Screen Readers
```tsx
<button
  aria-label="Descrição completa"
  aria-describedby="id-elemento"
>
  <Icon /> {/* Decorativo */}
</button>

<img 
  alt="Descrição significativa"
  role="img"
/>

<Input
  aria-required="true"
  aria-invalid={hasError}
/>
```

---

## 🔔 Notificações

### Tipos
```yaml
CRITICAL:   Pagamento recebido, Produto vendido
HIGH:       Nova proposta, Mensagem importante
MEDIUM:     Novo like, Desconto em favorito
LOW:        Resumo semanal, Dicas
```

### Timing
```yaml
Imediato:   Transações, mensagens
2h depois:  Sem resposta (vendedor)
Diário:     Resumo de atividades
Semanal:    Produtos sem venda (sugestões)
```

### Template
```tsx
<Notification>
  <Icon /> {/* Contexto visual */}
  <Title>Título curto</Title>
  <Description>1 linha de descrição</Description>
  <Actions>
    <Button>CTA Primário</Button>
    <Button variant="ghost">Secundário</Button>
  </Actions>
</Notification>
```

---

## 📸 Assets

### Imagens
```yaml
Formato: WebP (fallback: JPG)
Qualidade: 80%
Max Size: 200KB
Aspect Ratio: 
  - Produto: 1:1 (quadrado)
  - Avatar: 1:1 (circular crop)
  - Banner: 16:9
```

### Ícones
```tsx
import { Icon } from 'lucide-react';

<Icon className="w-5 h-5" />

Tamanhos comuns:
- w-4 h-4  (16px) - Inline text
- w-5 h-5  (20px) - Botões
- w-6 h-6  (24px) - Headers
- w-8 h-8  (32px) - Featured
```

---

## 🔐 Validações

### Email
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isUniversity = email.endsWith('.edu.br');
```

### Senha
```typescript
Mínimo: 8 caracteres
Requer: 1 maiúscula, 1 minúscula, 1 número
```

### Preço
```typescript
Min: R$ 1
Max: R$ 100.000
Step: R$ 1
Format: R$ 1.234,56
```

### Texto
```typescript
Título: 10-100 caracteres
Descrição: 20-1000 caracteres
Mensagem: 1-500 caracteres
```

---

## 🎭 Animações

### Duração
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
```

### Easing
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

### Exemplos
```tsx
// Fade in
className="animate-in fade-in duration-200"

// Slide up
className="animate-in slide-in-from-bottom-4 duration-300"

// Scale
className="hover:scale-105 transition-transform"

// Skeleton shimmer
className="animate-pulse"
```

---

## 🐛 Debug

### Console Logs
```typescript
// Desenvolvimento apenas
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

### Error Boundaries
```tsx
<ErrorBoundary
  fallback={<ErrorScreen />}
  onError={(error) => logToSentry(error)}
>
  <App />
</ErrorBoundary>
```

### Analytics Events
```typescript
// Track critical events
analytics.track('product_viewed', {
  product_id: id,
  category: category,
  price: price
});

analytics.track('purchase_completed', {
  transaction_id: txId,
  value: amount
});
```

---

## 📦 Estrutura de Código

```
src/
├── app/
│   ├── App.tsx           # Router principal
│   └── components/
│       ├── Login.tsx
│       ├── Home.tsx
│       ├── ...
│       └── ui/           # Componentes base
│           ├── button.tsx
│           ├── card.tsx
│           └── ...
├── styles/
│   ├── theme.css         # Tokens CSS
│   └── fonts.css         # Font imports
└── imports/              # Assets Figma
    └── ...
```

---

## 🧪 Testes

### Testes de Usabilidade
```yaml
Frequência: Semanal
Participantes: 5 usuários
Tarefas:
  1. Criar conta (2 min)
  2. Buscar produto específico (1 min)
  3. Fazer uma oferta (2 min)
  4. Criar anúncio (3 min)
  
Métrica Sucesso: > 80% conclusão
```

### A/B Tests Prioritários
```yaml
1. Verificação: Bloqueante vs Background
   Métrica: Taxa conclusão onboarding
   
2. Chat: Separado vs Unificado com Negociação
   Métrica: Taxa de conversão
   
3. Upload: Sequencial vs Múltiplo
   Métrica: Taxa conclusão criação anúncio
```

---

## 🚀 Performance

### Targets
```yaml
FCP (First Contentful Paint): < 1.5s
LCP (Largest Contentful Paint): < 2.5s
TTI (Time to Interactive): < 3.5s
CLS (Cumulative Layout Shift): < 0.1

Bundle Size:
  Initial: < 200KB (gzipped)
  Total: < 2MB
```

### Otimizações
```typescript
// Lazy load routes
const ChatScreen = lazy(() => import('./Chat'));
const PaymentScreen = lazy(() => import('./Payment'));

// Image optimization
<img
  loading="lazy"
  decoding="async"
  src={url}
  srcSet={`${url}?w=400 400w, ${url}?w=800 800w`}
/>

// Prefetch critical resources
<link rel="prefetch" href="/api/products" />
```

---

## 🔗 Links Rápidos

| Preciso de... | Ir para... |
|---------------|------------|
| Visão geral | [README_UX.md](./README_UX.md) |
| Fluxos detalhados | [USER_FLOW.md](./USER_FLOW.md) |
| Diagramas | [USER_FLOW_DIAGRAM.md](./USER_FLOW_DIAGRAM.md) |
| Recomendações | [UX_RECOMMENDATIONS.md](./UX_RECOMMENDATIONS.md) |
| Resumo executivo | [EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md) |
| Começar | [QUICK_START.md](./QUICK_START.md) |

---

## 💡 Quick Tips

### Design
- ✅ Mobile first sempre
- ✅ Usar componentes do UI lib
- ✅ Manter consistência visual
- ✅ Testar em dispositivos reais
- ❌ Não criar componentes custom desnecessários

### UX
- ✅ Reduzir cliques (máx 3 para ação principal)
- ✅ Feedback visual em todas as ações
- ✅ Loading states sempre
- ✅ Mensagens de erro claras
- ❌ Não assumir que usuário sabe o que fazer

### Acessibilidade
- ✅ Contraste mínimo AA
- ✅ Touch target 44×44px
- ✅ Labels em todos os inputs
- ✅ Navegação por teclado
- ❌ Não usar apenas cor para informação

### Performance
- ✅ Lazy load telas secundárias
- ✅ Comprimir imagens (WebP)
- ✅ Evitar re-renders desnecessários
- ✅ Pagination em listas longas
- ❌ Não carregar tudo de uma vez

---

**Versão**: 1.0  
**Última atualização**: 04/05/2026

**Imprimir este cheatsheet e colar na parede!** 📌
