# 🎨 Guia de Edição de Telas - UniTrade
## Como Personalizar e Modificar as Telas

---

## 📍 Onde Estão as Telas?

Todas as telas estão em: `/src/app/components/`

```
src/app/components/
├── Login.tsx              ← Tela de login/cadastro
├── Verificacao.tsx        ← Upload de documento
├── Perfil.tsx             ← Completar perfil
├── BoasVindas.tsx         ← Onboarding final
├── Home.tsx               ← Feed principal
├── Filtros.tsx            ← Filtros e categorias
├── DetalheProduto.tsx     ← Detalhes do produto
├── CriarAnuncio.tsx       ← Criar novo anúncio
├── Chat.tsx               ← Mensagens
├── Negociacao.tsx         ← Fazer proposta
├── Pagamento.tsx          ← Finalizar compra
├── Desejos.tsx            ← Lista de favoritos
├── MeusAnuncios.tsx       ← Gerenciar anúncios
├── Confirmacao.tsx        ← Pedido confirmado
├── Avaliacao.tsx          ← Avaliar compra
└── ui/                    ← Componentes base
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── ...
```

---

## ✏️ Método 1: Edição Visual Simples

### Exemplo 1: Mudar Cores

**Localização**: Qualquer tela com botões coloridos

**Antes**:
```tsx
<Button className="bg-gradient-to-r from-purple-600 to-blue-600">
  Entrar
</Button>
```

**Depois** (mudar para verde):
```tsx
<Button className="bg-gradient-to-r from-green-600 to-emerald-600">
  Entrar
</Button>
```

**Opções de cores**:
- `purple-600` → Roxo
- `blue-600` → Azul
- `green-600` → Verde
- `red-600` → Vermelho
- `yellow-600` → Amarelo
- `pink-600` → Rosa

---

### Exemplo 2: Mudar Textos

**Arquivo**: `src/app/components/Login.tsx`

**Antes**:
```tsx
<CardTitle className="text-3xl">UniTrade</CardTitle>
<CardDescription>
  Entre na comunidade universitária
</CardDescription>
```

**Depois**:
```tsx
<CardTitle className="text-3xl">CampusMarket</CardTitle>
<CardDescription>
  Seu marketplace universitário
</CardDescription>
```

---

### Exemplo 3: Mudar Ícones

**Antes**:
```tsx
import { GraduationCap } from 'lucide-react';

<GraduationCap className="w-12 h-12 text-white" />
```

**Depois**:
```tsx
import { ShoppingBag } from 'lucide-react';

<ShoppingBag className="w-12 h-12 text-white" />
```

