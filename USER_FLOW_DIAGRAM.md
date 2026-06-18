# 📊 Diagramas Visuais - User Flow UniTrade

## 🎨 Fluxo Principal (Happy Path Completo)

```mermaid
graph TD
    Start([Início]) --> Login[🔐 Login/Cadastro]
    Login --> Verificacao[📄 Verificação Acadêmica]
    Verificacao --> Perfil[👤 Completar Perfil]
    Perfil --> BoasVindas[✨ Boas-vindas]
    BoasVindas --> Home[🏠 Home Feed]
    
    Home --> |Buscar produtos| Filtros[🔍 Filtros]
    Filtros --> Home
    
    Home --> |Click produto| DetalheProduto[📦 Detalhes do Produto]
    
    DetalheProduto --> |❤️ Favoritar| Desejos[❤️ Lista de Desejos]
    DetalheProduto --> |💬 Conversar| Chat[💬 Chat]
    DetalheProduto --> |💰 Fazer oferta| Negociacao[💰 Negociação]
    
    Negociacao --> Pagamento[💳 Pagamento]
    Pagamento --> Confirmacao[✅ Confirmação]
    Confirmacao --> Avaliacao[⭐ Avaliação]
    Avaliacao --> Home
    
    Home --> |+ Criar| CriarP1[📝 Criar Anúncio - Passo 1]
    CriarP1 --> CriarP2[📝 Criar Anúncio - Passo 2]
    CriarP2 --> ConfirmacaoAnuncio[✅ Anúncio Publicado]
    ConfirmacaoAnuncio --> MeusAnuncios[📦 Meus Anúncios]
    
    Home --> |Ver meus anúncios| MeusAnuncios
    Home --> |Ver favoritos| Desejos
    Home --> |Mensagens| Chat
    
    style Start fill:#e1bee7
    style Home fill:#81c784
    style Confirmacao fill:#4caf50
    style ConfirmacaoAnuncio fill:#4caf50
```

---

## 🛍️ Fluxo de Compra Detalhado

```mermaid
graph TD
    A[🏠 Home Feed] --> B{O que fazer?}
    B --> |Buscar| C[🔍 Aplicar Filtros]
    B --> |Navegar| D[📱 Scroll Feed]
    
    C --> E[📋 Resultados Filtrados]
    D --> E
    
    E --> F[📦 Click em Produto]
    F --> G[📦 Detalhes do Produto]
    
    G --> H{Decisão}
    H --> |Não gostou| I[⬅️ Voltar ao Feed]
    H --> |Gostou| J{Ação}
    
    J --> |❤️| K[❤️ Adicionar aos Favoritos]
    J --> |💬| L[💬 Iniciar Chat]
    J --> |💰| M[💰 Fazer Proposta]
    
    K --> G
    
    L --> N[💬 Conversa com Vendedor]
    N --> O{Acordo?}
    O --> |Não| P[⬅️ Continuar Negociando]
    O --> |Sim| Q[💳 Ir para Pagamento]
    
    M --> R[💰 Tela de Negociação]
    R --> S[💵 Inserir Valor da Proposta]
    S --> T[📝 Mensagem Opcional]
    T --> U[📤 Enviar Proposta]
    U --> N
    
    P --> N
    
    Q --> V[💳 Escolher Método de Pagamento]
    V --> W{Método}
    W --> |PIX| X[🔳 Gerar QR Code]
    W --> |Cartão| Y[💳 Preencher Dados do Cartão]
    
    X --> Z[✅ Pagamento Aprovado]
    Y --> Z
    
    Z --> AA[✅ Tela de Confirmação]
    AA --> AB{O que fazer?}
    AB --> |💬| AC[💬 Chat com Vendedor]
    AB --> |🏠| AD[🏠 Voltar ao Home]
    
    AC --> AE[📍 Combinar Local de Retirada]
    AE --> AF[📦 Produto Recebido]
    AF --> AG[⭐ Avaliar Vendedor]
    AG --> AD
    
    style A fill:#81c784
    style Z fill:#4caf50
    style AA fill:#4caf50
    style AG fill:#ffb74d
```

