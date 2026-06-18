# 🎓 UniTrade - Marketplace Universitário

Plataforma completa de compra, venda e troca entre estudantes universitários.

---

## 🚀 Quick Start

### Para visualizar o app:
```bash
# O servidor já está rodando!
# Acesse o preview no seu navegador
```

### Para editar as telas:
👉 **[EDICAO_RAPIDA.md](./EDICAO_RAPIDA.md)** - Comece aqui! 3 edições em 3 minutos

---

## 📚 Documentação Disponível

### 🎨 **Design e Edição**

| Documento | Descrição | Tempo | Para quem |
|-----------|-----------|-------|-----------|
| **[EDICAO_RAPIDA.md](./EDICAO_RAPIDA.md)** | 3 edições prontas + templates | 5 min | 🔰 Iniciantes |
| **[GUIA_EDICAO_TELAS.md](./GUIA_EDICAO_TELAS.md)** | Guia completo de edição | 20 min | 👨‍💻 Desenvolvedores |
| **[UX_CHEATSHEET.md](./UX_CHEATSHEET.md)** | Referência rápida de design | 5 min | 🎨 Designers |

### 📊 **UX e Fluxos de Usuário**

| Documento | Descrição | Tempo | Para quem |
|-----------|-----------|-------|-----------|
| **[QUICK_START.md](./QUICK_START.md)** | Guia de navegação da documentação | 2 min | 👥 Todos |
| **[EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md)** | Resumo executivo + métricas | 5 min | 👔 Stakeholders |
| **[README_UX.md](./README_UX.md)** | Índice completo de UX | 10 min | 📊 Product Managers |
| **[USER_FLOW.md](./USER_FLOW.md)** | Fluxos detalhados (texto) | 15 min | 🎯 UX Designers |
| **[USER_FLOW_DIAGRAM.md](./USER_FLOW_DIAGRAM.md)** | Diagramas visuais (Mermaid) | 10 min | 🎨 Visualização |
| **[UX_RECOMMENDATIONS.md](./UX_RECOMMENDATIONS.md)** | Recomendações e otimizações | 20 min | 💡 UX Research |

---

## 🎯 O Que Você Quer Fazer?

### ✏️ Quero Editar as Telas

**→ Comece aqui**: [EDICAO_RAPIDA.md](./EDICAO_RAPIDA.md)

Exemplos prontos para copiar e colar:
- ✅ Mudar nome do app (30s)
- ✅ Mudar cores (1 min)
- ✅ Adicionar campos (2 min)
- ✅ Templates de componentes

---

### 📊 Quero Entender os Fluxos

**→ Comece aqui**: [EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md)

Depois explore:
- [USER_FLOW.md](./USER_FLOW.md) - Descrições detalhadas
- [USER_FLOW_DIAGRAM.md](./USER_FLOW_DIAGRAM.md) - Diagramas visuais

---

### 🎨 Quero Referência de Design

**→ Comece aqui**: [UX_CHEATSHEET.md](./UX_CHEATSHEET.md)

Inclui:
- Cores e tipografia
- Componentes prontos
- Padrões de design
- Atalhos úteis

---

### 📱 Quero Ver as Telas

As 16 telas estão em: `/src/app/components/`

```
Onboarding (4):
├── Login.tsx
├── Verificacao.tsx
├── Perfil.tsx
└── BoasVindas.tsx

Principal (5):
├── Home.tsx
├── Filtros.tsx
├── Desejos.tsx
├── MeusAnuncios.tsx
└── Chat.tsx

Transação (7):
├── DetalheProduto.tsx
├── CriarAnuncio.tsx
├── Negociacao.tsx
├── Pagamento.tsx
├── Confirmacao.tsx
└── Avaliacao.tsx
```

---

## 🎨 Funcionalidades Implementadas

### ✅ Onboarding
- Login/Cadastro com email universitário
- Verificação acadêmica (upload documento)
- Perfil completo (nome, curso, bio, foto)
- Boas-vindas interativo

### ✅ Navegação
- Feed de produtos com grid responsivo
- Busca global
- Bottom navigation (5 itens)
- Filtros e categorias

### ✅ Produtos
- Detalhes completos do produto
- Galeria de imagens
- Informações do vendedor
- Sistema de favoritos

### ✅ Transações
- Chat integrado
- Sistema de negociação
- Pagamento (PIX e Cartão)
- Confirmação visual
- Sistema de avaliações

### ✅ Gerenciamento
- Criar anúncio (2 passos)
- Gerenciar anúncios (ativos/vendidos)
- Lista de desejos
- Estatísticas (views, mensagens)

---

## 🎨 Design System

### Cores Principais
```
Roxo:  #7c3aed (Purple 600)
Azul:  #3b82f6 (Blue 600)
Verde: #10b981 (Green 500)
```

### Componentes UI
- Buttons (4 variantes)
- Cards
- Inputs
- Badges
- Avatars
- Modals
- Toasts

**Framework**: React + TailwindCSS + shadcn/ui

---

## 📊 Métricas e KPIs

