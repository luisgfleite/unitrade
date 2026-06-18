# Documentação Técnica — UniTrade

**UniTrade** é um marketplace universitário para compra, venda e troca de itens entre membros verificados de uma comunidade acadêmica (estudantes, professores e servidores), com verificação acadêmica, moderação administrativa, pagamento protegido por garantia (*escrow*) e chat em tempo real.

> Projeto Final — Prototipagem de Sistemas Computacionais · UNIPÊ · Profa. Joanacelle C. Melo

---

## 1. Visão geral da arquitetura

O sistema segue uma arquitetura **SPA + BaaS** (Single Page Application + Backend as a Service), sem servidor próprio:

```
┌─────────────────────────────┐         ┌──────────────────────────────┐
│   FRONTEND (SPA)            │         │   BACKEND (Supabase)         │
│   React 18 + Vite 6        │  HTTPS  │   • PostgreSQL                │
│   Tailwind v4 + Radix UI   │ ◄─────► │   • Auth (e-mail/senha)       │
│   React Router 7           │         │   • Storage (arquivos)        │
│   Supabase JS Client       │         │   • Realtime (WebSocket)      │
│                             │         │   • Row Level Security (RLS)  │
└─────────────────────────────┘         └──────────────────────────────┘
        │                                          │
        └──────────── Deploy: Vercel ──────────────┘ (alvo)
```

- **Sem backend customizado:** o cliente conversa diretamente com o Supabase via SDK. As regras de negócio críticas vivem no banco (políticas RLS + funções `security definer`), não no front — o que garante segurança mesmo que o cliente seja manipulado.
- **Hospedagem:** front estático (build do Vite) servido pela Vercel; dados e autenticação no Supabase.

---

## 2. Frameworks e bibliotecas

### 2.1. Núcleo (framework + build)

| Tecnologia | Versão | Papel |
|---|---|---|
| **React** | 18.3.1 | Biblioteca de UI baseada em componentes |
| **Vite** | 6.3.5 | Build tool e dev server (HMR, bundling com Rollup/esbuild) |
| **TypeScript** | (via tooling) | Tipagem estática em todo o código |
| **@vitejs/plugin-react** | 4.7.0 | Integração React + Fast Refresh no Vite |

### 2.2. Backend / dados

| Biblioteca | Versão | Papel |
|---|---|---|
| **@supabase/supabase-js** | ^2.108.2 | Cliente do Supabase: Auth, consultas ao Postgres, Storage e Realtime |

### 2.3. Roteamento

| Biblioteca | Versão | Papel |
|---|---|---|
| **react-router-dom** | ^7.14.2 | Roteamento SPA, rotas protegidas, parâmetros de URL e query strings |

### 2.4. Estilização e UI

| Biblioteca | Versão | Papel |
|---|---|---|
| **tailwindcss** | 4.1.12 | CSS utilitário (estilização) |
| **@tailwindcss/vite** | 4.1.12 | Plugin do Tailwind v4 para o Vite |
| **Radix UI** (`@radix-ui/react-*`) | várias | Componentes acessíveis sem estilo (dialog, dropdown, tabs, select, tooltip, etc.) — base do design system (padrão shadcn/ui) |
| **lucide-react** | 0.487.0 | Ícones SVG |
| **class-variance-authority** | 0.7.1 | Variantes de classe para componentes |
| **clsx** + **tailwind-merge** | 2.1.1 / 3.2.0 | Composição e deduplicação de classes Tailwind |
| **@mui/material** + **@emotion** | 7.3.5 | Componentes Material UI (disponível no projeto) |
| **tw-animate-css** | 1.3.8 | Utilitários de animação para Tailwind |

### 2.5. Experiência / interação

| Biblioteca | Versão | Papel |
|---|---|---|
| **motion** | 12.23.24 | Animações (entrada de cards, navegação, transições) |
| **sonner** | 2.0.3 | Notificações *toast* |
| **react-hook-form** | 7.55.0 | Formulários (disponível) |
| **recharts** | 2.15.2 | Gráficos (disponível) |
| **embla-carousel-react**, **vaul**, **cmdk**, **react-day-picker** | — | Carrossel, drawer, command palette, datas |