---

## 💼 Fluxo de Venda Detalhado

```mermaid
graph TD
    A[🏠 Home Feed] --> B[➕ Click Botão +]
    B --> C[📝 Criar Anúncio - Passo 1]
    
    C --> D[📸 Upload Fotos]
    D --> E{Fotos ok?}
    E --> |Não| D
    E --> |Sim| F[✍️ Preencher Título]
    
    F --> G[🏷️ Selecionar Categoria]
    G --> H[📊 Definir Estado do Produto]
    H --> I[➡️ Click Próximo]
    
    I --> J[📝 Criar Anúncio - Passo 2]
    J --> K[📄 Escrever Descrição]
    K --> L[💵 Definir Preço]
    L --> M[🔄 Negociável?]
    M --> N[🔁 Aceita Trocas?]
    N --> O[✅ Publicar Anúncio]
    
    O --> P[✅ Confirmação de Publicação]
    P --> Q{Ir para onde?}
    Q --> |📦| R[📦 Meus Anúncios]
    Q --> |🏠| S[🏠 Home Feed]
    
    R --> T[📊 Ver Estatísticas]
    T --> U[👁️ Views: 45<br/>💬 Mensagens: 8]
    
    U --> V{Ações}
    V --> |✏️| W[✏️ Editar Anúncio]
    V --> |🗑️| X[🗑️ Deletar Anúncio]
    V --> |💬| Y[💬 Ver Mensagens]
    
    W --> C
    X --> Z[⚠️ Confirmar Exclusão]
    Z --> R
    
    Y --> AA[💬 Chat com Compradores]
    AA --> AB[🔔 Receber Proposta]
    AB --> AC{Aceitar?}
    AC --> |❌| AD[❌ Recusar/Contrapropor]
    AC --> |✅| AE[✅ Aceitar Proposta]
    
    AD --> AA
    
    AE --> AF[⏳ Aguardar Pagamento do Comprador]
    AF --> AG[✅ Pagamento Confirmado]
    AG --> AH[💬 Chat: Combinar Entrega]
    AH --> AI[📦 Produto Entregue]
    AI --> AJ[💰 Marcar como Vendido]
    AJ --> AK[⭐ Receber Avaliação]
    AK --> AL[📦 Meus Anúncios > Vendidos]
    
    style O fill:#4caf50
    style P fill:#4caf50
    style AG fill:#81c784
    style AK fill:#ffb74d
```

---

## 💬 Fluxo de Comunicação (Chat)

```mermaid
graph TD
    A{Pontos de Entrada} --> |BottomBar| B[💬 Chat Inbox]
    A --> |Notificação| B
    A --> |Botão Produto| C[📦 Detalhes do Produto]
    
    C --> |Click Conversar| D[💬 Iniciar Nova Conversa]
    
    B --> E[📋 Lista de Conversas]
    E --> F{Estado}
    F --> |Não lidas| G[🔴 Badge com contador]
    F --> |Lidas| H[✓ Sem badge]
    
    G --> I[Click em Conversa]
    H --> I
    
    I --> J[💬 Conversa Individual]
    J --> K[📜 Histórico de Mensagens]
    K --> L[👤 Info do Contato]
    L --> M[✍️ Input de Mensagem]
    
    M --> N{Tipo de Mensagem}
    N --> |💬| O[📝 Mensagem Simples]
    N --> |💰| P[💰 Proposta de Preço]
    N --> |📍| Q[📍 Local de Encontro]
    
    O --> R[📤 Enviar]
    P --> S[💰 Ir para Tela de Negociação]
    Q --> R
    
    R --> T[✅ Mensagem Enviada]
    T --> U[⏳ Aguardar Resposta]
    U --> V{Resposta Recebida}
    V --> |Sim| W[🔔 Notificação]
    V --> |Não| U
    
    W --> J
    
    S --> X[💰 Fazer Proposta Formal]
    X --> Y[📤 Enviar Proposta]
    Y --> Z[💬 Proposta no Chat]
    Z --> AA{Vendedor Responde}
    AA --> |✅ Aceita| AB[💳 Ir para Pagamento]
    AA --> |❌ Recusa| AC[💬 Contraproposta]
    AA --> |💬 Negocia| J
    
    AC --> J
    
    style B fill:#64b5f6
    style J fill:#4fc3f7
    style AB fill:#4caf50
```

