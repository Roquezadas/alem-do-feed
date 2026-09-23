# Assets do Além do Feed

## Atualização EP. 02 — 23/09/2026

- `hero-ep02-isso-e-real-640.webp`: 640 × 800, 32.454 bytes.
- `hero-ep02-isso-e-real-1120.webp`: 1120 × 1400, 79.642 bytes.
- Origem: imagem fornecida pelo usuário, `C:/Users/marce/Downloads/Imagem do Codex 23 de set. de 2026, 18_34_02.png` (1122 × 1402). Otimizada sem recorte, retoque ou alteração de textos. Nenhuma geração de imagem nesta atualização.
- Uso atual: `HeroFrame.tsx`, com `srcSet`, dimensões explícitas, `object-contain`, `loading="eager"`, `fetchPriority="high"` e alt descritivo. A imagem anterior do EP. 01 foi preservada, mas não é mais importada pela Home.
- Capa dos cards e páginas: o EP. 02 reutiliza `ep01-quem-autorizou-spotify.jpg`. O [oEmbed oficial do EP. 02](https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Fepisode%2F1mCK51FFYaM8NnUaKIRmGA) retorna a mesma identidade de imagem `3cd66e4942b52811cea43039` do EP. 01; o [episódio oficial](https://open.spotify.com/episode/1mCK51FFYaM8NnUaKIRmGA) confirma a versão de 640 × 640. Não foi criada uma capa fictícia ou cópia redundante.
- Reprodução: `python scripts/optimize-hero.py CAMINHO_DO_PNG --name hero-ep02-isso-e-real`.
- Logo, favicon, Feed Experimental e assets de outras páginas não foram alterados.

## Histórico dos assets anteriores

- `ep01-quem-autorizou-spotify.jpg`: capa pública retornada pelo Spotify para o EP. 01 — Quem autorizou?, consultada em 15/09/2026. JPEG de 640 × 640, 33.862 bytes; já comprimida, sem necessidade de recompressão. Apresentada inteira, sem recorte, na Home, na lista de episódios e na página do episódio.
  - Metadados: https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Fepisode%2F0DEP800hwGTcQwGc2Y5U7O
  - Arquivo: https://image-cdn-ak.spotifycdn.com/image/ab6765630000ba8a3cd66e4942b52811cea43039
- `hero-quem-autorizou-publicacao-640.webp`: arte fornecida pelo usuário, otimizada para a Home em 640 × 800, 21.358 bytes.
- `hero-quem-autorizou-publicacao-1120.webp`: mesma arte em 1120 × 1400, 44.356 bytes. Origem: `C:/Users/marce/Downloads/c5435bbf-7bb3-4945-97f2-690bffc931c7.png`. Mantida inteira, sem recorte, retoque, mudança de cores ou textos. Implementada em `HeroFrame.tsx` com `srcSet`, dimensões, alt, `fetchPriority="high"` e carregamento eager. A imagem é uma composição editorial estática, não um post real incorporado. Nenhuma nova imagem foi gerada nesta adaptação.
- `hero-pessoa-alem-do-frame-640.webp` e `hero-pessoa-alem-do-frame-1120.webp`: retrato fictício gerado na etapa anterior, agora substituído na Home pela imagem fornecida pelo usuário. Preservado no repositório, sem importação no aplicativo. Direção e prompt históricos em `HERO-E-INSTAGRAM.md`.
- `hero-layers.jpg`: substituída na Home pelo retrato humano; original preservado no repositório, sem importação no aplicativo atual.
- `ep01-cover.jpg`: capa editorial anterior, preservada no repositório, sem importação no site atual. A capa oficial aproxima o bloco do episódio da publicação real no Spotify.
- `feed-rupture-climax.jpg`: preservada no repositório, mas removida da experiência e do bundle de produção a pedido do usuário.

O hero atual usa a arte escolhida pelo usuário. Otimização reproduzível: `python scripts/optimize-hero.py CAMINHO_DO_PNG --name hero-quem-autorizou-publicacao`. O arquivo original e os assets anteriores foram preservados. Os posts reais do Instagram continuam separados desta arte: cards editoriais na Home e incorporação oficial sob demanda de visibilidade em Conteúdos, sem prévias, legendas, datas ou métricas inventadas. A marca dentro da arte enviada foi preservada como parte dela, sem substituir a identidade do header, footer ou favicon.