### 2.6. API externa

| Serviço | Papel |
|---|---|
| **ViaCEP** (`https://viacep.com.br`) | Autopreenchimento de endereço a partir do CEP no “ponto de encontro” do anúncio |

---

## 3. Estrutura de pastas

```
Unitrade/
├── index.html                  # HTML raiz da SPA (+ metatags de SEO)
├── vite.config.ts              # Config do Vite (plugins React + Tailwind, alias @)
├── pnpm-workspace.yaml         # nodeLinker: hoisted (compat. OneDrive/Windows)
├── .env.local                  # VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (não versionar)
├── supabase/
│   ├── schema.sql              # Tabelas, RLS, trigger de perfil, buckets de storage
│   ├── orders.sql              # Pedidos (escrow) + funções de transição de estado
│   └── address.sql             # Colunas de endereço + ponto de encontro nos pedidos
├── pitch/
│   └── index.html              # Apresentação (pitch deck) standalone
└── src/
    ├── main.tsx                # Ponto de entrada (createRoot)
    ├── lib/
    │   ├── supabase.ts         # Cliente Supabase + tipos (Profile, Listing)
    │   ├── auth.tsx            # AuthProvider/useAuth (sessão, perfil, login/cadastro)
    │   ├── data.ts             # Acesso a dados (feed, wishlist, pedidos, helpers)
    │   └── cep.ts              # Integração ViaCEP + formatação de endereço
    └── app/
        ├── App.tsx             # Rotas + guards (Protected / AdminOnly)
        └── components/
            ├── Login.tsx, Verificacao.tsx, Perfil.tsx, BoasVindas.tsx
            ├── Home.tsx, DetalheProduto.tsx, Desejos.tsx, CriarAnuncio.tsx
            ├── MeusAnuncios.tsx, Chat.tsx, Pagamento.tsx
            ├── Pedidos.tsx, PedidoDetalhe.tsx, Admin.tsx
            ├── shared/         # BottomNav, VerifyBanner, AddressFields
            └── ui/             # Componentes base (Radix/shadcn): button, card, tabs...
```

Alias `@` → `src/` (definido no `vite.config.ts`).

---

## 4. Modelo de dados (PostgreSQL)

| Tabela | Descrição |
|---|---|
| `profiles` | Perfil do usuário (espelha `auth.users`). Campos-chave: `role` (`user`/`admin`), `is_verified`, `verification_status`, dados acadêmicos. |
| `verification_requests` | Pedidos de verificação acadêmica (documento enviado, status, revisor). |
| `listings` | Anúncios (título, preço, categoria, imagens, status, endereço/ponto de encontro). |
| `wishlists` | Lista de desejos (relação usuário ↔ anúncio). |
| `conversations` / `messages` | Chat entre comprador e vendedor (uma conversa por anúncio/comprador). |
| `orders` | Pedidos com fluxo de escrow (snapshot do item, valor, status, datas). |

**Status do anúncio:** `pending` → `approved` → `reserved` (em garantia) → `sold`; ou `rejected`.
**Status do pedido:** `awaiting_payment` → `paid` → `completed`; ou `cancelled`.

Um *trigger* (`handle_new_user`) cria automaticamente uma linha em `profiles` quando um usuário se cadastra em `auth.users`.

---

## 5. Segurança (Row Level Security)

Toda tabela tem **RLS habilitado**. As regras críticas são impostas no banco:

- **Visualização aberta, ação restrita:** qualquer logado vê anúncios `approved`; mas **só usuários verificados** (`is_verified = true`) podem inserir anúncios, criar conversas e enviar mensagens.
- **Funções auxiliares** `is_admin()` e `is_verified()` (`security definer`) centralizam as checagens.
- **Documentos privados:** o bucket `documents` só permite que o dono (`pasta = uid`) e admins leiam; `listing-images` e `avatars` são públicos para leitura.
- **Transições de pedido protegidas:** as mudanças de estado do escrow são feitas por **funções `security definer`** (ver seção 6), impedindo, por exemplo, que o comprador “libere” o pagamento sozinho.

