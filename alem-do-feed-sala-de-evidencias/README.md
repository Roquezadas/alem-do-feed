# Sala de Evidências — pacote de implementação

Este pacote contém a implementação da nova experiência "Sala de Evidências" do Além do Feed.

## Arquivos novos
- `src/components/evidence/EvidenceRoom.tsx`
- `src/components/evidence/EvidenceGraph.tsx`
- `src/components/evidence/EvidenceNode.tsx`
- `src/components/evidence/EvidenceDetail.tsx`
- `src/components/evidence/EvidenceFilters.tsx`
- `src/components/evidence/EvidenceLegend.tsx`
- `src/components/evidence/EvidenceTeaser.tsx`
- `src/lib/evidenceGraph.ts`
- `src/routes/sala-de-evidencias.tsx`

## Arquivos atualizados
- `src/components/Header.tsx`
- `src/routes/index.tsx`
- `src/styles.css`
- `src/routeTree.gen.ts`

## O que foi implementado
- rota `/sala-de-evidencias`;
- dados cruzados a partir de `topics.ts`, `laws.ts`, `cases.ts` e `episodes.ts`;
- grafo visual em SVG com conexões semânticas;
- filtros por tipo;
- busca dentro do tópico;
- seleção de evidências;
- painel de detalhes;
- links para fontes oficiais, casos e episódios;
- seletor de tópicos;
- deep link via `?topic=slug`;
- botão de copiar a conexão atual;
- adaptação mobile em formato de lista;
- modo expandido;
- teaser na Home;
- item no menu principal.

## Aplicação

Copie os arquivos deste pacote para a raiz do seu projeto, preservando as pastas. O `routeTree.gen.ts` é gerado pelo TanStack Router e pode ser regenerado automaticamente no próximo dev/build; ele foi incluído apenas para manter a árvore de rotas consistente imediatamente.

Depois rode:

```bash
npm run build
```

Se o projeto já estiver usando o fluxo GitHub → Vercel:

```bash
git add .
git commit -m "Adiciona Sala de Evidências"
git push origin main
```
