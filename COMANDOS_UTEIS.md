# 🔧 Comandos Úteis - UniTrade

## 📁 Navegação de Arquivos

### Listar telas
```bash
ls src/app/components/*.tsx
```

### Buscar texto em arquivos
```bash
# Buscar "UniTrade" em todos os arquivos
grep -r "UniTrade" src/

# Buscar apenas em componentes
grep -r "UniTrade" src/app/components/
```

### Ver conteúdo de um arquivo
```bash
cat src/app/components/Home.tsx
```

### Abrir arquivo no editor
```bash
code src/app/components/Home.tsx
```

---

## 🎨 Edição Rápida via Terminal

### Substituir texto em arquivo
```bash
# Substituir "UniTrade" por "MeuApp" em Login.tsx
sed -i 's/UniTrade/MeuApp/g' src/app/components/Login.tsx
```

### Adicionar linha ao final do arquivo
```bash
echo "// Comentário adicionado" >> src/app/components/Home.tsx
```

---

## 📦 Gerenciamento de Dependências

### Instalar nova biblioteca
```bash
pnpm add nome-da-biblioteca
```

### Instalar biblioteca de desenvolvimento
```bash
pnpm add -D nome-da-biblioteca
```

### Remover biblioteca
```bash
pnpm remove nome-da-biblioteca
```

### Ver todas as dependências
```bash
pnpm list
```

### Atualizar dependências
```bash
pnpm update
```

---

## 🔍 Busca e Análise

### Contar linhas de código
```bash
# Total de linhas em todos os componentes
wc -l src/app/components/*.tsx

# Total de linhas TypeScript
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l
```

### Encontrar arquivos grandes
```bash
find src -type f -size +50k
```

### Buscar TODO/FIXME no código
```bash
grep -r "TODO" src/
grep -r "FIXME" src/
```

---

## 🚀 Build e Deploy

### Build de produção
```bash
# NÃO USE - Este ambiente não suporta build
# pnpm build
```

### Limpar cache
```bash
rm -rf node_modules/.vite
```

---

## 📊 Análise de Código

### Ver componentes por tamanho
```bash
ls -lh src/app/components/*.tsx | sort -k5 -hr
```

### Contar componentes
```bash
ls src/app/components/*.tsx | wc -l
```

### Ver imports de um arquivo
```bash
grep "^import" src/app/components/Home.tsx
```

---

## 🎯 Atalhos Úteis

### Git (se estiver usando)
```bash
# Ver status
git status

# Ver mudanças
git diff

# Adicionar arquivos
git add src/app/components/Home.tsx

# Commit
git commit -m "feat: adicionar filtro de preço"

# Ver histórico
git log --oneline
```

### Navegação de Diretórios
```bash
# Ir para componentes
cd src/app/components/

# Voltar para raiz
cd /workspaces/default/code/

# Ver onde estou
pwd

# Listar arquivos
ls -la
```

---

## 🔧 Debug

### Ver console do servidor
```bash
# O servidor já está rodando
# Logs aparecem no terminal automaticamente
```

### Verificar porta em uso
```bash
lsof -i :5173
```

### Matar processo na porta
```bash
kill -9 $(lsof -t -i:5173)
```

---

## 📝 Edição de Texto (Terminal)

### Usando nano (simples)
```bash
nano src/app/components/Home.tsx

# Salvar: Ctrl+O
# Sair: Ctrl+X
```

### Usando vim (avançado)
```bash
vim src/app/components/Home.tsx

# Modo inserção: i
# Salvar e sair: :wq
# Sair sem salvar: :q!
```

---

## 🔄 Operações em Lote

### Substituir texto em múltiplos arquivos
```bash
# Substituir "purple" por "green" em todos os componentes
find src/app/components -name "*.tsx" -exec sed -i 's/purple-600/green-600/g' {} +
```

### Adicionar import em todos os arquivos
```bash
# Adicionar import do lucide-react
for file in src/app/components/*.tsx; do
  sed -i "1i import { Icon } from 'lucide-react';" "$file"
done
```

### Backup de todos os componentes
```bash
# Criar pasta de backup
mkdir -p backups/$(date +%Y%m%d)

# Copiar componentes
cp src/app/components/*.tsx backups/$(date +%Y%m%d)/
```

---

## 📊 Estatísticas

### Componentes mais usados
```bash
# Ver quais componentes importam Button
grep -l "from './ui/button'" src/app/components/*.tsx
```

