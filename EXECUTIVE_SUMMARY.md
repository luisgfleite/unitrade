# 📊 Executive Summary - UniTrade
## User Flow & UX Analysis

---

## 🎯 TL;DR (Too Long; Didn't Read)

**Objetivo**: Mapear e otimizar todas as jornadas do usuário no marketplace universitário UniTrade.

**Resultado**: 16 telas de alta fidelidade + 6 fluxos principais mapeados + 10 recomendações críticas de UX.

**Próximo Passo**: Protótipo clicável → Testes de usabilidade → MVP em 4 semanas.

---

## 📱 O Produto

### UniTrade em 3 Pontos

1. **Marketplace P2P** exclusivo para universitários
2. **Verificação acadêmica** obrigatória (segurança)
3. **Chat + Pagamento** integrados (facilidade)

### Diferencial Competitivo

| Feature | OLX | Marketplace FB | **UniTrade** |
|---------|-----|----------------|--------------|
| Público-alvo | Geral | Geral | **🎓 Só universitários** |
| Verificação | ❌ Não | Opcional | **✅ Obrigatória** |
| Pagamento integrado | ❌ Não | ❌ Não | **✅ Sim (PIX/Cartão)** |
| Chat + Negociação | Separado | Separado | **✅ Unificado** |
| Retirada no campus | ❌ Não | ❌ Não | **✅ Sim** |
| Reputação acadêmica | ❌ Não | ❌ Não | **✅ Sim** |

---

## 🗺️ Arquitetura de Informação

### Hierarquia de Telas

```
📱 App (16 telas)
│
├── 🔐 Onboarding (4 telas - uso único)
│   ├── Login/Cadastro
│   ├── Verificação Acadêmica
│   ├── Completar Perfil
│   └── Boas-vindas
│
├── 🏠 Navegação Principal (5 telas - alta frequência)
│   ├── Home Feed ⭐⭐⭐⭐⭐
│   ├── Lista de Desejos ⭐⭐⭐
│   ├── Criar Anúncio ⭐⭐⭐⭐
│   ├── Meus Anúncios ⭐⭐⭐
│   └── Chat Inbox ⭐⭐⭐⭐⭐
│
└── 🛍️ Jornadas de Transação (7 telas - média frequência)
    ├── Filtros e Categorias
    ├── Detalhes do Produto
    ├── Negociação
    ├── Pagamento
    ├── Confirmação
    └── Avaliação
```

### Navegação Bottom Bar (Menu Principal)

```
┌────────────────────────────────────────┐
│  [🏠]  [❤️]  [➕]  [📦]  [💬]         │
│  Home  Wish  Criar  Meus  Chat          │
└────────────────────────────────────────┘
```

**Insight**: Botão "+" central maximiza descoberta (Lei de Fitts).

---

## 🔄 6 Fluxos Principais Mapeados

### 1. 🎓 Onboarding (4 passos)

```
Login → Verificação → Perfil → Boas-vindas → Home
  2min      1min       1min      30s         ✅
```

**Taxa de Conclusão Esperada**: 70%  
**Drop-off Crítico**: Verificação (30%)

**🔴 PROBLEMA IDENTIFICADO**:  
Usuário espera aprovação antes de explorar o app → Alto abandono

**✅ SOLUÇÃO RECOMENDADA**:  
Permitir exploração com perfil provisório → Verificar em background

**Impacto**: ↑ 30% conclusão do onboarding

---

### 2. 🛍️ Compra (7 passos)

```
Home → Produto → Negociação → Pagamento → Confirmação
 30s     2min       3min         1min          ✅
```

**Conversão Esperada**: 5% (view → purchase)  
**Tempo Médio**: 6-7 minutos

**🔴 PROBLEMA IDENTIFICADO**:  
Múltiplas idas entre Chat ↔ Negociação → Experiência fragmentada

**✅ SOLUÇÃO RECOMENDADA**:  
Unificar Chat + Negociação em uma tela

**Impacto**: ↑ 15% conversão, ↓ 40% cliques

---

### 3. 💼 Venda (8 passos)

