# ⚡ Edição Rápida - Comece Agora!

## 🎯 3 Edições em 3 Minutos

### ✏️ Edição 1: Mudar o Nome do App (30 segundos)

**Arquivo**: `src/app/components/Login.tsx` (linha 30)

**Mude de**:
```tsx
<CardTitle className="text-3xl">UniTrade</CardTitle>
```

**Para**:
```tsx
<CardTitle className="text-3xl">MeuMarketplace</CardTitle>
```

✅ **Salve e veja a mudança!**

---

### 🎨 Edição 2: Mudar as Cores (1 minuto)

**Arquivo**: `src/app/components/Login.tsx` (linha 66)

**Mude de**:
```tsx
className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
```

**Para** (verde):
```tsx
className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
```

**Outras opções**:
- Vermelho: `from-red-600 to-orange-600`
- Rosa: `from-pink-600 to-purple-600`
- Azul escuro: `from-blue-700 to-indigo-700`

✅ **Salve e veja a mudança!**

---

### 📝 Edição 3: Adicionar um Novo Campo (1.5 minutos)

**Arquivo**: `src/app/components/Perfil.tsx` (após linha 56)

**Adicione depois do campo "Curso"**:

```tsx
<div className="space-y-2">
  <Label htmlFor="semestre">Semestre</Label>
  <Input 
    id="semestre" 
    type="number"
    placeholder="Ex: 5" 
    min="1"
    max="10"
  />
</div>
```

✅ **Salve e veja o novo campo aparecer!**

---

## 🚀 Edições Intermediárias (5-10 minutos cada)

### 1️⃣ Adicionar Seção "Produtos em Destaque"

**Arquivo**: `src/app/components/Home.tsx`

**Adicione antes do grid principal** (linha 60):

```tsx
{/* NOVA SEÇÃO - Produtos em Destaque */}
<div className="mb-6">
  <h2 className="text-xl font-bold mb-4">🔥 Em Destaque</h2>
  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100">
    <p className="text-sm text-purple-800">
      Produtos com desconto especial para você!
    </p>
  </div>
</div>
```

---

### 2️⃣ Adicionar Botão "Filtrar por Preço"

**Arquivo**: `src/app/components/Home.tsx`

**Adicione após a busca** (linha 55):

```tsx
<div className="flex gap-2 overflow-x-auto pb-2">
  <Button variant="outline" size="sm">Até R$ 50</Button>
  <Button variant="outline" size="sm">R$ 50-100</Button>
  <Button variant="outline" size="sm">R$ 100-200</Button>
  <Button variant="outline" size="sm">Acima R$ 200</Button>
</div>
```

---

### 3️⃣ Adicionar Contador de Visualizações

**Arquivo**: `src/app/components/DetalheProduto.tsx`

**Adicione após "postedTime"** (linha 98):

```tsx
import { Eye } from 'lucide-react';

{/* Linha de informações */}
<div className="flex items-center gap-4 text-sm text-gray-600">
  <div className="flex items-center gap-2">
    <Clock className="w-4 h-4" />
    <span>{product.postedTime}</span>
  </div>
  
  {/* NOVO - Contador de visualizações */}
  <div className="flex items-center gap-2">
    <Eye className="w-4 h-4" />
    <span>245 visualizações</span>
  </div>
</div>
```

---

## 🎨 Personalizações de Estilo

### Cores Disponíveis (Tailwind)

```
Roxo:    purple-50  purple-100  purple-600  purple-700
Azul:    blue-50    blue-100    blue-600    blue-700
Verde:   green-50   green-100   green-600   green-700
Vermelho: red-50    red-100     red-600     red-700
Amarelo: yellow-50  yellow-100  yellow-600  yellow-700
Rosa:    pink-50    pink-100    pink-600    pink-700
Cinza:   gray-50    gray-100    gray-600    gray-900
```

### Tamanhos de Texto

```tsx
text-xs    // 12px - Muito pequeno
text-sm    // 14px - Pequeno
text-base  // 16px - Padrão
text-lg    // 18px - Grande
text-xl    // 20px - Extra grande
text-2xl   // 24px - 2x extra grande
text-3xl   // 30px - 3x extra grande
```

### Espaçamentos

```tsx
p-2   // padding 8px
p-4   // padding 16px
p-6   // padding 24px
p-8   // padding 32px

m-2   // margin 8px
m-4   // margin 16px
m-6   // margin 24px
m-8   // margin 32px

gap-2 // espaço entre elementos 8px
gap-4 // espaço entre elementos 16px
```

---

## 📋 Templates Prontos para Copiar

### Template 1: Card de Notificação

**Cole onde quiser** (exemplo: em Home.tsx):

