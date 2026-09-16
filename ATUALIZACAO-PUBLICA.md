# Atualização pública — Além do Feed

> Registro da etapa de 15/09. A continuação de 16/09 substitui o hero, acrescenta os embeds oficiais do Instagram e conclui as verificações de TypeScript. Consulte [HERO-E-INSTAGRAM.md](HERO-E-INSTAGRAM.md) para o estado atualizado; as observações abaixo sobre ausência de imagens geradas, SDK e dependências são históricas.

Implementação local em 15/09/2026, no projeto `C:/Users/marce/AlemDoFeed/camadas-legais`. Stack, identidade e logo mantidas. Não foi feito deploy, push ou commit.

## Feed Experimental e logo

Removidos apenas o import da imagem de ruptura, a figura com sua legenda e as regras CSS exclusivas dessa figura. Uma comparação automatizada com o Git confirmou que todo o restante de `ExperimentalFeed.tsx` permanece idêntico: estados, cenários, escolhas, consequências, navegação e marca. Os componentes de marca e o favicon também foram comparados com o Git e estão intactos.

## Arquivos modificados

- `src/components/ExperimentalFeed.tsx`: remoção da figura de ruptura.
- `src/components/HeroFrame.tsx`: anúncio do episódio publicado, Spotify e Instagram; ajuste de escala do título do episódio.
- `src/components/Header.tsx`: links oficiais no menu e breakpoint para evitar navegação comprimida.
- `src/components/Footer.tsx`: Spotify e Instagram oficiais, link para a Sala de Evidências e disposição responsiva.
- `src/components/Section.tsx`: suporte a título principal semântico e contraste dos pequenos rótulos nas seções escuras.
- `src/components/cards/EpisodeCard.tsx`: capa oficial, edição publicada, descrição, Spotify, análise e evidências.
- `src/components/cards/SocialCard.tsx`: cards editoriais dos dois posts reais.
- `src/components/cards/FeedCard.tsx`: data com fuso UTC explícito para consistência entre servidor e cliente e metadados com quebra de linha.
- `src/data/episodes.ts`: links, capa, identificação Spotify, duração e data verificadas.
- `src/data/feed.ts`: episódio disponível; remoção dos quatro posts demonstrativos e dos links antigos; textos neutros no lugar de alegações de participação do público sem confirmação.
- `src/data/types.ts`: campos da integração pública e tipos sociais correspondentes aos dados disponíveis.
- `src/routes/index.tsx`: destaque do episódio movido para logo após o hero, sem duplicar a seção; Instagram real, remoção do placeholder EP. 02 e atualização de metadados.
- `src/routes/episodios.tsx`: protagonismo do primeiro episódio e remoção do anúncio provisório do próximo.
- `src/routes/episodios/$slug.tsx`: capa, Spotify, player sob demanda, metadados, evidências e retorno 404 para slug inexistente.
- `src/routes/conteudos.tsx`: publicações reais junto ao feed editorial.
- `src/routes/__root.tsx`: remoção de identificador de rede social não confirmado.
- `src/styles.css`: estilos das integrações e remoção apenas do CSS da figura no Feed Experimental.

## Arquivos criados

- `src/data/social.ts`: fonte central dos links oficiais e dos dois posts.
- `src/components/InstagramSection.tsx`: seção reutilizada na Home e em Conteúdos.
- `src/components/SpotifyEmbed.tsx`: player oficial, carregado por clique.
- `src/assets/ep01-quem-autorizou-spotify.jpg`: capa oficial local.
- `src/assets/README.md`: procedência e situação dos assets.
- `scripts/verify-public-launch.mjs`: verificações automatizadas de SSR, links, metadados e assets.
- `ATUALIZACAO-PUBLICA.md`: este relatório.

## Onde o YouTube foi removido

Footer, dados sociais, cards sociais e página individual do episódio. `YouTubeEmbed.tsx` foi substituído por `SpotifyEmbed.tsx` após confirmar seu único consumidor; o arquivo antigo continua recuperável pelo histórico do Git. A busca em `src` e os testes do HTML não encontraram referências públicas ao YouTube. O TikTok provisório também saiu.

A pasta histórica `alem-do-feed-sala-de-evidencias` não participa do build do aplicativo e foi preservada, sem reescrever sua cópia antiga da Home.