```
Home → Criar P1 → Criar P2 → Publicado → Chat → Venda
 30s     2min      2min       ✅        variável  ✅
```

**Taxa de Conclusão**: 80%  
**Time to First Sale**: < 7 dias (meta)

**🟡 OPORTUNIDADE**:  
Upload de fotos sequencial é lento

**✅ SOLUÇÃO**:  
Upload múltiplo + drag & drop

**Impacto**: ↓ 20% abandono na criação

---

### 4. 💬 Comunicação

```
Inbox → Conversa → Mensagens → [Negociação integrada]
```

**Taxa de Resposta**: 70% (meta)  
**Tempo de Resposta**: < 2h (meta)

**Diferencial**: Proposta de preço inline no chat

---

### 5. ❤️ Lista de Desejos

```
Feed → ❤️ Favoritar → Lista → Ver Produto
```

**Conversão Wishlist**: 15-20% (benchmark)

**🟢 FEATURE FUTURA**:  
Notificação quando favorito tem desconto

**Impacto**: ↑ 25% conversão de favoritos

---

### 6. 📦 Gerenciamento de Anúncios

```
Meus Anúncios → [Ativos | Vendidos] → Editar/Deletar
```

**Anúncios/usuário/mês**: 1.5 (meta)

**Insights**:
- Views e mensagens são métricas-chave para vendedor
- Vendedores ativos = mais engajamento geral

---

## 📊 Métricas de Sucesso (KPIs)

### 🎯 North Star Metric

**GMV (Gross Merchandise Value)**: Valor total transacionado

**Meta Fase 1**: R$ 50k/mês (100 transações × R$ 500)

### 📈 Métricas Secundárias

| Métrica | Meta | Benchmark |
|---------|------|-----------|
| **Onboarding** | 70% conclusão | 60-80% (apps sociais) |
| **Ativação** | 40% criam anúncio | 30-50% (marketplaces) |
| **Conversão** | 5% view→purchase | 3-7% (e-commerce) |
| **Retenção D7** | 40% | 30-50% (apps mobile) |
| **Retenção D30** | 25% | 15-30% (apps mobile) |
| **NPS** | > 50 | 40-70 (produtos B2C) |

### 📉 Funil de Conversão

```
1.000 visitantes
   ↓ 60% cadastram
 600 cadastros
   ↓ 70% completam onboarding
 420 usuários ativos
   ↓ 40% criam anúncio
 168 vendedores
   ↓ 80% fazem compra
 336 compradores
   ↓ 5% compram hoje
  21 transações/dia

→ 630 transações/mês
→ R$ 94.500 GMV (ticket R$ 150)
→ R$ 1.890 receita (2% taxa)
```

---

## 🔴 Top 5 Problemas Críticos

### 1. **Verificação Acadêmica Bloqueante**
- **Impacto**: 🔴 Crítico
- **Sintoma**: 30% abandono no onboarding
- **Solução**: Verificação em background
- **Esforço**: 🟡 Médio (2 sprints)

### 2. **Fragmentação Chat ↔ Negociação**
- **Impacto**: 🔴 Crítico
- **Sintoma**: Baixa conversão (view → purchase)
- **Solução**: Unificar em uma tela
- **Esforço**: 🟡 Médio (1 sprint)

### 3. **Taxa de Serviço Surpresa**
- **Impacto**: 🟡 Alto
- **Sintoma**: Abandono no pagamento
- **Solução**: Mostrar custo total desde o início
- **Esforço**: 🟢 Baixo (1 dia)

### 4. **Upload Lento de Fotos**
- **Impacto**: 🟡 Alto
- **Sintoma**: Abandono na criação de anúncio
- **Solução**: Upload múltiplo
- **Esforço**: 🟡 Médio (1 sprint)

### 5. **Busca Limitada**
- **Impacto**: 🟢 Médio
- **Sintoma**: Baixa descoberta de produtos
- **Solução**: Autocomplete + filtros inline
- **Esforço**: 🟡 Médio (2 sprints)

---

## ✅ Top 5 Recomendações

