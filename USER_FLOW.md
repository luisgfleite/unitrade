# 📊 User Flow - UniTrade
## Marketplace Universitário de Vendas e Trocas

---

## 🎯 Objetivo do Documento
Mapear todas as jornadas do usuário no aplicativo UniTrade, identificando pontos de entrada, fluxos principais, ações secundárias e pontos de saída.

---

## 👤 Personas Principais
1. **Comprador** - Estudante que busca produtos
2. **Vendedor** - Estudante que anuncia produtos
3. **Usuário Híbrido** - Compra e vende simultaneamente

---

## 🗺️ Mapa Geral de Navegação

```
┌─────────────┐
│   Início    │
│  (Splash)   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  FLUXO DE ONBOARDING (Primeira Vez) │
└─────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│     HOME (Hub Principal)        │
│  ┌──────────────────────────┐  │
│  │ • Feed de Produtos       │  │
│  │ • Busca                  │  │
│  │ • Navegação (BottomBar)  │  │
│  └──────────────────────────┘  │
└────┬─────┬─────┬─────┬─────────┘
     │     │     │     │
     ▼     ▼     ▼     ▼
   [F1]  [F2]  [F3]  [F4]
```

**Legenda:**
- **F1** = Fluxo de Compra
- **F2** = Fluxo de Venda
- **F3** = Fluxo de Comunicação
- **F4** = Fluxo de Gerenciamento

---

## 📱 FLUXO 1: ONBOARDING (First-Time User Experience)

### Happy Path: Usuário novo se cadastra pela primeira vez

```
START
  │
  ▼
┌──────────────────┐
│  1. LOGIN/       │  ◄─── Ponto de Entrada
│  CADASTRO        │
│                  │  Ações:
│ • Email univ.    │  → Preencher email universitário
│ • Senha          │  → Criar senha
│ • Toggle Login/  │  → Alternar entre Login/Cadastro
│   Cadastro       │
└────────┬─────────┘
         │ [Clicar: "Criar conta" ou "Entrar"]
         ▼
┌──────────────────┐
│  2. VERIFICAÇÃO  │
│  ACADÊMICA       │
│                  │  Ações:
│ • Upload         │  → Fazer upload do comprovante
│   documento      │     de matrícula (PDF/JPG/PNG)
│ • Feedback       │  → Aguardar validação visual
│   visual         │
└────────┬─────────┘
         │ [Clicar: "Continuar"]
         ▼
┌──────────────────┐
│  3. COMPLETAR    │
│  PERFIL          │
│                  │  Ações:
│ • Foto avatar    │  → Upload foto de perfil
│ • Nome completo  │  → Preencher nome
│ • Curso          │  → Informar curso
│ • Bio (opcional) │  → Adicionar biografia
└────────┬─────────┘
         │ [Clicar: "Finalizar cadastro"]
         ▼
┌──────────────────┐
│  4. BOAS-VINDAS  │
│                  │  Conteúdo:
│ • Apresentação   │  → Mostrar recursos principais
│   de recursos    │  → Onboarding educacional
│ • Features       │  → 3 cards de benefícios
│   principais     │
└────────┬─────────┘
         │ [Clicar: "Começar a explorar"]
         ▼
┌──────────────────┐
│  5. HOME FEED    │  ◄─── Primeiro acesso ao app
└──────────────────┘

END (Onboarding completo)
```

### Pontos de Decisão:
- **Login vs Cadastro**: Toggle na mesma tela
- **Skip perfil?**: Não (obrigatório para verificação)
- **Boas-vindas**: Pode pular para Home

### Métricas de Sucesso:
- Taxa de conclusão do onboarding
- Tempo médio para completar
- Taxa de abandono em cada etapa

---

## 🛍️ FLUXO 2: COMPRA DE PRODUTO (Buyer Journey)

### Happy Path: Usuário encontra, negocia e compra um produto