### Objetivos
- **Conversão**: > 5% (view → purchase)
- **Retenção D7**: > 40%
- **NPS**: > 50
- **GMV**: R$ 500k/mês

### Funil de Conversão
```
1000 visitantes
  ↓ 60% cadastram
600 usuários
  ↓ 70% completam onboarding
420 ativos
  ↓ 5% compram
21 transações/dia
```

---

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: React 18.3.1
- **Routing**: React Router 7.13.0
- **Styling**: TailwindCSS 4.1.12
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Build**: Vite 6.3.5

### Bibliotecas Principais
- `react-hook-form` - Formulários
- `motion` - Animações
- `sonner` - Toasts
- `date-fns` - Datas

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── App.tsx                    # Router principal
│   └── components/
│       ├── Login.tsx              # Tela 1: Login
│       ├── Verificacao.tsx        # Tela 2: Verificação
│       ├── Perfil.tsx             # Tela 3: Perfil
│       ├── BoasVindas.tsx         # Tela 4: Boas-vindas
│       ├── Home.tsx               # Tela 5: Feed principal
│       ├── Filtros.tsx            # Tela 6: Filtros
│       ├── DetalheProduto.tsx     # Tela 7: Detalhes
│       ├── CriarAnuncio.tsx       # Tela 8-9: Criar (2 passos)
│       ├── Chat.tsx               # Tela 10: Chat
│       ├── Negociacao.tsx         # Tela 11: Negociação
│       ├── Pagamento.tsx          # Tela 12: Pagamento
│       ├── Desejos.tsx            # Tela 13: Favoritos
│       ├── MeusAnuncios.tsx       # Tela 14: Gerenciamento
│       ├── Confirmacao.tsx        # Tela 15: Confirmação
│       ├── Avaliacao.tsx          # Tela 16: Avaliação
│       └── ui/                    # Componentes base
│           ├── button.tsx
│           ├── card.tsx
│           ├── input.tsx
│           └── ...
├── styles/
│   ├── theme.css                  # Design tokens
│   └── fonts.css                  # Fontes
└── imports/                       # Assets (imagens)
```

---

## 🚀 Roadmap

### ✅ Fase 1: MVP (Atual)
- 16 telas de alta fidelidade
- Fluxos completos mapeados
- Design system implementado
- Documentação completa

### ⏳ Fase 2: Otimizações (3 semanas)
- Verificação em background
- Chat + Negociação unificados
- Upload múltiplo de fotos
- Notificações push

### 📅 Fase 3: Crescimento (4 semanas)
- Sistema de reputação
- Busca inteligente
- Gamificação
- Analytics

### 🚀 Fase 4: Expansão (6 semanas)
- Marketplace de serviços
- Social features
- Grupos por curso
- Sistema de trocas

---

## 🧪 Testes

### Teste de Usabilidade
```yaml
Frequência: Semanal
Participantes: 5 estudantes
Tarefas:
  1. Criar conta
  2. Buscar produto
  3. Fazer oferta
  4. Criar anúncio
```

### Métricas de Sucesso
- Taxa de conclusão > 80%
- Tempo médio < 10 min
- SUS Score > 70

---

## 🤝 Como Contribuir

### 1. Fazer uma edição
```bash
# Edite um arquivo
code src/app/components/Home.tsx

# Salve e veja o resultado
# A aplicação recarrega automaticamente
```

### 2. Documentar a mudança
```tsx
// Adicionar comentário no código
{/* EDITADO: Adicionado filtro por preço - João 04/06/2026 */}
```

### 3. Testar
- Desktop e mobile
- Diferentes navegadores
- Fluxos completos

---

## 📞 Suporte

### Documentação
- 📖 **Guia Completo**: [README_UX.md](./README_UX.md)
- ⚡ **Edição Rápida**: [EDICAO_RAPIDA.md](./EDICAO_RAPIDA.md)
- 🎨 **Cheatsheet**: [UX_CHEATSHEET.md](./UX_CHEATSHEET.md)

### Links Úteis
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)
- [React Router](https://reactrouter.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 📝 Changelog

### v1.0.0 - 04/06/2026
- ✅ 16 telas de alta fidelidade implementadas
- ✅ 6 fluxos principais mapeados
- ✅ Documentação UX completa
- ✅ Design system definido
- ✅ Guias de edição criados

---

## 📄 Licença

Este é um projeto educacional/demonstração.

---

## 🎯 Próximos Passos

1. ✅ **Iniciante?** → Leia [EDICAO_RAPIDA.md](./EDICAO_RAPIDA.md)
2. ✅ **Designer?** → Veja [UX_CHEATSHEET.md](./UX_CHEATSHEET.md)
3. ✅ **Developer?** → Explore [GUIA_EDICAO_TELAS.md](./GUIA_EDICAO_TELAS.md)
4. ✅ **Stakeholder?** → Leia [EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md)

---

**Desenvolvido com ❤️ para a comunidade universitária**

**Última atualização**: 04/06/2026  
**Versão**: 1.0.0  
**Status**: ✅ Pronto para uso