### Telas por complexidade (linhas)
```bash
wc -l src/app/components/*.tsx | sort -n
```

### Imports mais comuns
```bash
grep "^import" src/app/components/*.tsx | cut -d' ' -f2-4 | sort | uniq -c | sort -nr
```

---

## 🎨 Tailwind Utils

### Buscar classes Tailwind específicas
```bash
# Buscar uso de gradient
grep -r "gradient" src/app/components/

# Buscar cores purple
grep -r "purple-" src/app/components/
```

### Listar todas as cores usadas
```bash
grep -ohr "bg-[a-z]*-[0-9]*" src/app/components/ | sort -u
```

---

## 🔍 Análise de Dependências

### Ver versões instaladas
```bash
pnpm list --depth=0
```

### Verificar pacotes desatualizados
```bash
pnpm outdated
```

### Tamanho dos node_modules
```bash
du -sh node_modules/
```

---

## 📱 Mobile Debug

### Simular diferentes viewports (via DevTools)
```javascript
// Cole no console do navegador
window.innerWidth  // Largura atual
window.innerHeight // Altura atual
```

### Inspecionar elemento específico
```bash
# Buscar elemento por classe
grep -r "className=\".*produto.*\"" src/
```

---

## 🚨 Troubleshooting

### Limpar tudo e reinstalar
```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Ver erros de TypeScript
```bash
pnpm tsc --noEmit
```

### Verificar sintaxe de arquivo específico
```bash
pnpm tsc --noEmit src/app/components/Home.tsx
```

---

## 💡 Truques Avançados

### Criar componente a partir de template
```bash
# Copiar Login.tsx como base para nova tela
cp src/app/components/Login.tsx src/app/components/NovaTelaquecoisa.tsx

# Substituir nome do componente
sed -i 's/Login/NovaTela/g' src/app/components/NovaTela.tsx
```

### Extrair todas as rotas
```bash
grep "path=" src/app/App.tsx
```

### Ver todas as props de um componente
```bash
grep "interface.*Props" src/app/components/DetalheProduto.tsx -A 10
```

---

## 📚 Documentação Rápida

### Contar documentação
```bash
wc -l *.md
```

### Buscar em documentação
```bash
grep -i "edição" *.md
```

### Listar todos os links
```bash
grep -oh "http[s]*://[^)]*" *.md | sort -u
```

---

## 🎯 Comandos Personalizados

### Criar alias úteis (adicionar ao ~/.bashrc)
```bash
# Ir direto para componentes
alias comp="cd /workspaces/default/code/src/app/components"

# Ver todos os componentes
alias lscomp="ls -lh /workspaces/default/code/src/app/components/*.tsx"

# Abrir componente rapidamente
function edit() {
  code "/workspaces/default/code/src/app/components/$1.tsx"
}
# Uso: edit Home
```

---

## 📋 Checklist de Tarefas

### Antes de fazer mudanças
```bash
# 1. Ver mudanças atuais
git status

# 2. Criar backup
cp src/app/components/Home.tsx src/app/components/Home.tsx.backup

# 3. Fazer mudança
# ... editar arquivo ...

# 4. Testar no navegador

# 5. Se der errado, restaurar
cp src/app/components/Home.tsx.backup src/app/components/Home.tsx
```

---

## 🔗 Links Rápidos para Documentação

```bash
# Abrir documentação principal
cat README.md

# Guia de edição rápida
cat EDICAO_RAPIDA.md

# Ver fluxos
cat USER_FLOW.md

# Ver métricas
cat EXECUTIVE_SUMMARY.md
```

---

## 💻 Atalhos do Editor (VS Code)

```
# Abrir command palette
Ctrl+Shift+P

# Buscar arquivo
Ctrl+P

# Buscar em todos os arquivos
Ctrl+Shift+F

# Formatar documento
Shift+Alt+F

# Multi-cursor
Alt+Click

# Selecionar todas as ocorrências
Ctrl+Shift+L

# Ir para definição
F12

# Ver referências
Shift+F12
```

---

## 🎨 Tailwind Play (Testar classes)

```bash
# Testar classe Tailwind rapidamente
echo '<div class="bg-purple-600 text-white p-4 rounded-lg">Teste</div>' > test.html
```

---

**Dica**: Salve este arquivo nos favoritos para consulta rápida! 📌

**Última atualização**: 04/06/2026