```
START (Home Feed)
  │
  ▼
┌─────────────────────┐
│  1. HOME FEED       │
│                     │  Ações:
│ • Grid produtos     │  → Scroll feed de produtos
│ • Busca/Filtros     │  → Buscar por palavra-chave
│ • Categorias        │  → Clicar em produto
│                     │  → Favoritar produto (❤️)
└──────┬──────────────┘
       │
       ├─────────────────────┐
       │                     │
       │ [Clicar: Filtros]   │ [Clicar: Card do Produto]
       ▼                     ▼
┌──────────────────┐   ┌──────────────────────┐
│  1.1 FILTROS E   │   │  2. DETALHES DO      │
│  CATEGORIAS      │   │  PRODUTO             │
│                  │   │                      │
│ • Categorias     │   │ • Galeria imagens    │
│ • Faixa preço    │   │ • Título, preço      │
│ • Cursos         │   │ • Descrição          │
│                  │   │ • Info vendedor      │
└────────┬─────────┘   │ • Localização        │
         │             │ • Avaliações         │
         │             └──────┬───────────────┘
         │                    │
         │ [Aplicar filtros]  │ [Decisão: O que fazer?]
         │                    │
         └────────┬───────────┴──────────┬─────────────┐
                  ▼                      ▼             ▼
         ┌────────────────┐    ┌─────────────────┐  ┌──────────────┐
         │ Voltar ao      │    │ 3. CHAT COM     │  │ 4. FAZER     │
         │ HOME (com      │    │ VENDEDOR        │  │ OFERTA       │
         │ filtros)       │    │                 │  │              │
         └────────────────┘    │ • Conversa      │  │ • Valor      │
                               │ • Negociação    │  │   proposta   │
                               │ • Dúvidas       │  │ • Mensagem   │
                               └────────┬────────┘  │ • Valores    │
                                        │           │   sugeridos  │
                                        │           └──────┬───────┘
                                        │                  │
                                        │ [Acordo fechado] │ [Enviar proposta]
                                        │                  │
                                        └──────────┬───────┘
                                                   ▼
                                        ┌────────────────────┐
                                        │ 5. PAGAMENTO       │
                                        │                    │
                                        │ • Resumo pedido    │
                                        │ • PIX / Cartão     │
                                        │ • Local retirada   │
                                        │ • Taxa serviço     │
                                        └──────────┬─────────┘
                                                   │ [Confirmar pagamento]
                                                   ▼
                                        ┌────────────────────┐
                                        │ 6. CONFIRMAÇÃO     │
                                        │                    │
                                        │ • Nº do pedido     │
                                        │ • Valor pago       │
                                        │ • Próximos passos  │
                                        │ • Chat vendedor    │
                                        └──────────┬─────────┘
                                                   │
                          ┌────────────────────────┴────────────┐
                          │ [Produto recebido]                  │
                          ▼                                     ▼
                   ┌──────────────┐                    ┌────────────────┐
                   │ 7. AVALIAÇÃO │                    │ Voltar ao HOME │
                   │              │                    └────────────────┘
                   │ • Estrelas   │
                   │ • Comentário │
                   │ • Aspectos   │
                   └──────┬───────┘
                          │ [Enviar avaliação]
                          ▼
                   ┌──────────────┐
                   │  HOME FEED   │
                   └──────────────┘

END (Ciclo de compra completo)
```

### Fluxos Alternativos:
1. **Favoritar sem comprar**: Home → Produto → ❤️ → Lista Desejos
2. **Apenas consultar**: Home → Produto → Voltar
3. **Negociação longa**: Produto → Chat → Negociação → Chat → Pagamento

### Pontos de Abandono Críticos:
- Detalhes do Produto (alta taxa de bounce esperada)
- Negociação (preço não aceito)
- Pagamento (desistência por preço final)

---

## 💼 FLUXO 3: VENDA DE PRODUTO (Seller Journey)

### Happy Path: Usuário cria anúncio e vende produto

