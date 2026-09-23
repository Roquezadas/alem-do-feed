import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

// Executar com o servidor local ativo:
// node scripts/verify-public-launch.mjs http://127.0.0.1:3100
const base = process.argv[2] ?? "http://127.0.0.1:3100";
const spotify = "https://open.spotify.com/episode/1mCK51FFYaM8NnUaKIRmGA";
const instagram = "https://www.instagram.com/alemdofeed.podcast/";
const posts = [
  "https://www.instagram.com/p/DczNevnoCXv/?img_index=1",
  "https://www.instagram.com/p/DdCmNBDINfr/?img_index=1",
];
const routes = [
  "/",
  "/episodios",
  "/episodios/quem-autorizou",
  "/episodios/isso-e-real",
  "/conteudos",
  "/feed-experimental",
  "/sala-de-evidencias?topic=direito-a-imagem",
  "/sala-de-evidencias?topic=inteligencia-artificial",
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

const homeDom = new JSDOM(pages.get("/"));
const contentsDom = new JSDOM(pages.get("/conteudos"));
const hero = homeDom.window.document.querySelector(".hero-human");
assert.ok(hero, "Hero humano presente no SSR");
assert.match(hero.querySelector("h1").textContent, /Antes de ser\s*conteúdo,\s*era alguém\./);
assert.doesNotMatch(
  hero.innerHTML,
  /hero-layers|hero-pessoa-alem-do-frame|camada oculta|hero-human-crop-note|COMPOSIÇÃO GERADA COM IA/i,
);
assert.ok(
  [...hero.querySelectorAll("a")].some((link) => link.getAttribute("href") === spotify),
  "Hero leva ao episódio publicado",
);
const portrait = hero.querySelector("img");
assert.equal(portrait.getAttribute("width"), "1120");
assert.equal(portrait.getAttribute("height"), "1400");
assert.equal(portrait.getAttribute("loading"), "eager");
assert.equal(portrait.getAttribute("fetchpriority"), "high");
assert.match(portrait.getAttribute("src"), /hero-ep02-isso-e-real-1120/);
assert.match(portrait.getAttribute("alt"), /Arte editorial.*Isso é real/);
assert.match(hero.querySelector("figcaption").textContent, /COMPOSIÇÃO EDITORIAL/);
const candidates = portrait.getAttribute("srcset").split(",");
assert.equal(candidates.length, 2, "Hero tem duas resoluções");
for (const candidate of candidates) {
  const [src, size] = candidate.trim().split(/\s+/);
  const response = await fetch(new URL(src, base));
  assert.equal(response.status, 200, src);
  assert.match(response.headers.get("content-type"), /image\/webp/);
  const bytes = (await response.arrayBuffer()).byteLength;
  assert.ok(bytes < (size === "640w" ? 40000 : 100000), `Hero otimizado: ${size}`);
}
assert.equal(homeDom.window.document.querySelectorAll(".instagram-embed-card").length, 0);
assert.equal(contentsDom.window.document.querySelectorAll(".instagram-embed-card").length, 2);
for (const dom of [homeDom, contentsDom]) {
  assert.equal(dom.window.document.querySelectorAll('script[src*="instagram.com"]').length, 0);
  dom.window.close();
}

for (const route of ["/", "/episodios", "/episodios/quem-autorizou", "/episodios/isso-e-real"]) {
  const html = pages.get(route);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `Título principal: ${route}`);
  const ep01 = route === "/episodios/quem-autorizou";
  assert.ok(html.includes(ep01 ? "8 min 17 s" : "11 min 01 s"), `Duração confirmada: ${route}`);
  assert.doesNotMatch(html, /EM PRODUÇÃO|PRÓXIMO CAPÍTULO/, route);
  assert.match(
    html,
    /<img[^>]+ep01-quem-autorizou-spotify[^>]+width="640"[^>]+height="640"/,
    `Capa com dimensões: ${route}`,
  );
  assert.ok(
    html.includes(ep01 ? "topic=direito-a-imagem" : "topic=inteligencia-artificial"),
    `Deep-link: ${route}`,
  );
}

const archive = new JSDOM(pages.get("/episodios"));
assert.deepEqual(
  [...archive.window.document.querySelectorAll(".episode-card h3")].map((h) => h.textContent),
  ["ISSO É REAL?", "QUEM AUTORIZOU?"],
);
archive.window.close();

for (const [slug, id, title] of [
  ["isso-e-real", "1mCK51FFYaM8NnUaKIRmGA", "ISSO É REAL?"],
  ["quem-autorizou", "0DEP800hwGTcQwGc2Y5U7O", "QUEM AUTORIZOU?"],
]) {
  const dom = new JSDOM(pages.get(`/episodios/${slug}`));
  const doc = dom.window.document;
  assert.equal(doc.querySelector("h1").textContent, title);
  assert.equal(
    doc.querySelectorAll('link[rel="canonical"]').length,
    1,
    "Canonical único no detalhe",
  );
  assert.ok(
    [...doc.querySelectorAll("main a")].some(
      (a) => a.href === `https://open.spotify.com/episode/${id}`,
    ),
  );
  assert.equal(
    doc.querySelector('link[rel="canonical"]').href,
    `https://alemdofeed.vercel.app/episodios/${slug}`,
  );
  assert.equal(
    doc.querySelector('meta[property="og:url"]').content,
    `https://alemdofeed.vercel.app/episodios/${slug}`,
  );
  assert.ok(doc.querySelector('meta[property="og:image"]').content.startsWith("https://"));
  assert.equal(doc.querySelectorAll("[data-spotify-status='idle']").length, 1);
  assert.equal(doc.querySelectorAll('script[src*="spotify.com"]').length, 0);
  assert.ok(doc.querySelector('a[href="/episodios"]'));
  dom.window.close();
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
console.log(
  "OK: hero responsivo/otimizado, Instagram client-only, links, capas, metadados, 404 e Feed preservado.",
);
console.log("Estes testes não substituem inspeção visual nem teste interativo no navegador.");
