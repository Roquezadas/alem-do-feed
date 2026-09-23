import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { runInThisContext } from "node:vm";
import ts from "typescript";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

const repo = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const cache = new Map();
function load(filename) {
  const resolved = [filename, `${filename}.ts`, `${filename}.tsx`].find(existsSync);
  assert.ok(resolved, filename);
  if (/\.(jpg|webp)$/.test(resolved)) return { default: resolved };
  if (cache.has(resolved)) return cache.get(resolved).exports;
  const module = { exports: {} };
  cache.set(resolved, module);
  const code = ts.transpileModule(readFileSync(resolved, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: resolved,
  }).outputText;
  const localRequire = (name) =>
    name.startsWith("@/")
      ? load(path.join(repo, "src", name.slice(2)))
      : name.startsWith(".")
        ? load(path.resolve(path.dirname(resolved), name))
        : require(name);
  runInThisContext(`(function(require, module, exports) {${code}\n})`, { filename: resolved })(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}
const { SpotifyEmbed } = load(path.join(repo, "src/components/SpotifyEmbed.tsx"));
const { episodes, latestEpisode } = load(path.join(repo, "src/data/episodes.ts"));
let dispose;

async function setup() {
  const dom = new JSDOM("<!doctype html><div id='root'></div>", { url: "https://alemdofeed.test" });
  const { window } = dom;
  const originals = new Map();
  for (const [key, value] of Object.entries({
    window,
    document: window.document,
    IS_REACT_ACT_ENVIRONMENT: true,
  })) {
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  const timers = new Map();
  let serial = 0;
  window.setTimeout = (fn) => {
    timers.set(++serial, fn);
    return serial;
  };
  window.clearTimeout = (id) => timers.delete(id);
  const container = window.document.getElementById("root");
  const tree = (ep) =>
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(SpotifyEmbed, {
        episodeId: ep.spotifyId,
        title: ep.title,
        url: ep.spotifyUrl,
      }),
    );
  container.innerHTML = renderToString(tree(latestEpisode));
  assert.equal(container.querySelector("iframe"), null, "SSR não conecta a serviços externos");
  const errors = [];
  let root;
  await act(async () => {
    root = hydrateRoot(container, tree(latestEpisode), {
      onRecoverableError: (error) => errors.push(error),
    });
  });
  dispose = async () => {
    await act(async () => root.unmount());
    assert.equal(timers.size, 0, "Timers limpos ao desmontar");
    window.close();
    for (const [key, value] of originals) {
      if (value) Object.defineProperty(globalThis, key, value);
      else delete globalThis[key];
    }
  };
  return {
    container,
    errors,
    timers,
    status: () => container.firstElementChild.dataset.spotifyStatus,
    async click(text = "CARREGAR PLAYER") {
      const button = [...container.querySelectorAll("button")].find((b) =>
        b.textContent.includes(text),
      );
      assert.ok(button, text);
      await act(async () =>
        button.dispatchEvent(new window.MouseEvent("click", { bubbles: true })),
      );
    },
    async frameEvent(type) {
      await act(async () =>
        container.querySelector("iframe").dispatchEvent(new window.Event(type)),
      );
    },
    async expire() {
      await act(async () => {
        for (const [id, fn] of timers) {
          timers.delete(id);
          fn();
        }
      });
    },
    async episode(ep) {
      await act(async () => root.render(tree(ep)));
    },
  };
}

afterEach(async () => {
  if (dispose) {
    const close = dispose;
    dispose = undefined;
    await close();
  }
});

test("Spotify: SSR e hidratação StrictMode sem iframe ou SDK antes do clique", async () => {
  const app = await setup();
  assert.deepEqual(app.errors, []);
  assert.equal(app.status(), "idle");
  assert.equal(app.container.querySelector("iframe, script"), null);
  assert.equal(app.container.querySelector("a").href, latestEpisode.spotifyUrl);
});

test("Spotify: carga sob demanda, dimensões fluidas e link de fallback permanente", async () => {
  const app = await setup();
  await app.click();
  const frame = app.container.querySelector("iframe");
  assert.ok(frame.src.includes(`/embed/episode/${latestEpisode.spotifyId}`));
  assert.equal(frame.title, `Spotify: ${latestEpisode.title}`);
  assert.equal(frame.getAttribute("width"), "100%");
  assert.equal(frame.getAttribute("height"), "152");
  assert.equal(frame.getAttribute("loading"), "lazy");
  assert.equal(app.status(), "loading");
  await app.frameEvent("load");
  assert.equal(app.status(), "loaded");
  assert.equal(app.timers.size, 0);
  assert.equal(app.container.querySelector("a").href, latestEpisode.spotifyUrl);
  await app.click("FECHAR PLAYER");
  assert.equal(app.container.querySelector("iframe"), null);
});

test("Spotify: falha local do iframe mantém página e permite tentar de novo", async () => {
  const app = await setup();
  await app.click();
  await app.frameEvent("error");
  assert.equal(app.status(), "fallback");
  assert.equal(app.container.querySelector("iframe"), null);
  assert.equal(app.container.querySelector("a").href, latestEpisode.spotifyUrl);
  await app.click("TENTAR CARREGAR");
  assert.equal(app.status(), "loading");
  await app.frameEvent("load");
  assert.deepEqual(app.errors, []);
});

test("Spotify: ausência de resposta expira e preserva alternativa sem recarregar a página", async () => {
  const app = await setup();
  await app.click();
  await app.expire();
  assert.equal(app.status(), "fallback");
  assert.equal(app.container.querySelector("iframe"), null);
  assert.match(app.container.textContent, /Player indisponível/);
  assert.ok(app.container.querySelector("a"));
});

test("Spotify: troca de episódio desmonta iframe antigo e cancela timeout", async () => {
  const app = await setup();
  await app.click();
  await app.episode(episodes[1]);
  assert.equal(app.status(), "idle");
  assert.equal(app.container.querySelector("iframe"), null);
  assert.equal(app.timers.size, 0);
  assert.equal(app.container.querySelector("a").href, episodes[1].spotifyUrl);
  await app.click();
  assert.ok(app.container.querySelector("iframe").src.includes(episodes[1].spotifyId));
});

test("EP. 02: dados, ordenação, termos buscáveis e relações existentes consistentes", () => {
  const { topics } = load(path.join(repo, "src/data/topics.ts"));
  const { laws } = load(path.join(repo, "src/data/laws.ts"));
  const { cases } = load(path.join(repo, "src/data/cases.ts"));
  const { social } = load(path.join(repo, "src/data/social.ts"));
  const { buildEvidenceGraph } = load(path.join(repo, "src/lib/evidenceGraph.ts"));
  assert.deepEqual(
    episodes.map((ep) => ep.slug),
    ["isso-e-real", "quem-autorizou"],
  );
  assert.equal(social.spotify, latestEpisode.spotifyUrl);
  assert.equal(latestEpisode.duration, "11 min 01 s");
  assert.equal(episodes[1].duration, "8 min 17 s");
  assert.equal(latestEpisode.coverImage, episodes[1].coverImage);
  for (const ep of episodes) {
    assert.ok(ep.lawIds.every((id) => laws.some((law) => law.id === id)));
    assert.ok(ep.caseIds.every((id) => cases.some((item) => item.id === id)));
    assert.ok(topics.some((t) => t.slug === ep.evidenceTopicSlug && t.episodeIds.includes(ep.id)));
    assert.ok(
      buildEvidenceGraph(ep.evidenceTopicSlug).nodes.some((node) => node.id === `episode:${ep.id}`),
    );
  }
  // Mesmos campos e normalização usados pelo índice existente do SearchDialog.
  const searchable =
    `${latestEpisode.title} ${latestEpisode.subtitle} ${latestEpisode.description} ${latestEpisode.tags.join(" ")}`
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  for (const query of ["isso e real?", "deepfake", "inteligencia artificial"])
    assert.ok(searchable.includes(query));
});