```
START (Home Feed)
  │
  │ [Clicar: Botão "+" central (BottomBar)]
  ▼
┌────────────────────────┐
│ 1. CRIAR ANÚNCIO       │
│ PASSO 1                │
│                        │  Ações:
│ • Upload fotos (3)     │  → Upload imagens do produto
│ • Título anúncio       │  → Preencher título descritivo
│ • Categoria            │  → Selecionar categoria
│ • Estado produto       │  → Escolher condição
└──────────┬─────────────┘
           │ [Clicar: "Próximo"]
           ▼
┌────────────────────────┐
│ 2. CRIAR ANÚNCIO       │
│ PASSO 2                │
│                        │  Ações:
│ • Descrição detalhada  │  → Escrever descrição
│ • Preço                │  → Definir preço
│ • Negociável? (Sim/Não)│  → Toggle negociação
│ • Aceita trocas?       │  → Selecionar trocas
└──────────┬─────────────┘
           │ [Clicar: "Publicar anúncio"]
           ▼
┌────────────────────────┐
│ 3. CONFIRMAÇÃO         │
│                        │  Feedback:
│ • Anúncio publicado!   │  → Confirmação visual
│ • ID do anúncio        │  → Ver anúncio publicado
└──────────┬─────────────┘
           │
           ├──────────────────────┬────────────────┐
           │                      │                │
           ▼                      ▼                ▼
    ┌─────────────┐      ┌──────────────┐  ┌─────────────┐
    │ 4a. HOME    │      │ 4b. MEUS     │  │ 4c. CHAT    │
    │             │      │ ANÚNCIOS     │  │ INBOX       │
    │ Ver anúncio │      │              │  │             │
    │ no feed     │      │ • Ativos     │  │ Receber     │
    └─────────────┘      │ • Vendidos   │  │ mensagens   │
                         │ • Estatísticas│  │ de          │
                         │   (views, msgs)│ │ compradores │
                         └───────┬────────┘ └──────┬──────┘
                                 │                 │
                      [Receber proposta/mensagem]  │
                                 │                 │
                                 └────────┬────────┘
                                          ▼
                                 ┌─────────────────┐
                                 │ 5. CHAT COM     │
                                 │ COMPRADOR       │
                                 │                 │
                                 │ • Negociar      │
                                 │ • Responder     │
                                 │ • Aceitar oferta│
                                 └────────┬────────┘
                                          │ [Acordo fechado]
                                          ▼
                                 ┌─────────────────┐
                                 │ 6. COMPRADOR    │
                                 │ REALIZA         │
                                 │ PAGAMENTO       │
                                 │                 │
                                 │ Vendedor recebe │
                                 │ notificação     │
                                 └────────┬────────┘
                                          │ [Combinar entrega via chat]
                                          ▼
                                 ┌─────────────────┐
                                 │ 7. PRODUTO      │
                                 │ ENTREGUE        │
                                 │                 │
                                 │ Marcar como     │
                                 │ "Vendido"       │
                                 └────────┬────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │ 8. RECEBER      │
                                 │ AVALIAÇÃO       │
                                 │                 │
                                 │ Comprador avalia│
                                 │ vendedor        │
                                 └────────┬────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │ MEUS ANÚNCIOS   │
                                 │ (Tab: Vendidos) │
                                 └─────────────────┘

END (Ciclo de venda completo)
```

### Fluxos Alternativos:
1. **Editar anúncio**: Meus Anúncios → Editar → Atualizar info
2. **Deletar anúncio**: Meus Anúncios → Deletar → Confirmação
3. **Múltiplas propostas**: Chat → Gerenciar várias conversas

---

## 💬 FLUXO 4: COMUNICAÇÃO (Messaging Flow)

### Happy Path: Usuário inicia ou responde conversa

```
START
  │
  ├────────────────────┬─────────────────┐
  │                    │                 │
  │ [Via Home]         │ [Via Produto]   │ [Via Notificação]
  ▼                    ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ BottomBar:   │  │ Detalhes     │  │ Notificação  │
│ Mensagens    │  │ Produto:     │  │ "Nova        │
│ (ícone)      │  │ "Conversar"  │  │ mensagem"    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └────────┬────────┴─────────────────┘
                ▼
       ┌─────────────────┐
       │ 1. CHAT INBOX   │
       │                 │  Conteúdo:
       │ • Lista de      │  → Conversas ativas
       │   conversas     │  → Badge (não lidas)
       │ • Preview msg   │  → Curso do contato
       │ • Badge unread  │  → Timestamp
       │ • Busca         │
       └────────┬────────┘
                │ [Selecionar conversa]
                ▼
       ┌─────────────────┐
       │ 2. CONVERSA     │
       │ INDIVIDUAL      │
       │                 │  Ações:
       │ • Histórico     │  → Ver mensagens anteriores
       │ • Avatar/nome   │  → Enviar mensagem
       │ • Status online │  → Ver info produto
       │ • Input texto   │  → Fazer proposta
       └────────┬────────┘
                │
                ├─────────────────┬──────────────┐
                │                 │              │
                │ [Negociar]      │ [Combinar]   │ [Finalizar]
                ▼                 ▼              ▼
       ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
       │ Ir para      │  │ Marcar       │  │ Arquivar     │
       │ NEGOCIAÇÃO   │  │ encontro     │  │ conversa     │
       └──────────────┘  └──────────────┘  └──────────────┘

END
```

### Pontos de Entrada:
1. **Home → Ícone Mensagens** (BottomBar)
2. **Detalhes Produto → Botão "Conversar"**
3. **Notificação Push → Abrir chat**
4. **Confirmação Pagamento → Botão "Chat"**

---

## ❤️ FLUXO 5: LISTA DE DESEJOS (Wishlist Flow)

### Happy Path: Usuário salva e gerencia favoritos