---

## 6. Fluxo de pagamento (escrow) — funções do banco

As transições de estado do pedido são RPCs PostgreSQL (`security definer`), chamadas via `supabase.rpc(...)`:

| Função | Quem chama | Efeito |
|---|---|---|
| `create_order(listing)` | comprador verificado | Cria pedido `awaiting_payment` (valida anúncio aprovado e que não é o próprio). |
| `pay_order(order, método)` | comprador | `paid` + reserva o anúncio (`reserved`). Valor fica “em garantia”. |
| `mark_shipped(order)` | vendedor | Marca como enviado/entregue (informativo). |
| `confirm_delivery(order)` | comprador | `completed` + libera ao vendedor + anúncio vira `sold`. |
| `cancel_order(order)` | comprador ou vendedor | `cancelled` + estorno + devolve o anúncio ao feed. |

---

## 7. Autenticação e fluxos principais

1. **Cadastro/Login** (`Login.tsx` + `auth.tsx`): e-mail/senha via Supabase Auth. O `AuthProvider` mantém sessão e perfil em contexto e expõe `isAdmin` / `isVerified`.
2. **Verificação acadêmica** (`Verificacao.tsx`): upload do documento para o Storage → cria `verification_request` → admin aprova/recusa no painel.
3. **Anúncio** (`CriarAnuncio.tsx`): upload de imagens + endereço (ViaCEP) → entra como `pending` → admin aprova → aparece no feed.
4. **Feed / busca / desejos** (`Home.tsx`, `Desejos.tsx`): lista anúncios aprovados, busca por título (`ilike`), filtro por categoria e favoritos.
5. **Compra (escrow)** (`DetalheProduto` → `Pagamento` → `PedidoDetalhe`): comprar → pagar (simulado) → confirmar recebimento → liberar.
6. **Chat** (`Chat.tsx`): conversas e mensagens em **tempo real** via Supabase Realtime (canal por conversa).
7. **Painel admin** (`Admin.tsx`): aprovar verificações e anúncios, listar/gerenciar usuários (verificar, promover) e estatísticas.

**Rotas protegidas** (`App.tsx`): `Protected` exige sessão; `AdminOnly` exige `role = admin`.

---

## 8. Configuração e execução

### Pré-requisitos
- Node.js 18+ e **pnpm** (`corepack enable pnpm`).

### Variáveis de ambiente (`.env.local`)
```
VITE_SUPABASE_URL=https://<seu-projeto>.supabase.co
VITE_SUPABASE_ANON_KEY=<chave publishable/anon>
```

### Banco de dados
No **SQL Editor** do Supabase, executar **nesta ordem**: `schema.sql` → `orders.sql` → `address.sql`. Para tornar um usuário admin:
```sql
update public.profiles set role = 'admin' where email = 'seu.email@universidade.edu.br';
```

### Comandos
```bash
pnpm install     # instala dependências
pnpm dev         # ambiente de desenvolvimento (http://localhost:5173)
pnpm build       # build de produção (pasta dist/)
```

> **Nota de ambiente (Windows/OneDrive):** o projeto usa `nodeLinker: hoisted` no `pnpm-workspace.yaml` porque o OneDrive bloqueia os *symlinks* padrão do pnpm. `react`/`react-dom` 18.3.1 foram adicionados explicitamente (vinham como peer opcional no export do Figma Make).

### Deploy (Vercel)
- Framework: **Vite** · Build: `pnpm build` · Output: `dist`
- Definir `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas *Environment Variables* da Vercel.

---

## 9. Resumo do stack

> **React 18 + Vite 6 + TypeScript** no front · **Tailwind v4 + Radix UI** na interface · **React Router 7** na navegação · **Supabase** (PostgreSQL + Auth + Storage + Realtime + RLS) no backend · **motion** nas animações · **ViaCEP** para endereços · deploy serverless na **Vercel**.