### 1. **MVP Focado** (Fase 1 - 4 semanas)
Entregar apenas o essencial:
- ✅ Onboarding simplificado
- ✅ Feed + Busca básica
- ✅ Criar anúncio
- ✅ Chat básico
- ✅ Pagamento PIX

**Por quê**: Time to market é crítico. Validar hipóteses antes de investir em features.

---

### 2. **Priorizar Onboarding** (Sprint 1)
Foco total em reduzir fricção:
- ✅ Verificação em background
- ✅ Exploração com perfil provisório
- ✅ Onboarding em < 3 minutos

**Por quê**: 30% ganho em conclusão = 30% mais usuários ativos.

---

### 3. **Unificar Chat + Negociação** (Sprint 3)
Integrar proposta de preço no chat:
- ✅ Menos cliques (5 → 2)
- ✅ Melhor contexto
- ✅ Maior conversão

**Por quê**: Simplicidade = conversão. Cada clique extra = perda de usuários.

---

### 4. **Analytics desde o Dia 1** (Sprint 1)
Instrumentar todos os eventos:
- ✅ Funil de onboarding
- ✅ Funil de compra
- ✅ Funil de venda
- ✅ Heatmaps de interação

**Por quê**: Não dá para otimizar o que não se mede.

**Ferramentas**: Mixpanel ou Amplitude

---

### 5. **Testes de Usabilidade Semanais** (Contínuo)
Testar com 5 estudantes/semana:
- ✅ Tarefas específicas
- ✅ Think-aloud protocol
- ✅ Gravação de tela
- ✅ Questionário pós-teste

**Por quê**: Feedback real > Suposições. 1h de teste economiza semanas de retrabalho.

---

## 🚀 Roadmap Executivo

### 📅 Q2 2026 - Validação (Meses 1-3)

**Objetivo**: Validar product-market fit com 100 usuários

**Milestones**:
- ✅ Semana 1-4: Desenvolver MVP
- ✅ Semana 5: Beta test (20 usuários)
- ✅ Semana 6-8: Iterar baseado em feedback
- ✅ Semana 9-12: Lançamento campus piloto (100 usuários)

**Métricas de Sucesso**:
- 70% conclusão onboarding
- 20 transações completas
- NPS > 30

---

### 📅 Q3 2026 - Crescimento (Meses 4-6)

**Objetivo**: Escalar para 1.000 usuários e 5 universidades

**Milestones**:
- ✅ Otimizações baseadas em dados
- ✅ Features de crescimento (gamificação, social)
- ✅ Programa de embaixadores
- ✅ Expansão para 4 novos campi

**Métricas de Sucesso**:
- 1.000 usuários ativos
- R$ 100k GMV
- NPS > 50

---

### 📅 Q4 2026 - Monetização (Meses 7-9)

**Objetivo**: Break-even operacional

**Milestones**:
- ✅ Marketplace de serviços
- ✅ Parcerias com lojas locais
- ✅ Premium features
- ✅ 10 universidades

**Métricas de Sucesso**:
- R$ 500k GMV/mês
- R$ 10k receita/mês
- Break-even operacional

---

## 💰 Business Case

### 💵 Modelo de Receita

| Fonte | % Revenue | Descrição |
|-------|-----------|-----------|
| **Taxa de transação** | 70% | 2% sobre cada venda |
| **Serviços premium** | 20% | Anúncios destacados, badges |
| **Parcerias** | 10% | Lojas locais, marcas estudantis |

### 📊 Projeções (12 meses)

```
Mês 1-3 (Validação):
  100 usuários × R$ 150 ticket × 1 compra/mês = R$ 15k GMV
  R$ 15k × 2% taxa = R$ 300 receita/mês

Mês 4-6 (Crescimento):
  1.000 usuários × R$ 150 × 1 compra/mês = R$ 150k GMV
  R$ 150k × 2% = R$ 3k receita/mês

Mês 7-12 (Escala):
  5.000 usuários × R$ 150 × 1 compra/mês = R$ 750k GMV
  R$ 750k × 2% = R$ 15k receita/mês

Total Ano 1:
  GMV: ~R$ 2.5M
  Receita: ~R$ 50k
```

