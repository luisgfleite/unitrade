# Registro de Prompts — Desenvolvimento do UniTrade

Este documento registra, em ordem cronológica, as **solicitações (prompts)** feitas ao assistente de IA durante o desenvolvimento do **UniTrade**, reescritas de forma detalhada e formal. Serve como **apêndice de metodologia** do projeto, evidenciando o processo de construção assistida por IA — da configuração do ambiente até a apresentação final.

> Projeto Final — Prototipagem de Sistemas Computacionais · UNIPÊ · Profa. Joanacelle C. Melo
> Cada item traz: o **pedido original** (como foi digitado), a **versão detalhada** (intenção formalizada) e o **resultado obtido**.

---

## Fase 1 — Configuração e execução do ambiente

### Prompt 1 — Colocar o frontend em execução
- **Original:** *"Coloque esse frontend pra rodar, esse é o projeto do UniTrade."*
- **Versão detalhada:** Configurar o ambiente de desenvolvimento do projeto UniTrade e colocar a interface (frontend) em execução local, instalando o gerenciador de pacotes e as dependências necessárias, e iniciando o servidor de desenvolvimento.
- **Resultado:** Identificado projeto Next.js inicial; habilitado o **pnpm** via corepack; contornado erro de *symlink* do Windows/OneDrive com `nodeLinker: hoisted`; servidor de desenvolvimento iniciado e validado (HTTP 200).

### Prompt 2 — Encerrar o servidor
- **Original:** *"Mata o servidor."*
- **Versão detalhada:** Encerrar o processo do servidor de desenvolvimento em execução.
- **Resultado:** Processo do servidor finalizado.

### Prompt 3 — Substituição do código e instruções de execução
- **Original:** *"Botei o código certo, instala tudo aí e me ensina a rodar essa bomba."*
- **Versão detalhada:** O código do projeto foi substituído pela versão correta (um *export* do Figma Make em **Vite + React**). Instalar todas as dependências do novo projeto e documentar, de forma didática, o passo a passo para executá-lo localmente.
- **Resultado:** Detectado novo projeto Vite; adicionadas dependências faltantes (`react`/`react-dom` 18.3.1); aprovados *build scripts* nativos (esbuild, Tailwind oxide); servidor iniciado e elaborado um guia de execução.

### Prompt 4 — Reiniciar a execução
- **Original:** *"Coloca pra rodar novamente."*
- **Versão detalhada:** Reiniciar o servidor de desenvolvimento para retomar os testes da aplicação.
- **Resultado:** Servidor reiniciado e disponibilidade confirmada em `http://localhost:5173`.

---

## Fase 2 — Especificação e construção do backend

### Prompt 5 — Levantamento de requisitos e plano de backend
- **Original:** *"Preciso fazer todo o backend dessa parada porque é um projeto de faculdade, e preciso fazer rodar no Vercel. Então precisa ter sistema de login e cadastro, verificação acadêmica (o usuário envia o documento, chega no painel do administrador e ele aprova ou recusa; a aba de completar perfil fica disponível assim que a conta é criada). Quem tem documento verificado faz tudo; quem não tem só visualiza. Precisa de feed com busca, lista de desejos, criar anúncio (aprovado pela administração), tela de meus anúncios e vendidos, e chat com o negociante. Analise bem e me diga exatamente por onde começar para fazer tudo isso."*
- **Versão detalhada:** Especificar e implementar o backend completo de um marketplace universitário, com deploy previsto na Vercel, contemplando: (1) autenticação (login/cadastro); (2) **verificação acadêmica** via envio de documento, com aprovação/recusa em painel administrativo, liberando o preenchimento de perfil imediatamente após o cadastro; (3) **controle de acesso** — usuários verificados podem comprar e anunciar, não verificados apenas visualizam; (4) feed com busca; (5) lista de desejos; (6) criação de anúncios com **moderação administrativa**; (7) telas de “meus anúncios” e “vendidos”; (8) chat entre as partes. Solicitada uma análise prévia e a definição da ordem de implementação.
- **Resultado:** Definida a arquitetura **Supabase** (PostgreSQL + Auth + Storage + Realtime + RLS); criado o `schema.sql` (tabelas, políticas de segurança, *trigger* de perfil, *buckets*); implementados `AuthProvider`, login real, rotas protegidas, tela de verificação com *upload*, painel administrativo e regras de RLS que garantem o controle de acesso no banco.

