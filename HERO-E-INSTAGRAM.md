# Home humana e Instagram real — Além do Feed

## Adaptação posterior: imagem escolhida pelo usuário

A Home agora usa a arte enviada em `c5435bbf-7bb3-4945-97f2-690bffc931c7.png`, no lugar do retrato gerado inicialmente. Nenhuma nova geração foi feita. O restante deste relatório documenta a etapa anterior; as observações sobre a arte gerada e seu crédito são históricas, não descrevem o hero atual.

- Novos assets: `src/assets/hero-quem-autorizou-publicacao-640.webp` (640 × 800, 21.358 bytes) e `src/assets/hero-quem-autorizou-publicacao-1120.webp` (1120 × 1400, 44.356 bytes).
- Imagem inteira e proporcional, sem crop, retoque ou alteração de cor/textos. Composição reconhecível em telas menores; o alt transmite a mensagem principal sem depender da leitura dos textos pequenos gravados na arte.
- Removidos os rótulos sobrepostos, a legenda da composição anterior e a atribuição de geração por IA, cuja procedência não foi estabelecida para esta nova imagem.
- Legenda atual identifica a imagem como composição editorial do EP. 01; não é apresentada como um post incorporado ou evidência de uma publicação real.
- Título “Antes de ser conteúdo, era alguém”, EP. 01 e CTAs preservados; texto de apoio adaptado à cena de publicação e consentimento.
- Logo do site, favicon, Feed Experimental e integração dos posts reais do Instagram sem alterações. A marca presente dentro da arte enviada permanece somente como parte dessa imagem.
- Originais e versões anteriores preservados. A nova imagem mantém `srcSet`, dimensões explícitas, prioridade alta e layout sem recorte. Ver `src/assets/README.md` para procedência e reprodução da otimização.
- Validação desta adaptação: build e TypeScript aprovados; lint sem erros (10 avisos antigos); 13 rotas SSR aprovadas no preview de produção. Versão WebP inspecionada visualmente como arquivo; sem nova homologação interativa em navegador ou medição de Core Web Vitals. Sem deploy.

## Registro da etapa inicial

Atualização local de 16/09/2026 em `C:/Users/marce/AlemDoFeed/camadas-legais`. Continuação da publicação pública, sem mudança de stack, deploy ou push realizado pelo assistente.

## O que estava fraco na imagem anterior

A composição de papéis/camadas comunicava profundidade, mas não mostrava quem é afetado por uma publicação. Faltavam uma pessoa reconhecível e sinais claros de recorte, circulação e perda de contexto. O bloco claro “Camada oculta” também separava a legenda da imagem e competia com o episódio.

## Solução escolhida e conceito

Retrato + repetição + frame aberto, conectado ao EP. 01. Uma pessoa fictícia ocupa o centro ético da composição; dois recortes do mesmo rosto reaparecem em cobalto. O cabelo e o ombro atravessam a moldura. Um fio coral discreto conecta as cópias e sugere consequência.

A frase principal passou a ser **“Antes de ser conteúdo, era alguém.”** O texto explica a circulação e a perda de contexto. A legenda “A imagem circula. A pessoa não termina no enquadramento” substitui o card solto, com uma linha coral integrada à composição.

O episódio **“Quem autorizou?”** aparece no mesmo hero, com ligação direta ao Spotify e à página do episódio. A capa oficial foi mantida no destaque seguinte, na listagem e no detalhe: não foi confundida com a imagem fictícia.

### Teste conceitual

- Pessoa/imagem: rosto identificável e protagonista, em vez de abstração.
- Feed/circulação: o mesmo retrato reaparece com enquadramentos diferentes.
- Exposição/perda de contexto: o recorte reduz a pessoa a uma parte da imagem.
- Consequência: fio coral, texto e pergunta do episódio, sem dramatização violenta.
- “Além”: cabelo e ombro ultrapassam o frame; o retrato não cabe integralmente na publicação.
- Identidade: grafite/marfim, cobalto, coral contido, recortes assimétricos e tipografia real em HTML. Nenhuma UI falsa de Instagram.

## Imagens geradas, onde e por quê

Foi gerada **uma composição original**, usando a ferramenta integrada de geração de imagens, não a CLI. É um retrato fictício; não representa convidada, vítima, caso real ou participante do podcast. A identificação de imagem gerada com IA aparece na Home.

A imagem foi necessária porque o rosto comunica a dimensão humana que tipografia e retângulos abstratos, sozinhos, não comunicavam tão diretamente. Não foram produzidas imagens decorativas para as outras páginas.