**Ícones disponíveis**: [Lucide Icons](https://lucide.dev/icons/)

---

### Exemplo 4: Ajustar Tamanhos

**Antes** (botão pequeno):
```tsx
<Button size="sm">Salvar</Button>
```

**Depois** (botão grande):
```tsx
<Button size="lg">Salvar</Button>
```

**Tamanhos**: `sm` (pequeno) | `md` (médio) | `lg` (grande)

---

## 🎨 Método 2: Mudanças de Layout

### Exemplo 1: Grid de Produtos (Home)

**Arquivo**: `src/app/components/Home.tsx`

**2 colunas (atual)**:
```tsx
<div className="grid grid-cols-2 gap-4">
  {products.map((product) => (...))}
</div>
```

**3 colunas**:
```tsx
<div className="grid grid-cols-3 gap-4">
  {products.map((product) => (...))}
</div>
```

**1 coluna (lista)**:
```tsx
<div className="grid grid-cols-1 gap-4">
  {products.map((product) => (...))}
</div>
```

---

### Exemplo 2: Adicionar Nova Seção

**Arquivo**: `src/app/components/Home.tsx`

**Adicionar após o grid de produtos**:

```tsx
{/* Grid de produtos existente */}
<div className="grid grid-cols-2 gap-4">
  {products.map(...)}
</div>

{/* NOVA SEÇÃO - Adicionar aqui */}
<div className="mt-8">
  <h2 className="text-xl font-bold mb-4">Produtos Recomendados</h2>
  <div className="grid grid-cols-2 gap-4">
    {/* Lista de produtos recomendados */}
  </div>
</div>
```

---

### Exemplo 3: Reordenar Elementos

**Arquivo**: `src/app/components/DetalheProduto.tsx`

**Trocar ordem de preço e título**:

**Antes**:
```tsx
<h1>{product.title}</h1>
<span className="text-3xl">{product.price}</span>
```

**Depois**:
```tsx
<span className="text-3xl">{product.price}</span>
<h1>{product.title}</h1>
```

---

## 🔧 Método 3: Adicionar Funcionalidades

### Exemplo 1: Adicionar Campo ao Formulário

**Arquivo**: `src/app/components/Perfil.tsx`

**Adicionar campo "WhatsApp"**:

```tsx
{/* Campos existentes */}
<div className="space-y-2">
  <Label htmlFor="course">Curso</Label>
  <Input id="course" placeholder="Engenharia de Software" required />
</div>

{/* NOVO CAMPO - Adicionar aqui */}
<div className="space-y-2">
  <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
  <Input 
    id="whatsapp" 
    type="tel"
    placeholder="(11) 98765-4321" 
  />
</div>

{/* Continua com Bio */}
<div className="space-y-2">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" ... />
</div>
```

---

### Exemplo 2: Adicionar Botão de Compartilhar

**Arquivo**: `src/app/components/DetalheProduto.tsx`

**No header da tela**:

```tsx
import { Share2 } from 'lucide-react';

{/* Botões existentes */}
<div className="flex gap-2">
  <Button variant="ghost" size="icon" onClick={() => setLiked(!liked)}>
    <Heart className="w-5 h-5" />
  </Button>
  
  {/* NOVO BOTÃO - Adicionar aqui */}
  <Button 
    variant="ghost" 
    size="icon"
    onClick={() => {
      navigator.share({
        title: product.title,
        text: `Confira este produto: ${product.title}`,
        url: window.location.href
      });
    }}
  >
    <Share2 className="w-5 h-5" />
  </Button>
</div>
```

---

### Exemplo 3: Adicionar Filtro Rápido

**Arquivo**: `src/app/components/Home.tsx`

**Adicionar chips de filtro rápido**:

```tsx
{/* Após a barra de busca */}
<div className="flex gap-2 overflow-x-auto">
  <Badge 
    variant="outline"
    className="cursor-pointer"
    onClick={() => filterByCategory('eletronicos')}
  >
    Eletrônicos
  </Badge>
  <Badge 
    variant="outline"
    className="cursor-pointer"
    onClick={() => filterByCategory('livros')}
  >
    Livros
  </Badge>
  <Badge 
    variant="outline"
    className="cursor-pointer"
    onClick={() => filterByCategory('roupas')}
  >
    Roupas
  </Badge>
</div>
```

---

## 🎭 Método 4: Criar Variações de Tela

### Exemplo: Criar Tela de Perfil do Vendedor

**Criar novo arquivo**: `src/app/components/PerfilVendedor.tsx`

```tsx
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react';

export function PerfilVendedor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vendedor = {
    nome: 'Maria Santos',
    curso: 'Engenharia Civil',
    rating: 4.9,
    vendas: 24,
    bio: 'Vendendo itens de qualidade desde 2024',
    produtos: [
      // Lista de produtos
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b shadow-sm">
        <div className="max-w-2xl mx-auto p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Perfil */}
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            {/* Avatar e Info */}
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  {vendedor.nome[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{vendedor.nome}</h1>
                <Badge variant="secondary">{vendedor.curso}</Badge>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{vendedor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{vendedor.vendas} vendas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 mb-4">{vendedor.bio}</p>

            {/* Botão de contato */}
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => navigate('/chat')}
            >
              Enviar mensagem
            </Button>
          </CardContent>
        </Card>

        {/* Produtos do vendedor */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Produtos à venda</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Grid de produtos */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Adicionar rota** em `src/app/App.tsx`:

```tsx
import { PerfilVendedor } from './components/PerfilVendedor';

// Dentro de <Routes>
<Route path="/vendedor/:id" element={<PerfilVendedor />} />
```

---

## 🎨 Método 5: Customizar Design System

### Mudar Cores Globais

**Arquivo**: `src/styles/theme.css`

```css
/* Cores primárias atuais */
:root {
  --color-primary: #7c3aed; /* Purple */
  --color-secondary: #3b82f6; /* Blue */
}

/* Mudar para vermelho e laranja */
:root {
  --color-primary: #dc2626; /* Red */
  --color-secondary: #f97316; /* Orange */
}

/* Ou verde e azul */
:root {
  --color-primary: #059669; /* Green */
  --color-secondary: #0891b2; /* Cyan */
}
```

---

### Mudar Tipografia

**Arquivo**: `src/styles/theme.css`

```css
/* Fonte atual */
body {
  font-family: system-ui, -apple-system, sans-serif;
}

/* Mudar para Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
```

---

### Mudar Bordas

**Arquivo**: `src/styles/theme.css`

```css
/* Bordas arredondadas atuais */
:root {
  --radius: 0.5rem; /* 8px */
}

/* Bordas mais arredondadas */
:root {
  --radius: 1rem; /* 16px */
}

/* Bordas quadradas */
:root {
  --radius: 0; /* Sem arredondamento */
}
```

---

## 🔄 Método 6: Conectar com Dados Reais

### Substituir Dados Mock por API

**Antes** (dados fixos):

```tsx
const products = [
  {
    id: 1,
    title: 'Tênis Nike',
    price: 'R$ 250',
    // ... dados fixos
  }
];
```

**Depois** (dados da API):

```tsx
import { useState, useEffect } from 'react';

export function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🚀 Fluxo de Trabalho Recomendado

### 1. Identificar o que editar

```bash
# Ver todas as telas
ls src/app/components/*.tsx

# Buscar por texto específico
grep -r "UniTrade" src/app/components/
```

### 2. Abrir o arquivo

```bash
# Abrir no editor
code src/app/components/Home.tsx
```

### 3. Fazer a edição

- Usar busca (Ctrl+F) para encontrar texto
- Editar código
- Salvar (Ctrl+S)

### 4. Ver resultado

- Aplicação recarrega automaticamente
- Verificar no preview/navegador

---

## 🎯 Exemplos Práticos Completos

### Exemplo 1: Adicionar Logo Personalizado

**Arquivo**: `src/app/components/Login.tsx`

```tsx
{/* Substituir o ícone padrão */}
<div className="flex justify-center">
  <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-4 rounded-full">
    {/* Antes: Ícone genérico */}
    {/* <GraduationCap className="w-12 h-12 text-white" /> */}
    
    {/* Depois: Logo personalizado */}
    <img 
      src="/logo.png" 
      alt="Logo" 
      className="w-12 h-12"
    />
  </div>
</div>
```

---

### Exemplo 2: Adicionar Modo Escuro

**1. Criar toggle** em `src/app/components/Home.tsx`:

```tsx
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="sticky top-0 bg-white dark:bg-gray-900">
        {/* Header existente */}
        <div className="flex items-center justify-between">
          <h1>UniTrade</h1>
          
          {/* Toggle modo escuro */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**2. Adicionar classes dark** nos elementos:

```tsx
<Card className="bg-white dark:bg-gray-800">
  <CardContent className="text-gray-900 dark:text-white">
    ...
  </CardContent>
</Card>
```

---

### Exemplo 3: Adicionar Busca por Voz

**Arquivo**: `src/app/components/Home.tsx`

```tsx
import { Mic } from 'lucide-react';
import { useState } from 'react';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleVoiceSearch = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };
    
    recognition.start();
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar produtos..."
        className="pl-10 pr-12"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={handleVoiceSearch}
      >
        <Mic className="w-5 h-5" />
      </Button>
    </div>
  );
}
```

---

## 📱 Testar em Dispositivos

### Desktop
- Abrir no navegador
- Pressionar F12 (DevTools)
- Clicar no ícone de dispositivo móvel

### Mobile Real
```bash
# Obter IP local
ip addr show