### Prompt 6 — Correção de fluxo e refinamento da interface
- **Original:** *"Funcionou, mas quando eu crio a conta ele já vai pro feed em vez de ir pra verificação, e o feed já mostra opções. Ainda está muito cru. Melhore, adicione o que falta (tipo logout), um SEO legal, e finalize."*
- **Versão detalhada:** Corrigir o redirecionamento pós-cadastro (deve direcionar à verificação acadêmica, não ao feed); substituir os dados fictícios (*mock*) por dados reais do backend; adicionar funcionalidades ausentes como **logout** e navegação; e aprimorar o **SEO** da aplicação.
- **Resultado:** Cadastro passou a direcionar para a verificação; feed, lista de desejos, criação de anúncio, “meus anúncios”, perfil, detalhe do produto e chat foram conectados ao banco; adicionados navegação inferior, *logout* e metatags de SEO (Open Graph, idioma, favicon).

### Prompt 7 — Instruções de execução
- **Original:** *"Me fala os comandos aí pra botar pra rodar."*
- **Versão detalhada:** Listar os comandos de terminal necessários para instalar dependências e iniciar a aplicação.
- **Resultado:** Documentados os comandos `corepack enable pnpm`, `pnpm install`, `pnpm dev` e observações sobre o `.env.local`.

---

## Fase 3 — Avaliação, polimento e novos sistemas

### Prompt 8 — Auditoria do projeto para a apresentação
- **Original:** *"Analise bem o código atual e me diga o que falta e o que podemos melhorar para conseguir 'vender' esse projeto hoje na apresentação da faculdade."*
- **Versão detalhada:** Realizar uma auditoria técnica do estado atual do projeto (incluindo a verificação do *build* de produção), apontando lacunas e oportunidades de melhoria, com foco em maximizar o impacto na apresentação acadêmica.
- **Resultado:** Confirmado *build* de produção íntegro; mapeadas telas ainda fictícias; elencados riscos (ausência de deploy, base vazia, confirmação de e-mail) e prioridades (deploy, dados de demonstração); fornecidos argumentos de defesa para a banca.

### Prompt 9 — Atratividade visual e novas funcionalidades
- **Original:** *"Deixe mais chamativo, bota o ícone de chat e esse tipo de coisa, adicione animações, adicione mais sistemas, lista os usuários na página de administração, etc."*
- **Versão detalhada:** Aprimorar a identidade visual e a interatividade: incluir ícone de chat na navegação, adicionar **animações**, e ampliar as funcionalidades — em especial, criar no painel administrativo a **listagem de usuários** com ações de gestão.
- **Resultado:** Navegação inferior redesenhada (com chat e animações via `motion`); feed com **filtro por categoria** e entrada animada dos cards; painel admin com **aba de usuários** (verificar/promover) e **cartões de estatísticas**.

### Prompt 10 — Fluxo de pagamento (escrow)
- **Original:** *"Quando eu subo um anúncio ele já redireciona pra tela de 'pago com sucesso'. Faça o anunciante escolher se o cliente interessado pagou ou não, ou então faça o pagamento direto pelo app — e só depois que o cliente marcar como entregue o pagamento cai pro vendedor. Precisamos de um protótipo bom."*
- **Versão detalhada:** Corrigir o redirecionamento indevido após a criação de anúncio e implementar um fluxo de transação. Optou-se pelo modelo de **pagamento protegido (escrow)** com pagamento simulado: o comprador paga no aplicativo, o valor fica retido em garantia e só é liberado ao vendedor após a confirmação de recebimento, com possibilidade de cancelamento/estorno.
- **Resultado:** Corrigido o redirecionamento; criada a tabela `orders` e **funções de transição de estado** no banco (`create_order`, `pay_order`, `mark_shipped`, `confirm_delivery`, `cancel_order`); implementadas as telas de pagamento, acompanhamento do pedido (linha do tempo) e listagem de compras/vendas.

### Prompt 11 — Sistema de endereço com ViaCEP
- **Original:** *"Bota algum sistema pra pôr endereço pra se encontrar, daí já mete a API do ViaCEP e esse tipo de coisa."*
- **Versão detalhada:** Implementar um sistema de **ponto de encontro** para as negociações, com cadastro de endereço e **autopreenchimento via API do ViaCEP** (consulta por CEP), exibindo o local no anúncio e no pedido.
- **Resultado:** Criados o utilitário `cep.ts` (integração ViaCEP) e o componente reutilizável `AddressFields`; adicionados campos de endereço ao anúncio e ao pedido; o ponto de encontro passou a ser exibido no detalhe do produto e no acompanhamento do pedido.

---

## Fase 4 — Apresentação (Pitch Deck)