---

## ❤️ Fluxo de Favoritos (Wishlist)

```mermaid
graph TD
    A{Adicionar Favorito} --> |Home Feed| B[❤️ Click Coração no Card]
    A --> |Detalhes| C[❤️ Click Coração no Header]
    
    B --> D[🎨 Animação]
    C --> D
    
    D --> E[✅ Item Favoritado]
    E --> F[🔔 Toast: Adicionado aos Favoritos]
    
    F --> G[💾 Salvo na Lista]
    
    H[🏠 Home BottomBar] --> |Click Bookmark| I[❤️ Lista de Desejos]
    
    I --> J[📋 Grid de Produtos Favoritos]
    J --> K{O que fazer?}
    
    K --> |🔍| L[🔍 Buscar nos Favoritos]
    K --> |Click Produto| M[📦 Ir para Detalhes]
    K --> |🗑️| N[🗑️ Remover Favorito]
    
    L --> O[📋 Resultados Filtrados]
    O --> K
    
    M --> P[📦 Detalhes do Produto]
    P --> Q{Comprar?}
    Q --> |Sim| R[💰 Fluxo de Compra]
    Q --> |Não| I
    
    N --> S[⚠️ Animação de Remoção]
    S --> T[✅ Removido da Lista]
    T --> I
    
    style E fill:#f48fb1
    style I fill:#f06292
    style T fill:#e57373
```

---

## 📦 Fluxo de Gerenciamento de Anúncios

```mermaid
graph TD
    A[🏠 Home] --> |BottomBar: ShoppingBag| B[📦 Meus Anúncios]
    
    B --> C{Tabs}
    C --> |Tab 1| D[✅ Anúncios Ativos]
    C --> |Tab 2| E[💰 Anúncios Vendidos]
    
    D --> F[📋 Lista de Anúncios Ativos]
    F --> G[📊 Card do Anúncio]
    G --> H[📸 Foto + Título + Preço]
    H --> I[📈 Estatísticas]
    I --> J[👁️ 45 views<br/>💬 8 mensagens]
    
    J --> K{Ações}
    K --> |✏️| L[✏️ Editar Anúncio]
    K --> |🗑️| M[🗑️ Deletar Anúncio]
    K --> |➕| N[➕ Criar Novo Anúncio]
    
    L --> O[📝 Form de Edição]
    O --> P[💾 Salvar Alterações]
    P --> Q[✅ Toast: Anúncio Atualizado]
    Q --> D
    
    M --> R[⚠️ Alert de Confirmação]
    R --> S{Confirmar?}
    S --> |Sim| T[🗑️ Anúncio Deletado]
    S --> |Não| D
    T --> U[✅ Toast: Anúncio Removido]
    U --> D
    
    N --> V[📝 Fluxo de Criação]
    V --> W[✅ Anúncio Criado]
    W --> D
    
    E --> X[📋 Lista de Vendidos]
    X --> Y[📦 Card do Produto Vendido]
    Y --> Z[📅 Data da Venda]
    Z --> AA[👤 Info do Comprador]
    AA --> AB[⭐ Avaliação Recebida]
    
    AB --> AC{Ver detalhes?}
    AC --> |Sim| AD[📄 Histórico Completo]
    AC --> |Não| E
    
    style D fill:#81c784
    style E fill:#4caf50
    style W fill:#66bb6a
```

---

## 🔄 Navegação Bottom Bar (Menu Principal)

```mermaid
graph LR
    A[🏠 Home] --> B[❤️ Desejos]
    B --> C[➕ Criar]
    C --> D[📦 Meus<br/>Anúncios]
    D --> E[💬 Chat]
    
    E --> A
    
    style A fill:#81c784
    style C fill:#ff9800
    style E fill:#64b5f6
```

---

## 🎯 Estados de Produto