```
START
  │
  ├────────────────────┬─────────────────┐
  │                    │                 │
  │ [Via Home Feed]    │ [Via Produto]   │ [Via BottomBar]
  ▼                    ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Card Produto │  │ Detalhes     │  │ BottomBar:   │
│ Botão ❤️     │  │ Produto:     │  │ Bookmark     │
│              │  │ Botão ❤️     │  │ (ícone)      │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       │ [Clicar: Coração]                 │
       │                 │                 │
       └────────┬────────┘                 │
                ▼                          │
       ┌─────────────────┐                 │
       │ FEEDBACK VISUAL │                 │
       │                 │                 │
       │ • Coração fill  │                 │
       │ • Animação      │                 │
       │ • Toast msg     │                 │
       └─────────────────┘                 │
                                           │
                ┌──────────────────────────┘
                ▼
       ┌─────────────────┐
       │ 1. LISTA DE     │
       │ DESEJOS         │
       │                 │  Conteúdo:
       │ • Grid produtos │  → Produtos favoritados
       │ • Busca         │  → Remover favorito (🗑️)
       │ • Contador      │  → Clicar para ver detalhes
       └────────┬────────┘
                │
                ├─────────────────┬──────────────┐
                │                 │              │
                │ [Clicar produto]│ [Remover]    │ [Buscar]
                ▼                 ▼              ▼
       ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
       │ DETALHES DO  │  │ Confirmar    │  │ Filtrar      │
       │ PRODUTO      │  │ remoção      │  │ favoritos    │
       │              │  │              │  │              │
       │ (Fluxo       │  │ Item removido│  │              │
       │  Compra)     │  │ da lista     │  │              │
       └──────────────┘  └──────────────┘  └──────────────┘

END
```

---

## 📦 FLUXO 6: GERENCIAMENTO DE ANÚNCIOS (My Listings)

### Happy Path: Vendedor gerencia seus produtos

```
START (Home)
  │
  │ [BottomBar: Ícone ShoppingBag]
  ▼
┌──────────────────────┐
│ 1. MEUS ANÚNCIOS     │
│                      │  Tabs:
│ ┌──────────────────┐ │  → Anúncios Ativos
│ │ TAB: ATIVOS      │ │  → Anúncios Vendidos
│ │ TAB: VENDIDOS    │ │
│ └──────────────────┘ │
│                      │  Conteúdo (Ativos):
│ • Lista anúncios    │  → Foto, título, preço
│ • Estatísticas      │  → Views, mensagens
│   (views, msgs)     │  → Botões: Editar, Deletar
│ • Botão "+ Novo"    │
└──────────┬───────────┘
           │
           ├───────────────────┬──────────────┬─────────────┐
           │                   │              │             │
           │ [Editar]          │ [Deletar]    │ [+ Novo]    │ [Ver Vendidos]
           ▼                   ▼              ▼             ▼
  ┌─────────────────┐ ┌──────────────┐ ┌─────────────┐ ┌──────────────┐
  │ 2a. EDITAR      │ │ 2b. CONFIRMAR│ │ 2c. CRIAR   │ │ 2d. TAB      │
  │ ANÚNCIO         │ │ EXCLUSÃO     │ │ ANÚNCIO     │ │ VENDIDOS     │
  │                 │ │              │ │             │ │              │
  │ • Form igual    │ │ • Alert      │ │ (Fluxo 3)   │ │ • Histórico  │
  │   criação       │ │ • Confirmar  │ │             │ │ • Data venda │
  │ • Pré-preenchido│ │ • Cancelar   │ │             │ │ • Comprador  │
  └────────┬────────┘ └──────┬───────┘ └─────────────┘ │ • Avaliação  │
           │                 │                         │   recebida   │
           │ [Salvar]        │ [Confirmar]             └──────────────┘
           │                 │
           └────────┬────────┘
                    ▼
           ┌─────────────────┐
           │ Atualização     │
           │ confirmada      │
           │                 │
           │ Toast feedback  │
           └────────┬────────┘
                    │
                    ▼
           ┌─────────────────┐
           │ MEUS ANÚNCIOS   │
           │ (atualizado)    │
           └─────────────────┘

END
```

---

## 🔄 FLUXOS SECUNDÁRIOS

### A. Busca e Filtros

```
Home → Input Busca → Resultados → Produto
  │
  └─→ Botão Filtros → Categorias/Preço → Aplicar → Home (filtrado)
```

### B. Notificações

```
Notificação Push
  │
  ├─→ Nova Mensagem → Chat
  ├─→ Proposta Recebida → Negociação
  ├─→ Pagamento Aprovado → Confirmação
  └─→ Produto Vendido → Meus Anúncios
```

### C. Navegação Bottom Bar