### Prompt 12 — Geração da apresentação em HTML
- **Original:** *"Leia o 'Compartilhar UniTrade_Pitch_Deck' e gere um HTML totalmente customizado com o tema do UniTrade. Algo bonito, dinâmico e com animações."*
- **Versão detalhada:** Extrair o conteúdo do arquivo de apresentação fornecido e reconstruí-lo como uma **apresentação web (HTML) autônoma**, com identidade visual do UniTrade, navegação interativa e animações.
- **Resultado:** Conteúdo dos 9 slides extraído do `.pptx`; criada apresentação HTML em arquivo único (`pitch/index.html`) com tema roxo/azul, navegação por teclado/clique/toque, barra de progresso e animações.

### Prompt 13 — Slide de chamada para ação e ênfases
- **Original:** *"Adicione um CTA do tipo 'por que não testar o sistema agora em tempo real', daí a gente já mostra o sistema. Fale do sistema de segurança, com os problemas mais enfatizados."*
- **Versão detalhada:** Incluir um slide de **chamada para ação (CTA)** convidando à demonstração ao vivo; adicionar um **slide dedicado à segurança** do sistema; e reforçar a ênfase no problema abordado.
- **Resultado:** Adicionados o slide de CTA (com botão que abre a aplicação) e o slide de **Segurança & Confiança**; o slide de problema recebeu título mais incisivo e um destaque de consequência.

### Prompt 14 — Ajuste de nomenclatura
- **Original:** *"Mude de 'comunidade UNIPÊ' para 'comunidade universitária'."*
- **Versão detalhada:** Substituir, no slide de público-alvo, o termo institucional específico por uma denominação genérica.
- **Resultado:** Texto do card alterado para “Comunidade universitária”.

### Prompt 15 — Slide de CTA final
- **Original:** *"Adicione o slide de CTA no final, falando para testar o sistema em tempo real."*
- **Versão detalhada:** Inserir um **slide de encerramento** com chamada para a demonstração ao vivo da aplicação.
- **Resultado:** Adicionado slide final de CTA (logo, mensagem de fechamento e botão de teste); corrigido o disparo da animação do gráfico de feedback, que deixou de ser o último slide.

### Prompt 16 — Inserção do logotipo
- **Original:** *"Bota o logo.png no slide aí."*
- **Versão detalhada:** Inserir o arquivo de logotipo oficial (`logo.png`) nos slides de abertura e encerramento.
- **Resultado:** Logotipo adicionado à capa e ao slide final.

### Prompt 17 — Ajuste de fundo do logotipo
- **Original:** *"Ficou com fundo branco, bota um fundo escuro ou remove o fundo."*
- **Versão detalhada:** Corrigir a exibição do logotipo, que apresentava fundo branco indevido, ajustando-o ao tema escuro da apresentação.
- **Resultado:** Verificado que o logotipo possui fundo transparente; removido o contêiner branco e aplicado um brilho suave para legibilidade sobre o fundo escuro.

---

## Fase 5 — Documentação

### Prompt 18 — Documentação técnica
- **Original:** *"Faça a documentação técnica do sistema, biblioteca e framework."*
- **Versão detalhada:** Produzir a **documentação técnica** do sistema, descrevendo arquitetura, **frameworks e bibliotecas** utilizados (com versões e finalidade), modelo de dados, segurança, fluxos e instruções de execução/deploy.
- **Resultado:** Criado o arquivo `DOCUMENTACAO_TECNICA.md` com visão geral, tabelas de tecnologias, estrutura de pastas, modelo de dados, RLS, fluxo de escrow e guia de configuração.

### Prompt 19 — Registro de prompts
- **Original:** *"Agora salva os prompts dessa conversa em outro .md, mas deixe eles mais detalhados, pra que é pro projeto da universidade."*
- **Versão detalhada:** Compilar, em um documento separado, o histórico de solicitações feitas ao assistente de IA, reescritas de forma detalhada e formal, adequado para inclusão no projeto acadêmico.
- **Resultado:** Este documento (`REGISTRO_DE_PROMPTS.md`).

---

## Observações metodológicas

- O desenvolvimento foi conduzido de forma **iterativa**: a cada entrega, testes e *feedback* orientavam o próximo passo.
- As decisões de arquitetura priorizaram **segurança no banco de dados** (RLS), **rapidez de entrega** (BaaS) e **viabilidade de deploy** (SPA estática na Vercel).
- Os *prompts* originais foram propositalmente informais; sua reescrita detalhada aqui evidencia a intenção técnica por trás de cada solicitação.
