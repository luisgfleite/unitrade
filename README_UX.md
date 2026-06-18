# 📚 Documentação UX - UniTrade
## Marketplace Universitário de Vendas e Trocas

---

## 🎯 Visão Geral do Projeto

O **UniTrade** é uma plataforma de marketplace peer-to-peer voltada exclusivamente para estudantes universitários, permitindo compra, venda e troca de produtos e serviços dentro da comunidade acadêmica.

### 🎨 Características Principais
- ✅ Verificação acadêmica obrigatória
- ✅ Feed personalizado por curso e campus
- ✅ Chat integrado para negociação
- ✅ Sistema de avaliações e reputação
- ✅ Pagamento integrado (PIX e Cartão)
- ✅ Interface moderna e intuitiva

---

## 📁 Estrutura da Documentação

### 1. **[USER_FLOW.md](./USER_FLOW.md)** 📊
Documentação completa dos fluxos de usuário

**Conteúdo:**
- 🗺️ Mapa geral de navegação
- 👤 Personas principais
- 🔄 Fluxo de Onboarding (4 telas)
- 🛍️ Fluxo de Compra (7 telas)
- 💼 Fluxo de Venda (8 telas)
- 💬 Fluxo de Comunicação (3 telas)
- ❤️ Fluxo de Lista de Desejos (2 telas)
- 📦 Fluxo de Gerenciamento de Anúncios (4 telas)
- 📊 Matriz de navegação
- 🎯 Pontos críticos da jornada
- 📈 Métricas por fluxo

**Quando usar:**
- Para entender a jornada completa do usuário
- Documentação para desenvolvedores
- Apresentação para stakeholders

---

### 2. **[USER_FLOW_DIAGRAM.md](./USER_FLOW_DIAGRAM.md)** 🎨
Diagramas visuais em Mermaid.js

**Conteúdo:**
- 🔄 Fluxo principal (Happy Path)
- 🛍️ Fluxo de compra detalhado
- 💼 Fluxo de venda detalhado
- 💬 Fluxo de comunicação
- ❤️ Fluxo de favoritos
- 📦 Gerenciamento de anúncios
- 🔄 Navegação Bottom Bar
- 🎯 Estados de produto
- 📊 Mapa de calor de interações
- 🚦 Matriz de complexidade vs frequência