| Asset final                                      | Dimensões   | Tamanho      | Uso                           |
| ------------------------------------------------ | ----------- | ------------ | ----------------------------- |
| `src/assets/hero-pessoa-alem-do-frame-640.webp`  | 640 × 800   | 33.516 bytes | Candidato menor do hero       |
| `src/assets/hero-pessoa-alem-do-frame-1120.webp` | 1120 × 1400 | 87.114 bytes | Candidato maior do mesmo hero |

São duas resoluções da mesma arte, não duas imagens de campanhas diferentes. A versão otimizada foi inspecionada visualmente. O PNG original foi preservado em:

`C:/Users/marce/.codex/generated_images/01a03a33-975a-7643-b50d-cc395f147374/exec-166d3dcd-0a76-4524-b2a4-5e1cdb33182d.png`

### Assets antigos substituídos

- `hero-layers.jpg`: substituído no uso da Home, mas preservado no repositório.
- `ep01-cover.jpg`: já havia sido substituído pela capa oficial do Spotify na etapa anterior; continua preservado.
- `feed-rupture-climax.jpg`: continua fora do Feed Experimental e do build; original preservado.
- A capa `ep01-quem-autorizou-spotify.jpg` permanece em uso.

## Como a logo foi integrada

Foi respeitado o pedido mais recente de manter a logo como estava. Header, footer, marca da experiência e favicon continuam usando a solução existente. Nenhum componente de marca ou arquivo `public/brand-mark.svg` foi alterado nesta continuação. A nova arte conversa com a linguagem visual do site, sem repetir a logo dentro da imagem ou criar uma segunda marca.

## Responsividade e performance

- Grid de duas colunas a partir de 960 px; em telas menores, texto, retrato e episódio são empilhados.
- Imagem inteira em proporção 4:5, largura fluida, `height: auto` e `object-fit: contain`: nenhum crop responsivo do rosto.
- `srcSet`/`sizes` permitem ao navegador escolher a resolução; dimensões explícitas reservam espaço.
- Carregamento `eager`, `fetchPriority="high"` e decodificação assíncrona para a imagem principal. Não foi aplicado lazy ao hero.
- Alt descritivo e textos reais em HTML; nenhuma frase essencial está gravada na imagem.
- Removido o efeito JavaScript de transformação por scroll do hero anterior.
- Otimização WebP quality 82, sem recorte nem retoque, reproduzível por `scripts/optimize-hero.py` com Pillow. Nenhuma dependência nova de produção para a arte.
- A soma das duas resoluções não representa necessariamente o download: o navegador seleciona um candidato apropriado.
- Não foram medidos Core Web Vitals nesta sessão. Ausência de recorte e breakpoints foram verificados no código, não homologados em navegador real.

## Instagram: implementação concluída

### Escolha técnica

Mecanismo oficial: blockquote com permalink público, `https://www.instagram.com/embed.js` e `instgrm.Embeds.process()`. Não há scraping de mídia, API não oficial, token público, cópia manual da interface ou oEmbed consultado no servidor.