```mermaid
stateDiagram-v2
    [*] --> Rascunho: Criar Anúncio
    Rascunho --> Ativo: Publicar
    
    Ativo --> EmNegociacao: Receber Proposta
    EmNegociacao --> Ativo: Recusar
    EmNegociacao --> AguardandoPagamento: Aceitar
    
    AguardandoPagamento --> Vendido: Pagamento Confirmado
    AguardandoPagamento --> Ativo: Pagamento Cancelado
    
    Ativo --> Pausado: Pausar Anúncio
    Pausado --> Ativo: Reativar
    
    Ativo --> Deletado: Deletar
    Pausado --> Deletado: Deletar
    
    Vendido --> [*]: Arquivar
    Deletado --> [*]: Remover
```

---

## 📊 Mapa de Calor de Interações (Prioridade)

```mermaid
graph TD
    subgraph "🔥 Alta Prioridade - Uso Frequente"
        A1[🏠 Home Feed]
        A2[📦 Detalhes Produto]
        A3[💬 Chat]
        A4[❤️ Favoritar]
    end
    
    subgraph "🟡 Média Prioridade - Uso Regular"
        B1[🔍 Filtros]
        B2[📦 Meus Anúncios]
        B3[💰 Negociação]
        B4[❤️ Lista Desejos]
    end
    
    subgraph "🟢 Baixa Prioridade - Uso Eventual"
        C1[➕ Criar Anúncio]
        C2[💳 Pagamento]
        C3[✅ Confirmação]
        C4[⭐ Avaliação]
    end
    
    subgraph "⚪ Uso Único - Onboarding"
        D1[🔐 Login]
        D2[📄 Verificação]
        D3[👤 Perfil]
        D4[✨ Boas-vindas]
    end
    
    style A1 fill:#ff5252
    style A2 fill:#ff5252
    style A3 fill:#ff5252
    style A4 fill:#ff5252
    
    style B1 fill:#ffca28
    style B2 fill:#ffca28
    style B3 fill:#ffca28
    style B4 fill:#ffca28
    
    style C1 fill:#66bb6a
    style C2 fill:#66bb6a
    style C3 fill:#66bb6a
    style C4 fill:#66bb6a
    
    style D1 fill:#90a4ae
    style D2 fill:#90a4ae
    style D3 fill:#90a4ae
    style D4 fill:#90a4ae
```

---

## 🚦 Matriz de Complexidade vs Frequência

| Tela | Frequência de Uso | Complexidade | Prioridade UX |
|------|-------------------|--------------|---------------|
| Home Feed | 🔴 Muito Alta | 🟢 Baixa | ⭐⭐⭐⭐⭐ |
| Detalhes Produto | 🔴 Muito Alta | 🟡 Média | ⭐⭐⭐⭐⭐ |
| Chat | 🔴 Muito Alta | 🟡 Média | ⭐⭐⭐⭐⭐ |
| Filtros | 🟡 Alta | 🟢 Baixa | ⭐⭐⭐⭐ |
| Negociação | 🟡 Alta | 🟡 Média | ⭐⭐⭐⭐ |
| Criar Anúncio | 🟢 Média | 🔴 Alta | ⭐⭐⭐⭐ |
| Pagamento | 🟢 Média | 🔴 Alta | ⭐⭐⭐⭐⭐ |
| Meus Anúncios | 🟢 Média | 🟢 Baixa | ⭐⭐⭐ |
| Lista Desejos | 🟢 Média | 🟢 Baixa | ⭐⭐⭐ |
| Confirmação | 🟢 Baixa | 🟢 Baixa | ⭐⭐⭐ |
| Avaliação | 🟢 Baixa | 🟢 Baixa | ⭐⭐⭐ |
| Onboarding | ⚪ Uma vez | 🟡 Média | ⭐⭐⭐⭐⭐ |

**Legenda:**
- 🔴 = Alta
- 🟡 = Média
- 🟢 = Baixa
- ⚪ = Única

---

**📝 Como visualizar os diagramas:**
1. Copie o código Mermaid
2. Cole em: https://mermaid.live/
3. Ou use extensões Mermaid no VS Code

**Versão**: 1.0  
**Data**: 04/05/2026
