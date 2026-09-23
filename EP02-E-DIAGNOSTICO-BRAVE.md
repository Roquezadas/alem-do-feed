# EP. 02 e diagnóstico do Brave — 23/09/2026

## EP. 02

Adicionado ao modelo existente em `src/data/episodes.ts`, com slug `isso-e-real`, número, título, descrição, roteiro, tags e relações com fundamentos já cadastrados. A seleção `latestEpisode` centraliza o destaque. EP. 01 permanece disponível, com seu próprio Spotify, duração, conteúdo e slug `quem-autorizou`.

O [episódio oficial no Spotify](https://open.spotify.com/episode/1mCK51FFYaM8NnUaKIRmGA) confirmou a URL canônica sem tracking, duração pública de 661 segundos (11 min 01 s) e `music:release_date` de `2026-09-23T03:44:00Z`. Consulta pontual às metatags públicas; o site não faz scraping nem consultas de metadados durante SSR ou navegação.

## Home

Mantidos layout, tipografia, paleta e H1 institucional “Antes de ser conteúdo, era alguém.” A arte enviada pelo usuário substitui a composição do EP. 01 no mesmo espaço, inteira, sem crop, mudança de textos ou cores. Atualizados destaque, descrição, botões, metadados e contagem de episódios. Acrescentado acesso ao arquivo dos dois episódios. Nenhum player ou SDK externo na abertura da Home.

## /episodios e página individual

- Ordem: EP. 02 — ISSO É REAL?, depois EP. 01 — QUEM AUTORIZOU?.
- Mesma apresentação editorial e mesmo `EpisodeCard`, sem segunda arquitetura.
- Novo detalhe: `/episodios/isso-e-real`, com roteiro, Spotify, leis relacionadas, evidências e retorno à listagem.
- `/episodios/quem-autorizou` preservado; slugs desconhecidos continuam retornando 404.
- O anúncio do EP. 02 entrou no feed editorial de conteúdos; o anúncio do EP. 01 foi mantido. O Feed Experimental não foi modificado.

## Spotify

Reutilizado `SpotifyEmbed.tsx`. Iframe oficial de largura fluida, altura reservada de 152 px e título acessível. Só é criado após clique; SSR e primeiro render client são iguais. Sem SDK ou nova dependência.

Acrescentados timeout de 15 segundos, fallback local, nova tentativa e botão de fechar. Eventos nativos de erro são escutados diretamente no iframe, pois não propagam; listeners e timers são removidos ao desmontar ou trocar de episódio. Link direto permanece disponível em todos os estados.

Limite técnico: iframe cross-origin não permite ler a tela interna do Spotify. Um bloqueio pode emitir `load` mesmo mostrando uma página de erro. Não se interpreta esse evento como confirmação de reprodução: o link alternativo continua visível e o player pode ser fechado. Os testes de falha usam eventos/timeout simulados, não certificam comportamento de todo bloqueador.

## Capa e imagens

O [oEmbed oficial](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Fepisode%2F1mCK51FFYaM8NnUaKIRmGA) retorna a mesma identidade de capa do EP. 01. Reutilizado `ep01-quem-autorizou-spotify.jpg` (640 × 640, 33.862 bytes) nos cards e detalhes, sem duplicar arquivo.

Arte da Home fornecida pelo usuário: `Imagem do Codex 23 de set. de 2026, 18_34_02.png`.

- `hero-ep02-isso-e-real-640.webp`: 640 × 800, 32.454 bytes.
- `hero-ep02-isso-e-real-1120.webp`: 1120 × 1400, 79.642 bytes.

Otimização com o script existente; `srcSet`, `sizes`, dimensões explícitas, alt descritivo, carregamento eager e prioridade alta no hero. A arte anterior foi preservada no repositório, sem importação no bundle atual. Nenhuma imagem foi gerada por IA nesta tarefa. Logo do header/footer e favicon não foram alterados.

## Sala de Evidências e busca

EP. 02 ligado aos tópicos existentes: inteligência artificial, direito à imagem, privacidade, publicar e compartilhar, honra, proteção de dados e responsabilidade civil. Não foram criados tópicos ou precedentes artificiais. O CTA do episódio usa `evidenceTopicSlug`, levando ao tópico de IA; o EP. 01 continua levando a direito à imagem.

O índice de busca já usa todos os episódios. Os campos do EP. 02 contêm “Isso é real?”, “deepfake” e “inteligência artificial”; testada a correspondência com a normalização existente. Validação interativa do diálogo de busca ainda pendente.

## SEO

Home e listagem atualizadas; `PodcastSeries.numberOfEpisodes` vem do tamanho da lista. O detalhe usa title, description, Open Graph, imagem oficial, URL canônica absoluta e `summary_large_image` no sistema atual de `head` do TanStack.

A auditoria SSR encontrou canonical duplicado: a rota pai `/episodios` emitia seu canonical também nos detalhes. Corrigido para emitir apenas quando é a rota final. Testes confirmam exatamente um canonical em cada episódio. Essa correção de SEO é independente do Brave.

## Brave desktop

**Não consegui reproduzir até esta etapa. Não há causa confirmada nem afirmação de correção do erro relatado.**

Verificações de produção em 23/09/2026:

- `https://alemdofeed.vercel.app/`: HTTP 200, HTML completo, sem tela de ErrorBoundary no SSR, sem iframe ou script externo inicial.
- Home e dependências públicas: 32 recursos consultados, incluindo 28 JavaScripts; sem falhas de status ou MIME JavaScript.
- Os dois chunks destacados no print anterior (`Section---Twl3b3.js` e `EpisodeCard-Bp_Gd9wd.js`) responderam 200 e `application/javascript` nesta consulta. Isso não invalida a falha capturada pelo usuário em outro momento.
- Risco observado: `/assets/auditoria-ep02-inexistente.js` respondeu 404, HTML e `Cache-Control: public, max-age=31536000, immutable`. Pode reter uma resposta inválida no cache, mas não prova que isso originou o erro do Brave. Infraestrutura não alterada por hipótese.
- A ErrorBoundary raiz imprime a exception em `console.error`; o print anterior não mostra a primeira exception nem o status geral da requisição. Foi solicitado o primeiro erro expandido do Console.
- Home usa cards locais do Instagram, não `Embeds.process()`. Spotify só está no detalhe e após clique. Portanto não há requisição inicial desses serviços na Home auditada. Não foi comprovado bloqueio por Shields.
- Sem uso de localStorage/IndexedDB na Home; o acesso a sessionStorage e JSON.parse da restauração de scroll no TanStack instalado está protegido contra indisponibilidade/JSON inválido. Dados persistidos do perfil real do usuário não foram apagados nem inspecionados.
- Arte é importação estática local, sem lógica de decode que lance exception. Dimensões, nomes e assets emitidos foram conferidos. Falha de imagem não é tratada como causa sem evidência.
- SSR entrega HTML correto, mas isso sozinho não confirma nem exclui falha de hydration/runtime específica de um navegador.

**Correção do Brave:** nenhuma alteração especulativa em Vite, Nitro, Vercel, ErrorBoundary, cache ou dependências. O fallback do Spotify corrige um risco observável do componente opcional; não é apresentado como solução do erro da Home.

## Validação

- `npm run build`: passou, cliente + SSR + saída Vercel.
- `node node_modules/typescript/bin/tsc --noEmit`: passou.
- `npm run lint`: 0 erros; 10 avisos preexistentes de Fast Refresh.
- `node --test tests/instagram-embed.test.mjs tests/spotify-embed.test.mjs`: 17 testes passaram; SSR/StrictMode, hidratação de componentes, carregamento por ação/visibilidade, falhas, timeout, retry, troca de URL/episódio, limpeza e relações de dados.
- `node scripts/verify-public-launch.mjs http://127.0.0.1:3100`: passou; status SSR, links, títulos, ordem, canonical único, metadados, capas, resoluções WebP e ausência de embeds no HTML inicial.
- Rotas: `/`, `/episodios`, `/episodios/quem-autorizou`, `/episodios/isso-e-real`, `/conteudos`, `/feed-experimental`, `/sala-de-evidencias?topic=direito-a-imagem`, `/sala-de-evidencias?topic=inteligencia-artificial`, `/o-que-pode-fazer`, `/entenda`, `/leis`, `/jurisprudencia`, `/mitos`, `/quem-compartilhou`, `/sobre`; além do slug inexistente (404).
- Desktop/tablet/mobile: atributos responsivos e regras existentes preservados; inspeção visual e navegação real ainda pendentes. JSDOM não mede layout nem substitui navegador real.
- Brave Shields ON/OFF, janela privada, Edge, Chrome e Brave mobile: não validados nesta etapa. A skill de automação não permite alterar configurações de segurança/privacidade, inclusive Shields; eventual comparação exige ação manual do usuário.

## Arquivos criados

- `src/assets/hero-ep02-isso-e-real-640.webp`
- `src/assets/hero-ep02-isso-e-real-1120.webp`
- `tests/spotify-embed.test.mjs`
- `EP02-E-DIAGNOSTICO-BRAVE.md`

## Arquivos modificados

- `src/data/episodes.ts`, `src/data/types.ts`, `src/data/topics.ts`, `src/data/social.ts`, `src/data/feed.ts`
- `src/components/HeroFrame.tsx`, `src/components/SpotifyEmbed.tsx`, `src/components/cards/EpisodeCard.tsx`
- `src/routes/index.tsx`, `src/routes/episodios.tsx`, `src/routes/episodios/$slug.tsx`, `src/routes/conteudos.tsx`
- `src/assets/README.md`, `scripts/verify-public-launch.mjs`, `package.json`

Alterações locais, sem commit, push ou deploy. A produção consultada ainda é a versão anterior. Nenhuma mudança nas marcas, Feed Experimental, arquitetura da Sala de Evidências ou integrações do Instagram.
