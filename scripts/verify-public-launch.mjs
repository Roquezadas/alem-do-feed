import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Executar com o servidor local ativo:
// node scripts/verify-public-launch.mjs http://127.0.0.1:3100
const base = process.argv[2] ?? "http://127.0.0.1:3100";
const spotify =
  "https://open.spotify.com/episode/0DEP800hwGTcQwGc2Y5U7O?si=m5MWME2CQ0SsQNIPrj188w&utm_source=copy-link";
const instagram = "https://www.instagram.com/alemdofeed.podcast/";
const posts = [
  "https://www.instagram.com/p/DczNevnoCXv/?img_index=1",
  "https://www.instagram.com/p/DdCmNBDINfr/?img_index=1",
];
const routes = [
  "/",
  "/episodios",
  "/episodios/quem-autorizou",
  "/conteudos",
  "/feed-experimental",
  "/sala-de-evidencias?topic=direito-a-imagem",
  "/o-que-pode-fazer",
  "/entenda",
  "/leis",
  "/jurisprudencia",
  "/mitos",
  "/quem-compartilhou",
  "/sobre",
];
const pages = new Map();

for (const route of routes) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, route);
  const html = (await response.text()).replaceAll("&amp;", "&");
  pages.set(route, html);
  assert.doesNotMatch(html, /youtube|youtu\.be|tiktok|feed-rupture-climax/i, route);
  assert.doesNotMatch(html, /<iframe\b/i, `Sem embeds na abertura: ${route}`);
  if (route !== "/feed-experimental") {
    assert.ok(html.includes(`href="${spotify}"`), `Spotify: ${route}`);
    assert.ok(html.includes(`href="${instagram}"`), `Instagram: ${route}`);
  }
  console.log(`OK SSR ${route}`);
}

for (const route of ["/", "/conteudos"]) {
  for (const post of posts) {
    assert.equal(pages.get(route).split(`href="${post}"`).length - 1, 1, `Post único: ${route}`);
  }
}

for (const route of ["/", "/episodios", "/episodios/quem-autorizou"]) {
  const html = pages.get(route);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `Título principal: ${route}`);
  assert.ok(html.includes("8 min 17 s"), `Duração confirmada: ${route}`);
  assert.doesNotMatch(html, /EM PRODUÇÃO|EP\. 02|PRÓXIMO CAPÍTULO/, route);
  assert.match(
    html,
    /<img[^>]+ep01-quem-autorizou-spotify[^>]+width="640"[^>]+height="640"/,
    `Capa com dimensões: ${route}`,
  );
  assert.ok(html.includes("topic=direito-a-imagem"), `Deep-link: ${route}`);
}

const detail = pages.get("/episodios/quem-autorizou");
assert.ok(detail.includes("Carregar player do Spotify:"));
assert.match(detail, /<meta property="og:description" content="Ouça no Spotify/);
const cover = detail.match(/<img[^>]+src="([^"]*ep01-quem-autorizou-spotify[^"]*)"/)[1];
const image = await fetch(new URL(cover, base));
assert.equal(image.status, 200);
assert.match(image.headers.get("content-type"), /image\/jpeg/);
assert.ok((await image.arrayBuffer()).byteLength < 50000, "Capa local menor que 50 kB");

const missing = await fetch(new URL("/episodios/episodio-inexistente", base));
assert.equal(missing.status, 404, "Slug inexistente retorna 404");
const feedSource = await readFile(
  new URL("../src/components/ExperimentalFeed.tsx", import.meta.url),
  "utf8",
);
assert.doesNotMatch(feedSource, /experimental-climax-art|feedRuptureClimax/);
const playerSource = await readFile(
  new URL("../src/components/SpotifyEmbed.tsx", import.meta.url),
  "utf8",
);
assert.match(playerSource, /useState\(false\)/);
assert.match(playerSource, /active \? \(/);
assert.match(playerSource, /onClick=\{\(\) => setActive\(true\)\}/);
console.log(
  "OK: links, posts únicos, capa local, metadados, 404, SSR sem embeds e remoção da imagem.",
);
console.log("Estes testes não substituem inspeção visual nem teste interativo no navegador.");