**Como visualizar:**
1. Copie o código Mermaid do documento
2. Cole em [mermaid.live](https://mermaid.live/)
3. Ou use extensão Mermaid no VS Code

**Quando usar:**
- Para apresentações visuais
- Workshops de UX
- Planejamento de sprints

---

### 3. **[UX_RECOMMENDATIONS.md](./UX_RECOMMENDATIONS.md)** 💡
Recomendações e otimizações de UX

**Conteúdo:**
- 🎯 Princípios de design aplicados
- 🔴 Pontos de fricção CRÍTICOS
- 🟡 Oportunidades de melhoria IMPORTANTES
- 🟢 Features futuras (Nice to have)
- 📊 KPIs e métricas de sucesso
- 🧪 Testes A/B sugeridos
- 🎨 Padrões de design
- ♿ Acessibilidade
- 📱 Performance
- 🔐 Segurança e privacidade
- 🚀 Roadmap de implementação

**Quando usar:**
- Planejamento de melhorias
- Priorização de features
- Definição de métricas
- Roadmap de produto

---

## 🎨 Telas do Aplicativo

### 📱 Fluxo de Onboarding (4 telas)

| # | Tela | Descrição | Complexidade |
|---|------|-----------|--------------|
| 1 | **Login/Cadastro** | Autenticação com email universitário | 🟢 Baixa |
| 2 | **Verificação Acadêmica** | Upload de comprovante de matrícula | 🟡 Média |
| 3 | **Completar Perfil** | Nome, curso, bio e foto | 🟢 Baixa |
| 4 | **Boas-vindas** | Apresentação de recursos | 🟢 Baixa |

### 🏠 Navegação Principal (5 telas)

| # | Tela | Descrição | Prioridade | Frequência |
|---|------|-----------|-----------|-----------|
| 1 | **Home Feed** | Feed principal de produtos | ⭐⭐⭐⭐⭐ | 🔴 Muito Alta |
| 2 | **Lista de Desejos** | Produtos favoritados | ⭐⭐⭐ | 🟢 Média |
| 3 | **Criar Anúncio** | Publicar novo produto | ⭐⭐⭐⭐ | 🟢 Média |
| 4 | **Meus Anúncios** | Gerenciar anúncios ativos/vendidos | ⭐⭐⭐ | 🟢 Média |
| 5 | **Chat Inbox** | Lista de conversas | ⭐⭐⭐⭐⭐ | 🔴 Muito Alta |

### 🛍️ Jornada de Compra (7 telas)

| # | Tela | Descrição | Conversão |
|---|------|-----------|----------|
| 1 | **Filtros e Categorias** | Refinamento de busca | 60% |
| 2 | **Detalhes do Produto** | Informações completas | 80% |
| 3 | **Chat** | Conversa com vendedor | 70% |
| 4 | **Negociação** | Fazer proposta de preço | 50% |
| 5 | **Pagamento** | Finalizar compra | 85% |
| 6 | **Confirmação** | Pedido confirmado | 100% |
| 7 | **Avaliação** | Avaliar vendedor | 40% |

---

## 📊 Métricas e KPIs

### 🎯 Objetivos de Negócio

```yaml
Aquisição:
  - CAC (Custo de Aquisição): < R$ 10
  - Taxa de cadastro: > 60% dos visitantes
  - Tempo de onboarding: < 5 minutos

Ativação:
  - Usuários que criam 1º anúncio: > 40%
  - Usuários que fazem 1ª compra: > 30%
  - Time to value: < 24h

Retenção:
  - DAU/MAU: > 25%
  - Retention D7: > 40%
  - Retention D30: > 25%
  - Churn mensal: < 10%

Monetização:
  - GMV (Gross Merchandise Value): R$ 500k/mês
  - Taxa de serviço: 2% por transação
  - Ticket médio: R$ 150

Referência:
  - NPS (Net Promoter Score): > 50
  - Share rate: > 15%
  - Viral coefficient: > 1.2
```

### 📈 Métricas de Produto

| Categoria | Métrica | Meta | Atual |
|-----------|---------|------|-------|
| **Onboarding** | Taxa de conclusão | > 70% | - |
| **Onboarding** | Tempo médio | < 5 min | - |
| **Compra** | View → Purchase | > 5% | - |
| **Compra** | Abandono pagamento | < 20% | - |
| **Venda** | Anúncios/usuário/mês | > 1.5 | - |
| **Venda** | Time to first sale | < 7 dias | - |
| **Chat** | Taxa de resposta | > 70% | - |
| **Chat** | Tempo de resposta | < 2h | - |
| **Engajamento** | Sessões/semana | > 5 | - |
| **Engajamento** | Duração da sessão | > 4 min | - |

---

## 🎨 Design System

### 🎨 Paleta de Cores

```css
/* Primary Colors */
--color-primary: #7c3aed; /* Purple 600 */
--color-primary-dark: #6d28d9; /* Purple 700 */
--color-secondary: #3b82f6; /* Blue 600 */

/* Status Colors */
--color-success: #10b981; /* Green 500 */
--color-warning: #f59e0b; /* Amber 500 */
--color-error: #ef4444; /* Red 500 */
--color-info: #3b82f6; /* Blue 500 */

/* Neutrals */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-600: #4b5563;
--color-gray-900: #111827;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #7c3aed, #3b82f6);
```

### 📏 Spacing

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

### ✏️ Typography

```css
/* Headings */
--font-h1: 32px / bold / 1.2;
--font-h2: 24px / bold / 1.3;
--font-h3: 20px / semibold / 1.4;

/* Body */
--font-body: 16px / regular / 1.5;
--font-small: 14px / regular / 1.5;
--font-tiny: 12px / regular / 1.4;
```

### 🎯 Componentes

```typescript
// Botões
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Cards
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>

// Badges
<Badge variant="default">Padrão</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="outline">Outline</Badge>

// Avatars
<Avatar>
  <AvatarImage src="..." />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

---

## 🚀 Roadmap de Implementação

### 📅 Fase 1: MVP (Sprint 1-4) - 4 semanas

**Objetivo**: Lançar versão funcional básica

**Features:**
- ✅ Sistema de autenticação
- ✅ Onboarding completo (4 telas)
- ✅ Home feed com produtos
- ✅ Busca básica
- ✅ Detalhes do produto
- ✅ Criar anúncio (2 passos)
- ✅ Chat básico
- ✅ Pagamento PIX
- ✅ Perfil do usuário

**Métricas de Sucesso:**
- 100 usuários ativos
- 50 anúncios criados
- 20 transações completas

---

### 📅 Fase 2: Otimizações (Sprint 5-7) - 3 semanas

**Objetivo**: Melhorar conversão e retenção

**Features:**
- 🔄 Verificação acadêmica em background
- 🔄 Chat + Negociação unificados
- 🔄 Upload múltiplo de fotos
- 🔄 Filtros avançados
- 🔄 Notificações push
- 🔄 Lista de desejos
- 🔄 Meus anúncios (gerenciamento)

**Métricas de Sucesso:**
- ↑ 20% conversão view → purchase
- ↑ 30% taxa de conclusão onboarding
- ↓ 50% abandono no pagamento

---

### 📅 Fase 3: Crescimento (Sprint 8-11) - 4 semanas

**Objetivo**: Aumentar engajamento e viralidade

**Features:**
- 📈 Sistema de reputação e badges
- 📈 Busca inteligente com autocomplete
- 📈 Gamificação
- 📈 Analytics e dashboards
- 📈 Sistema de avaliações
- 📈 Histórico de transações
- 📈 Compartilhamento social

**Métricas de Sucesso:**
- NPS > 50
- Retention D7 > 40%
- DAU/MAU > 25%

---

### 📅 Fase 4: Expansão (Sprint 12-17) - 6 semanas

**Objetivo**: Expandir funcionalidades e receita

**Features:**
- 🚀 Marketplace de serviços
- 🚀 Feed social e posts
- 🚀 Grupos por curso
- 🚀 Sistema de trocas (escambo)
- 🚀 Programa de embaixadores
- 🚀 Pagamento com cartão
- 🚀 Geolocalização

**Métricas de Sucesso:**
- 1.000+ usuários ativos
- R$ 100k+ GMV mensal
- 5+ universidades

---

## 🧪 Testes de Usabilidade

### 📋 Checklist de Testes

**Onboarding:**
- [ ] Usuário consegue criar conta em < 5 min?
- [ ] Processo de verificação está claro?
- [ ] Usuário entende o valor do app?

**Navegação:**
- [ ] Menu bottom é intuitivo?
- [ ] Usuário encontra busca facilmente?
- [ ] Fluxo de voltar funciona bem?

**Compra:**
- [ ] Detalhes do produto são claros?
- [ ] Chat é fácil de usar?
- [ ] Processo de pagamento é confiável?

**Venda:**
- [ ] Criar anúncio é simples?
- [ ] Upload de fotos funciona bem?
- [ ] Gerenciar anúncios é fácil?

### 🎯 Perguntas para Usuários

1. **Primeira Impressão**: "O que você acha que pode fazer neste app?"
2. **Confiança**: "Você se sentiria seguro comprando aqui? Por quê?"
3. **Clareza**: "Algo confuso ou difícil de entender?"
4. **Valor**: "Por que você usaria isso ao invés de OLX/Marketplace?"
5. **Melhoria**: "O que está faltando?"

---

## 📚 Recursos Adicionais

### 🔗 Links Úteis

- **Figma Prototype**: [Link do protótipo clicável]
- **Miro Board**: [Link do board de UX research]
- **Analytics Dashboard**: [Link do dashboard]
- **Repository**: [Link do GitHub]

### 📖 Referências

- [Laws of UX](https://lawsofux.com/)
- [Material Design Guidelines](https://material.io/design)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/)
- [Nielsen Norman Group](https://www.nngroup.com/)

### 🎓 Estudos de Caso

- **Mercado Livre**: Sistema de reputação
- **Vinted**: Onboarding gamificado
- **Facebook Marketplace**: Integração social
- **OfferUp**: Sistema de verificação

---

## 👥 Equipe e Contribuições

### 🎨 UX/UI Design
- User Research
- Wireframes e Protótipos
- Design System
- Testes de Usabilidade

### 💻 Desenvolvimento
- Frontend (React + TailwindCSS)
- Backend (Node.js)
- Mobile (React Native)
- DevOps

### 📊 Product
- Roadmap
- Métricas e KPIs
- A/B Testing
- User Feedback

---

## 📝 Changelog

### v1.0.0 - 04/05/2026
- ✅ Documentação inicial completa
- ✅ User flows mapeados
- ✅ Diagramas visuais criados
- ✅ Recomendações de UX documentadas
- ✅ Telas de alta fidelidade implementadas
- ✅ Design system definido

---

## 📧 Contato

Para dúvidas ou sugestões sobre a documentação UX:

- **Email**: ux@unitrade.com
- **Slack**: #ux-design
- **Meetings**: Segundas 14h (Sprint Planning)

---

**Última atualização**: 04/05/2026  
**Versão**: 1.0.0  
**Status**: ✅ Completo e Aprovado