### 💸 Investimento Necessário

| Item | Valor | Período |
|------|-------|---------|
| **Desenvolvimento** | R$ 60k | 3 meses (MVP) |
| **Marketing** | R$ 30k | Embaixadores + ads |
| **Operacional** | R$ 10k | Servidor, tools |
| **Total** | **R$ 100k** | Seed/Pré-seed |

**Runway**: 12 meses com R$ 100k (burn R$ 8k/mês)

---

## 🎯 Próximos Passos (Próximas 2 Semanas)

### Semana 1: Validação
- [ ] Criar protótipo clicável no Figma (40h)
- [ ] Recrutar 10 estudantes para teste (8h)
- [ ] Conduzir testes de usabilidade (20h)
- [ ] Compilar feedback e iterar (12h)

### Semana 2: Preparação
- [ ] Finalizar design system (16h)
- [ ] Setup do projeto de desenvolvimento (8h)
- [ ] Definir arquitetura técnica (16h)
- [ ] Sprint planning (Sprint 1-4) (8h)

**Entregável**: Protótipo validado + Roadmap técnico

---

## ❓ Perguntas Frequentes

### 1. Por que apenas universitários?

**R**: Comunidade fechada = maior confiança. Verificação acadêmica reduz fraudes e cria senso de segurança. Marketplace geral (OLX) tem problema de confiança.

### 2. Como garantir segurança nas transações?

**R**: 
- Verificação acadêmica obrigatória
- Sistema de reputação (avaliações)
- Pagamento integrado (rastreável)
- Encontros no campus (seguro)
- Suporte dedicado

### 3. Qual o diferencial vs. Facebook Marketplace?

**R**:
- **Público específico**: Só universitários do mesmo campus
- **Pagamento integrado**: FB não tem
- **Verificação**: FB é opcional, nosso é obrigatório
- **UX focada**: Pensada para estudantes

### 4. Como vamos ganhar dinheiro?

**R**: Taxa de 2% por transação + serviços premium (destaques, badges). Modelo validado por Mercado Livre (6-12%), Vinted (5%), OfferUp (12.9%).

### 5. Qual o custo de aquisição de usuário (CAC)?

**R**: Meta < R$ 10/usuário via:
- Programa de embaixadores (referral)
- Marketing orgânico (social, boca a boca)
- Parcerias com centros acadêmicos

---

## 📚 Documentação Completa

Este é um resumo executivo. Para detalhes completos:

1. **[README_UX.md](./README_UX.md)** - Índice geral da documentação
2. **[USER_FLOW.md](./USER_FLOW.md)** - Fluxos detalhados (texto)
3. **[USER_FLOW_DIAGRAM.md](./USER_FLOW_DIAGRAM.md)** - Diagramas visuais (Mermaid)
4. **[UX_RECOMMENDATIONS.md](./UX_RECOMMENDATIONS.md)** - Recomendações e otimizações

**Total**: 100+ páginas de documentação UX

---

## 👥 Equipe Necessária (MVP)

| Papel | Dedicação | Custo/mês |
|-------|-----------|-----------|
| **Product Designer** | Full-time | R$ 8k |
| **Frontend Dev** | Full-time | R$ 10k |
| **Backend Dev** | Full-time | R$ 10k |
| **Product Manager** | Part-time | R$ 6k |
| **Total** | 3.5 FTE | **R$ 34k/mês** |

**Duração MVP**: 3 meses  
**Custo Total MVP**: R$ 102k (incluindo infra)

---

## ✅ Aprovações Necessárias

- [ ] **Design aprovado**: Stakeholders de produto
- [ ] **Roadmap aprovado**: C-level
- [ ] **Budget aprovado**: Financeiro
- [ ] **Equipe alocada**: RH
- [ ] **Kickoff agendado**: PM

---

**Preparado por**: UX Design Team  
**Data**: 04/05/2026  
**Versão**: 1.0  
**Status**: ✅ Pronto para apresentação

**Próxima reunião**: [Agendar Review com Stakeholders]