```tsx
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
  <div className="flex items-start gap-3">
    <div className="bg-blue-600 text-white p-2 rounded-full">
      <Bell className="w-5 h-5" />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-blue-900">
        Novidade no UniTrade!
      </h3>
      <p className="text-sm text-blue-700 mt-1">
        Agora você pode favoritar produtos e acompanhar preços
      </p>
    </div>
    <button className="text-blue-600 hover:text-blue-700">
      <X className="w-5 h-5" />
    </button>
  </div>
</div>
```

---

### Template 2: Botão de Ação Flutuante

**Cole no final do componente** (antes do último `</div>`):

```tsx
{/* Botão flutuante */}
<button
  className="fixed bottom-20 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
  onClick={() => navigate('/criar-anuncio')}
>
  <Plus className="w-6 h-6" />
</button>
```

---

### Template 3: Badge de Status

**Cole em cards de produto**:

```tsx
{/* Status do produto */}
<div className="absolute top-2 left-2">
  <Badge className="bg-green-500">Disponível</Badge>
  {/* ou */}
  <Badge className="bg-yellow-500">Reservado</Badge>
  {/* ou */}
  <Badge className="bg-red-500">Vendido</Badge>
</div>
```

---

### Template 4: Skeleton Loading

**Substitua o conteúdo quando estiver carregando**:

```tsx
{loading ? (
  <div className="space-y-4">
    <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
  </div>
) : (
  {/* Conteúdo normal */}
)}
```

---

### Template 5: Modal Simples

**Criar novo componente** `src/app/components/Modal.tsx`:

```tsx
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
```

**Usar o modal**:

```tsx
import { useState } from 'react';
import { Modal } from './Modal';

export function MinhaT ela() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Abrir Modal
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Título do Modal"
      >
        <p>Conteúdo do modal aqui!</p>
      </Modal>
    </>
  );
}
```

---

## 🔥 Desafios para Praticar

### Desafio 1: Modo Escuro ⭐
Adicione um toggle de modo escuro no header

### Desafio 2: Busca Avançada ⭐⭐
Adicione filtros de preço min/max na busca

### Desafio 3: Produto Relacionados ⭐⭐
Mostre "Produtos similares" na tela de detalhes

### Desafio 4: Carrinho de Compras ⭐⭐⭐
Crie uma tela de carrinho com múltiplos produtos

### Desafio 5: Sistema de Ofertas ⭐⭐⭐⭐
Implemente counter-offers entre comprador e vendedor

---

## 🎯 Checklist de Edição

Antes de fazer uma mudança:

- [ ] Identifiquei qual arquivo editar
- [ ] Fiz backup do código original (copiar e comentar)
- [ ] Testei se a mudança funciona
- [ ] Verifiquei em mobile e desktop
- [ ] Documentei o que mudei (comentário no código)

---

## 💡 Dicas de Produtividade

### Atalhos Úteis

```
Ctrl + F       → Buscar no arquivo
Ctrl + S       → Salvar
Ctrl + /       → Comentar/descomentar
Ctrl + D       → Duplicar linha
Alt + ↑/↓      → Mover linha
Ctrl + Z       → Desfazer
Ctrl + Shift + Z → Refazer
```

### Extensões VS Code Recomendadas

- **Tailwind CSS IntelliSense** - Autocomplete de classes
- **ES7+ React Snippets** - Atalhos para React
- **Prettier** - Formatação automática
- **Auto Rename Tag** - Renomeia tags HTML automaticamente

---

## 📁 Arquivos Principais (Ordem de Prioridade)

### 🔥 Mais Editados

1. `Home.tsx` - Feed principal
2. `DetalheProduto.tsx` - Detalhes
3. `CriarAnuncio.tsx` - Criar produto
4. `Chat.tsx` - Mensagens

### 🎨 Aparência

5. `Login.tsx` - Primeira impressão
6. `theme.css` - Cores globais

### 🔧 Funcionalidades

7. `Filtros.tsx` - Busca avançada
8. `Pagamento.tsx` - Checkout
9. `MeusAnuncios.tsx` - Gestão

---

## ❓ FAQ Rápido

**Q: As mudanças não aparecem?**  
A: Salve o arquivo (Ctrl+S) e recarregue o navegador (Ctrl+R)

**Q: Erro de sintaxe?**  
A: Veja o terminal - mostra a linha do erro

**Q: Como voltar atrás?**  
A: Ctrl+Z ou use Git para reverter

**Q: Posso quebrar algo?**  
A: Sim, mas é fácil reverter! Use Git.

**Q: Onde testar mobile?**  
A: F12 → Ícone de celular (canto superior esquerdo)

---

## 🚀 Próximos Passos

1. ✅ Escolha uma das 3 edições rápidas acima
2. ✅ Abra o arquivo no editor
3. ✅ Faça a mudança
4. ✅ Salve e veja o resultado!
5. ✅ Experimente os templates prontos
6. ✅ Tente um desafio

---

**Comece agora! As telas estão prontas para editar.** 🎨

Para dúvidas, consulte: [GUIA_EDICAO_TELAS.md](./GUIA_EDICAO_TELAS.md)