A [documentação oficial de oEmbed da Meta](https://developers.facebook.com/docs/instagram-platform/oembed/) descreve o processamento com o SDK. O [script oficial do Instagram](https://www.instagram.com/embed.js) foi consultado para verificar atributos, montagem e limite mínimo de largura. Não é necessário obter metadados de oEmbed para cadastrar os permalinks fornecidos.

### Home e Conteúdos

- Home: cards editoriais próprios, identificação INSTAGRAM, título neutro e CTA “VER NO INSTAGRAM →”. Nenhuma chamada ao SDK externo nesta página.
- `/conteudos#instagram`: seção “Do nosso feed.” com os dois posts reais e frames do Além do Feed.
- Previews opcionais são suportados, mas não foram inventados nem extraídos por scraping: o Instagram limitou o acesso às capas. Os cards atuais usam texto e links reais.
- Os links de saída preservam as URLs fornecidas. O SDK recebe a versão canônica sem query string.

### Componente e manutenção

`InstagramEmbed.tsx` aceita `url`, `title`, `label`, `context`, `preview` e `loadOnView`. Exemplo mínimo:

```tsx
<InstagramEmbed url="https://www.instagram.com/p/DczNevnoCXv/" />
```

Os posts estão em `instagramPosts`, em `src/data/social.ts`. Para adicionar outro, basta cadastrar um item com ID único, label, título e URL. Contexto e preview são opcionais. Se houver capa original fornecida pelo projeto, importe o asset e preencha `preview: { src, alt, width, height }`. Uma imagem com falha é removida sem esconder o link.

### SSR, fallback e limites

- SSR e primeiro render no cliente entregam o mesmo card; sem script, blockquote ou iframe inicial.
- SDK carregado apenas no cliente, próximo à entrada da seção na tela ou por clique. Uma única promessa compartilha a carga entre os posts.
- O SDK controla apenas um nó vazio reservado; o React não tenta reconciliar os filhos modificados pelo Instagram.
- A incorporação só fica visível após o SDK indicar montagem e altura válida. Um evento `load` isolado não é tratado como sucesso.
- Falha de rede, bloqueio, timeout e erro do iframe preservam o card editorial e o link, com tentativa manual.
- Link externo sempre disponível, inclusive depois da incorporação; botão para ocultar o conteúdo incorporado.
- Abaixo dos 326 px disponíveis exigidos pelo SDK, fica o fallback editorial. Não se força um embed cortado em telas estreitas.
- Largura fluida, min-width zero nos containers, quebra de texto e limite do iframe evitam que sua caixa exceda o card.
- Conteúdo interno do iframe é cross-origin. O site não pode inspecionar nem controlar mensagens de indisponibilidade que o próprio Instagram eventualmente mostre. Conta/post públicos, incorporação permitida e acesso à plataforma continuam sendo requisitos externos.
- Não foi possível confirmar a exibição real dos dois posts no navegador desta sessão. Os testes usam o protocolo de montagem simulado, não uma prova de disponibilidade dos posts.

## Auditoria visual por página

| Página/área                 | Decisão                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------- |
| Home                        | Retrato narrativo novo; capa oficial do episódio preservada; cards sociais próprios |
| Episódios e Quem autorizou? | Capa oficial, sem gerar capa fictícia substituta                                    |
| Conteúdos                   | Posts oficiais incorporados; fallback editorial, sem inventar previews              |
| Feed Experimental           | Nenhuma mudança adicional; imagem de ruptura permanece removida                     |
| Sala de Evidências          | Diagrama e tipografia suficientes; sem imagens decorativas                          |
| Entenda e O que pode fazer? | Conteúdo e composição editorial preservados                                         |
| Leis e Jurisprudência       | Legibilidade e fontes documentais, sem ilustrações decorativas                      |
| Mitos e Quem compartilhou?  | Cards e sequência interativa preservados                                            |
| Sobre                       | Texto e identidade existente preservados                                            |

A arte criada e os elementos próprios do site seguem uma mesma direção: **frame → camada → ruptura → descoberta**. A interface do embed permanece oficial e é enquadrada pelo sistema do projeto; não foi recolorida para simular uma peça autoral.

## Pendências técnicas anteriores resolvidas

A checagem completa apontava 24 erros antigos; o novo hero eliminou um, e os 23 restantes foram corrigidos com mudanças pequenas:

- Proteção a entradas ausentes do IntersectionObserver e fallback quando ele não existe.
- Grafo não desenha conexões sem posições válidas.
- Props opcionais respeitam `exactOptionalPropertyTypes`.
- Perguntas e etapas verificam se o item existe antes de renderizar.
- Parâmetro `topic` realmente opcional e acesso de index signature compatível com a configuração TypeScript.

Não foi feita reescrita dos conteúdos jurídicos ou da experiência.

## Arquivos envolvidos

**Hero:** `src/components/HeroFrame.tsx`, `src/styles.css`, os dois WebP, `scripts/optimize-hero.py`.

**Instagram:** `src/components/InstagramEmbed.tsx`, `InstagramPreview.tsx`, `InstagramSection.tsx`, `cards/SocialCard.tsx`, `src/lib/instagram-sdk.ts`, `src/data/social.ts`, `src/data/types.ts`, `src/routes/conteudos.tsx`, `src/styles.css`.

**Tipagens:** `EditorialReveal.tsx`, `QuestionStory.tsx`, `ShareChain.tsx`, `evidence/EvidenceGraph.tsx`, `evidence/EvidenceRoom.tsx`, `src/routes/sala-de-evidencias.tsx`.

**Testes/documentação:** `tests/instagram-embed.test.mjs`, `scripts/verify-public-launch.mjs`, `package.json`/`package-lock.json` (jsdom apenas em desenvolvimento), `src/assets/README.md`, `ATUALIZACAO-PUBLICA.md`, este relatório.

A lista inclui o trabalho do Instagram iniciado antes do novo pedido e já presente no commit local observado; não significa que todos esses arquivos estejam atualmente no diff.

## Verificações

Resultados finais registrados após execução dos comandos:

- `npm run build`: aprovado, cliente + SSR + saída Vercel local.
- `npm run lint`: aprovado, zero erros; 10 avisos preexistentes de Fast Refresh.
- `tsc --noEmit --pretty false`: aprovado, zero erros.
- `npm run test:instagram`: 11 testes aprovados. Cobrem SSR/hydration em StrictMode, SDK único, falha de rede, timeout, erro de iframe, retry, largura insuficiente, modo manual, troca de URL/unmount, preview quebrado e rejeição de URLs inválidas.
- `node scripts/verify-public-launch.mjs http://127.0.0.1:3100`: aprovado nas 13 rotas, executado contra o preview do build de produção. Verificados hero com alt/dimensões/prioridade, duas resoluções WebP abaixo de 40/100 kB, links oficiais, dois posts únicos, ausência de iframes/scripts externos no SSR, capa oficial e 404 correto.
- `git diff --check`: aprovado.
- Marca/favicon e `ExperimentalFeed.tsx`: sem alterações em relação ao HEAD da continuação.
- Browser: ferramenta retornou `apps: []` e `browsers: []`. Inspeção visual interativa em desktop/mobile, disponibilidade real dos embeds e Core Web Vitals ainda requerem homologação no navegador.
- A auditoria de dependências da etapa anterior sinalizou uma vulnerabilidade alta transitiva em `js-yaml`, já existente antes da inclusão de jsdom. Não foi aplicado `npm audit fix` nem alterada a árvore de versões fora do escopo.
- Sem deploy/push realizado pelo assistente.

## Prompt final exato da geração

Ferramenta integrada de geração de imagens; não foi utilizada CLI. Arte nova, sem imagens de referência passadas à ferramenta. Apenas a composição final foi implementada.

```text
Use case: photorealistic-natural.
Asset type: final portrait-format 4:5 website hero campaign artwork for the Brazilian editorial podcast Além do Feed, about image rights, consent, social networks and the human consequences of reposting.
Primary request: "before becoming content, this was a person." A sophisticated photographic editorial collage, with ONE fictional young adult woman as the clear protagonist, a dignified neutral direct gaze, natural curly dark hair, natural medium-brown skin rendered mainly in black and white with authentic pores and understated cloth texture, plain dark clothing. Head and shoulders, fully recognizable face, no celebrity likeness. Her humanity must be instantly readable.
Scene/backdrop: deep matte graphite #111214, generous quiet negative space, subtle digital grain, no physical paper sculpture. Artwork will sit to the right of large ivory HTML typography on a dark website; leave outer margins and the bottom 12 percent calm.
Composition: asymmetrical but restrained. Main portrait occupies the center-right, large face in the upper-middle, complete head with breathing room, shoulders extending down. A single thin ivory open frame partially encloses the portrait, but the hair and one shoulder visibly cross the frame's boundary. At left, two smaller flat rectangular crops of THE EXACT SAME FACE at different scales reappear, offset and partially overlapping, like recirculated digital copies losing their original context. The smaller copies use subdued cobalt duotone, one tighter crop than the other. These are clearly reproduced images, not extra people or disfigured anatomy. Three image planes at most. Tiny understated linking lines suggest circulation; one thin coral line and a very small coral point at the opening suggest consequence, not violence.
Style/medium: high-end contemporary magazine art direction, deliberate photo collage, sober intimate editorial portrait, natural soft side light, moderate contrast, clean edges, minimal texture, young and professional. Human, not dystopian.
Color palette: charcoal graphite and warm ivory dominate; saturated cobalt #2037FF used only in the repeated image planes and one small frame accent; coral #FF665A less than 2 percent.
Text: absolutely NO lettering, no words, no numbers. All labels will be real accessible HTML in the site.
Constraints: preserve a clear coherent face; portrait readable as a thumbnail and on mobile; the same composition must work uncropped at 4:5. No brand logos, no social platform interface copies, no visible phone, no fake like counts, no watermark. No generic stock-photo smile, corporate advertising, justice scales, gavels, locks, shields, courts, neon, cyberpunk, dashboard, sci-fi, glossy 3D, arbitrary abstract rectangles, ripped paper, clutter or giant UI icons. This is a finished editorial image, not a screenshot or a website mockup.
```