# Acessar no celular
http://192.168.x.x:5173
```

---

## 🐛 Problemas Comuns

### 1. Mudança não aparece

**Solução**: Recarregar página (Ctrl+R) ou limpar cache (Ctrl+Shift+R)

### 2. Erro de compilação

**Solução**: Verificar console do terminal, corrigir sintaxe

### 3. Componente não importado

```tsx
// Erro
<Button>Clique</Button>

// Correto (adicionar import)
import { Button } from './ui/button';

<Button>Clique</Button>
```

---

## 💡 Dicas Finais

### ✅ Boas Práticas

- **Testar após cada mudança**: Salve e veja o resultado
- **Usar componentes existentes**: Reutilize os da pasta `ui/`
- **Manter consistência**: Use as mesmas cores/espaçamentos
- **Comentar código**: Explique mudanças complexas

### ❌ Evitar

- Não modificar arquivos em `ui/` diretamente (usar via componentes)
- Não remover imports necessários
- Não usar valores fixos (use variáveis do tema)

---

## 📚 Recursos Adicionais

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/icons
- **React Router**: https://reactrouter.com/
- **Shadcn UI**: https://ui.shadcn.com/

---

## 🎯 Próximos Passos

1. ✅ Escolha uma tela para editar
2. ✅ Faça uma mudança simples (ex: mudar um texto)
3. ✅ Veja o resultado
4. ✅ Experimente mudanças maiores
5. ✅ Crie suas próprias telas!

---

**Precisa de ajuda?** Pergunte específico o que quer editar! 🚀