```
┌─────────────────────────────────┐
│  [Home] [Desejos] [+] [Anúncios] [Chat]
└─────────────────────────────────┘
   │        │       │      │         │
   ▼        ▼       ▼      ▼         ▼
 Feed   Wishlist  Criar  Meus    Messages
                         Anúncios
```

---

## 📊 MATRIZ DE NAVEGAÇÃO

| Origem → Destino | Home | Produto | Chat | Criar | Meus | Desejos | Pagamento |
|------------------|------|---------|------|-------|------|---------|-----------|
| **Home**         | —    | ✅ Click| ✅ Nav| ✅ Nav| ✅ Nav| ✅ Nav  | ❌        |
| **Produto**      | ✅ Back| —     | ✅ Btn| ❌    | ❌   | ✅ ❤️   | ✅ Oferta |
| **Chat**         | ✅ Nav| ✅ Link| —     | ❌    | ❌   | ❌      | ❌        |
| **Criar**        | ✅ Back| ❌    | ❌    | —     | ✅ Pub| ❌     | ❌        |
| **Meus**         | ✅ Nav| ✅ Click| ❌   | ✅ Btn| —    | ❌      | ❌        |
| **Desejos**      | ✅ Nav| ✅ Click| ❌   | ❌    | ❌   | —       | ❌        |
| **Pagamento**    | ❌    | ❌     | ✅ Btn| ❌    | ❌   | ❌      | —         |

**Legenda:**
- ✅ = Navegação disponível
- ❌ = Navegação não disponível
- Nav = Via Bottom Navigation
- Back = Botão voltar
- Btn = Botão específico
- Click = Click em elemento

---

## 🎯 PONTOS CRÍTICOS DA JORNADA

### 1. **Momento Aha! (Aha Moment)**
- **Localização**: Home Feed (primeira visualização de produtos)
- **Gatilho**: Ver produtos relevantes da própria universidade
- **Métrica**: Tempo até primeiro click em produto < 30s

### 2. **Pontos de Fricção**
- **Onboarding**: Upload de verificação acadêmica
  - **Solução**: Aceitar múltiplos formatos, feedback em tempo real
- **Negociação**: Múltiplas idas entre Chat e Negociação
  - **Solução**: Integrar proposta dentro do Chat
- **Pagamento**: Desistência por taxa de serviço
  - **Solução**: Mostrar transparência de custos desde o início

### 3. **Pontos de Deleite**
- Confirmação de pagamento com animação
- Feedback de favorito com animação de coração
- Toast de anúncio publicado

---

## 📈 MÉTRICAS POR FLUXO

### Onboarding
- **Taxa de conclusão**: % usuários que completam até Home
- **Tempo médio**: Minutos do Login até Home
- **Taxa de abandono por etapa**

### Compra
- **Conversão funil**: Home → Produto → Negociação → Pagamento → Confirmação
- **Tempo médio de compra**: Da visualização até pagamento
- **Taxa de abandono no pagamento**

### Venda
- **Anúncios criados/usuário/mês**
- **Taxa de conclusão de criação**: Início → Publicação
- **Tempo até primeira venda**

### Comunicação
- **Taxa de resposta**: % mensagens respondidas em < 24h
- **Conversas que levam a venda**: %

---

## 🚀 PRÓXIMOS PASSOS

1. **Prototipagem**: Criar protótipo clicável no Figma
2. **Teste de Usabilidade**: Testar com 5-10 estudantes
3. **Heatmap**: Identificar áreas de maior interação
4. **A/B Testing**: Testar variações de fluxos críticos

---

## 📝 NOTAS DE ARQUITETURA DE INFORMAÇÃO

### Hierarquia de Navegação
```
Nível 1 (Primary): Bottom Navigation Bar
  ├─ Home (Feed principal)
  ├─ Desejos
  ├─ Criar (+)
  ├─ Meus Anúncios
  └─ Chat

Nível 2 (Secondary): Navegação contextual
  ├─ Filtros (modal)
  ├─ Detalhes do Produto
  ├─ Negociação
  └─ Pagamento

Nível 3 (Tertiary): Confirmações/Feedback
  ├─ Confirmação Pagamento
  ├─ Avaliação
  └─ Confirmação Criação Anúncio
```

### Profundidade Máxima
- **Onboarding**: 4 níveis (Login → Verif. → Perfil → Boas-vindas)
- **Compra**: 5 níveis (Home → Produto → Negociação → Pagamento → Confirmação)
- **Venda**: 3 níveis (Home → Criar P1 → Criar P2)

---

**Documento criado em**: 04/05/2026  
**Versão**: 1.0  
**Status**: Completo ✅