## Como o Spotify foi integrado

O link oficial do EP. 01 está no hero, no destaque da Home, na listagem, na página do episódio, no menu e no footer. O player oficial fica somente na página do episódio e só é carregado ao clicar. O link direto permanece disponível mesmo se o player não funcionar.

O Spotify informou duração de 497.358 ms (8 min 17 s) e publicação em `2026-09-15T02:11:00Z`; esses dados substituem os valores provisórios. A página também aponta para `/sala-de-evidencias?topic=direito-a-imagem` e para a experiência, sem alterar o interior dela.

Fonte: [episódio oficial](https://open.spotify.com/episode/0DEP800hwGTcQwGc2Y5U7O), metadados públicos do player e oEmbed.

## Como o Instagram foi integrado e os posts exibidos

Perfil oficial no hero, menu, footer e seções de Instagram da Home e de Conteúdos. Dois cards dão acesso exatamente aos dois links fornecidos. São identificados de forma neutra como Publicação 01 e Publicação 02.

A tentativa de recuperar os previews foi limitada pelo Instagram. Não foram inventadas imagens, legendas, datas, formatos ou métricas. Não há script de embed do Instagram nem dependência da disponibilidade externa para renderizar os cards.

## Capa do Spotify, imagens geradas e assets antigos

A capa oficial foi obtida e inspecionada: marca em preto e branco, JPEG de 640 × 640 e 33.862 bytes. Foi usada inteira na Home, na listagem e no detalhe do episódio; seu endereço público absoluto é usado no Open Graph do episódio.

Não foi necessário gerar imagens. A capa anterior `ep01-cover.jpg` foi substituída no uso, mas preservada no repositório. `hero-layers.jpg` permanece na Home. `feed-rupture-climax.jpg` foi retirado da experiência e não entra no bundle; o arquivo original permanece guardado. Nenhuma alteração foi feita na logo do header, footer, experiência ou favicon.

## Decisões de UX e performance

- Evolução do bloco existente do episódio, agora próximo do início da Home, sem duplicação nem episódio futuro fictício.
- Imagem local já comprimida, dimensões explícitas, proporção quadrada, sem corte da marca e carregamento lazy abaixo da abertura.
- Zero iframes no HTML inicial; espaço de 152 px reservado para o player, antes e depois da ativação.
- Cards sociais leves, links reais, sem chamadas externas na renderização.
- Títulos semânticos, links identificáveis, contraste dos rótulos em fundo escuro e metadados de publicação atualizados.
- Nenhuma dependência adicionada e nenhuma mudança de stack.

## Testes de responsividade

Revisão de código realizada: cards em coluna até 1024 px; grid social de duas colunas a partir de 768 px; menu completo somente a partir de 1280 px; footer em colunas a partir de 1024 px; capas com `object-contain`; botões e metadados com quebra; player com largura fluida e altura estável.

Não foi possível fazer inspeção visual em mobile/tablet/desktop ou executar interações no navegador: a ferramenta retornou inventário vazio de navegadores e apps. Essa validação visual, o comportamento do player após clique e medições de Core Web Vitals permanecem pendentes. Os testes de SSR não substituem esses testes.

## Build e verificações

- `npm run build`: aprovado, incluindo cliente, SSR e saída Vercel.
- `npm run lint`: aprovado, zero erros e 10 avisos de Fast Refresh.
- `node scripts/verify-public-launch.mjs http://127.0.0.1:3100`: aprovado nas 13 rotas, com links oficiais, posts únicos, metadados, capa local menor que 50 kB, ausência de embeds iniciais, ausência de YouTube e 404 para episódio inexistente.
- `git diff --check`: aprovado.
- Comparação específica do Feed Experimental e da marca com o Git: aprovada.
- Checagem adicional `tsc --noEmit`: ainda encontra 24 erros preexistentes. Comparação com os arquivos de HEAD carregados em memória: 25 antes, 24 agora, nenhum erro novo. As pendências estão em componentes editoriais/evidências e tipagens de links já existentes; não foi feita uma correção geral fora do escopo.

O build não é equivalente a uma checagem completa de TypeScript nem a uma homologação visual. As alterações estão prontas para revisão local e posterior publicação.
