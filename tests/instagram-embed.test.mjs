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
import { createRoot, hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

const repo = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const url = "https://www.instagram.com/p/DczNevnoCXv/?img_index=1";
const otherUrl = "https://www.instagram.com/p/DdCmNBDINfr/?img_index=1";
const sdkUrl = "https://www.instagram.com/embed.js";
const h = React.createElement;
let dispose;

// Transpila somente os módulos locais testados, em memória, sem alterar o build.
function createLoader() {
  const cache = new Map();
  function load(filename) {
    const resolved = [filename, `${filename}.ts`, `${filename}.tsx`].find(existsSync);
    assert.ok(resolved, filename);
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
  return (name) => load(path.join(repo, "src", name));
}

async function setup({ width = 390, hydration = false, props = [{ url }], strict = false } = {}) {
  const dom = new JSDOM("<!doctype html><div id='root'></div>", {
    url: "https://alemdofeed.test/conteudos",
  });
  // Nenhum recurso externo ou script do Instagram é executado no ambiente de teste.
  const { window } = dom;
  const io = [];
  const ro = [];
  class IntersectionObserverMock {
    constructor(callback) {
      this.callback = callback;
      this.active = true;
      io.push(this);
    }
    observe(target) {
      this.target = target;
    }
    disconnect() {
      this.active = false;
    }
  }
  class ResizeObserverMock {
    constructor(callback) {
      this.callback = callback;
      this.active = true;
      ro.push(this);
    }
    observe() {}
    disconnect() {
      this.active = false;
    }
  }
  Object.defineProperty(window.HTMLElement.prototype, "clientWidth", {
    get: () => width,
    configurable: true,
  });
  const originals = new Map();
  const values = {
    window,
    document: window.document,
    HTMLElement: window.HTMLElement,
    MutationObserver: window.MutationObserver,
    IntersectionObserver: IntersectionObserverMock,
    ResizeObserver: ResizeObserverMock,
    IS_REACT_ACT_ENVIRONMENT: true,
  };
  for (const [key, value] of Object.entries(values)) {
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
  }
  let now = 0;
  let timerId = 0;
  const timers = new Map();
  window.setTimeout = (callback, delay) => {
    const id = ++timerId;
    timers.set(id, { at: now + delay, callback });
    return id;
  };
  window.clearTimeout = (id) => timers.delete(id);
  const load = createLoader();
  const { InstagramEmbed } = load("components/InstagramEmbed.tsx");
  const container = window.document.getElementById("root");
  const recoverable = [];
  let root;
  const tree = (items) =>
    h(
      strict ? React.StrictMode : React.Fragment,
      null,
      ...items.map((item, i) => h(InstagramEmbed, { key: i, ...item })),
    );
  if (hydration) {
    container.innerHTML = renderToString(tree(props));
    assert.equal(window.document.scripts.length, 0, "SSR não insere script");
    assert.equal(
      container.querySelectorAll("iframe, blockquote").length,
      0,
      "SSR só contém fallback editorial",
    );
    await act(async () => {
      root = hydrateRoot(container, tree(props), {
        onRecoverableError: (error) => recoverable.push(error),
      });
    });
  } else {
    root = createRoot(container);
    await act(async () => root.render(tree(props)));
  }
  dispose = async () => {
    await act(async () => root.unmount());
    assert.equal(
      container.querySelectorAll("iframe, blockquote").length,
      0,
      "Limpeza do DOM externo",
    );
    window.close();
    for (const [key, value] of originals) {
      if (value) Object.defineProperty(globalThis, key, value);
      else delete globalThis[key];
    }
  };

  return {
    window,
    container,
    load,
    recoverable,
    script: () => window.document.querySelector(`script[src="${sdkUrl}"]`),
    cards: () => [...container.querySelectorAll(".instagram-embed-card")],
    async view() {
      await act(async () => {
        for (const observer of io)
          if (observer.active)
            observer.callback([{ isIntersecting: true, target: observer.target }]);
      });
    },
    async resize(next) {
      await act(async () => {
        width = next;
        for (const observer of ro) if (observer.active) observer.callback([]);
      });
    },
    async render(items) {
      await act(async () => root.render(tree(items)));
    },
    async click(text) {
      const button = [...container.querySelectorAll("button")].find(
        (item) => item.textContent === text,
      );
      assert.ok(button, text);
      await act(async () =>
        button.dispatchEvent(new window.MouseEvent("click", { bubbles: true })),
      );
    },
    async tick(ms) {
      await act(async () => {
        now += ms;
        for (const [id, timer] of timers)
          if (timer.at <= now) {
            timers.delete(id);
            timer.callback();
          }
      });
    },
    async installSdk({ mounted = true, throwError = false } = {}) {
      await act(async () => {
        window.instgrm = {
          Embeds: {
            process() {
              if (throwError) throw new Error("SDK blocked");
              for (const quote of window.document.querySelectorAll("blockquote.instagram-media")) {
                const iframe = window.document.createElement("iframe");
                iframe.className = `instagram-media${mounted ? " instagram-media-rendered" : ""}`;
                iframe.setAttribute("height", mounted ? "620" : "0");
                iframe.src = `${quote.getAttribute("data-instgrm-permalink")}embed/captioned/`;
                quote.replaceWith(iframe);
              }
            },
          },
        };
        window.document
          .querySelector(`script[src="${sdkUrl}"]`)
          ?.dispatchEvent(new window.Event("load"));
      });
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

test("permite somente permalinks Instagram HTTPS e normaliza parâmetros", () => {
  const { getInstagramPermalink } = createLoader()("lib/instagram-sdk.ts");
  assert.equal(getInstagramPermalink(url), "https://www.instagram.com/p/DczNevnoCXv/");
  assert.equal(
    getInstagramPermalink("https://instagram.com/reel/ABC_123-/#x"),
    "https://www.instagram.com/reel/ABC_123-/",
  );
  for (const invalid of [
    "javascript:alert(1)",
    "https://instagram.com.evil.test/p/ABC/",
    "https://evil.test/p/ABC/",
    "https://www.instagram.com/direct/inbox/",
    "http://instagram.com/p/ABC/",
    "https://user:pass@instagram.com/p/ABC/",
    "https://instagram.com:123/p/ABC/",
  ])
    assert.equal(getInstagramPermalink(invalid), null);
});

test("SSR e hidratação em StrictMode sem scripts antecipados; dois posts compartilham SDK", async () => {
  const app = await setup({ hydration: true, strict: true, props: [{ url }, { url: otherUrl }] });
  assert.deepEqual(app.recoverable, []);
  assert.equal(app.script(), null);
  await app.view();
  assert.equal(app.window.document.querySelectorAll(`script[src="${sdkUrl}"]`).length, 1);
  await app.installSdk();
  assert.deepEqual(
    app.cards().map((card) => card.dataset.status),
    ["ready", "ready"],
  );
  assert.equal(app.container.querySelectorAll("iframe[title]").length, 2);
  assert.equal(
    app.container.querySelectorAll("a[href*='?img_index=1']").length,
    2,
    "Fallback continua acessível com embed pronto",
  );
});

test("erro de rede preserva o card e permite uma nova tentativa", async () => {
  const app = await setup();
  await app.view();
  await act(async () => app.script().dispatchEvent(new app.window.Event("error")));
  assert.equal(app.cards()[0].dataset.status, "fallback");
  assert.equal(app.script(), null);
  assert.equal(app.container.querySelector("a").href, url);
  await app.click("TENTAR NOVAMENTE");
  assert.ok(app.script());
  await app.installSdk();
  assert.equal(app.cards()[0].dataset.status, "ready");
});

test("iframe onload sem confirmação do SDK não é sucesso; timeout mantém fallback", async () => {
  const app = await setup();
  await app.view();
  await app.installSdk({ mounted: false });
  await act(async () =>
    app.container.querySelector("iframe").dispatchEvent(new app.window.Event("load")),
  );
  assert.equal(app.cards()[0].dataset.status, "loading");
  await app.tick(25000);
  assert.equal(app.cards()[0].dataset.status, "fallback");
  assert.equal(app.container.querySelector("iframe"), null);
  assert.equal(app.container.querySelector("a").href, url);
});

test("SDK que não responde expira sem deixar espaço vazio", async () => {
  const app = await setup();
  await app.view();
  await app.tick(12000);
  assert.equal(app.cards()[0].dataset.status, "fallback");
  assert.equal(app.script(), null);
  assert.match(app.container.textContent, /VER PUBLICAÇÃO NO INSTAGRAM/);
});

test("exception no SDK e erro posterior no iframe retornam ao card", async () => {
  const app = await setup();
  await app.view();
  await app.installSdk({ throwError: true });
  assert.equal(app.cards()[0].dataset.status, "fallback");
  await app.installSdk();
  await app.click("TENTAR NOVAMENTE");
  assert.equal(app.cards()[0].dataset.status, "ready");
  await act(async () =>
    app.container.querySelector("iframe").dispatchEvent(new app.window.Event("error")),
  );
  assert.equal(app.cards()[0].dataset.status, "fallback");
});

test("largura insuficiente usa card; aumento de largura habilita incorporação", async () => {
  const app = await setup({ width: 286 }); // viewport 320 com gutters e bordas
  await app.view();
  assert.equal(app.script(), null);
  assert.equal(app.container.querySelector("button"), null);
  assert.equal(app.container.querySelector("a").href, url);
  await app.resize(341); // viewport 375
  await app.view();
  await app.installSdk();
  assert.equal(app.cards()[0].dataset.status, "ready");
  await app.resize(286);
  assert.equal(app.container.querySelector("iframe"), null);
  assert.equal(app.container.querySelector(".instagram-embed-slot").dataset.ready, "false");
});

test("modo manual não carrega ao entrar na viewport; pode ocultar e reabrir", async () => {
  const app = await setup({ props: [{ url, loadOnView: false }] });
  await app.view();
  assert.equal(app.script(), null);
  await app.click("CARREGAR PUBLICAÇÃO");
  await app.installSdk();
  await app.click("OCULTAR INCORPORAÇÃO");
  assert.equal(app.container.querySelector("iframe"), null);
  await app.click("CARREGAR PUBLICAÇÃO");
  assert.equal(app.cards()[0].dataset.status, "ready");
  assert.equal(app.window.document.scripts.length, 1);
});

test("troca de URL durante carga não deixa iframe antigo nem quebra unmount", async () => {
  const app = await setup();
  await app.view();
  await app.render([{ url: otherUrl }]);
  await app.view();
  await app.installSdk();
  assert.equal(app.container.querySelectorAll("iframe").length, 1);
  assert.ok(app.container.querySelector("iframe").src.includes("DdCmNBDINfr"));
  await app.render([]);
  assert.equal(app.container.querySelector("iframe"), null);
  await app.render([{ url }]);
  await app.view();
  assert.equal(app.cards()[0].dataset.status, "ready");
  assert.equal(app.window.document.scripts.length, 1);
});

test("preview indisponível é removido sem quebrar o fallback", async () => {
  const app = await setup({
    props: [
      {
        url,
        preview: {
          src: "/verified-preview.jpg",
          alt: "Capa verificada",
          width: 1080,
          height: 1350,
        },
      },
    ],
  });
  const img = app.container.querySelector("img");
  assert.equal(img.getAttribute("loading"), "lazy");
  await act(async () => img.dispatchEvent(new app.window.Event("error")));
  assert.equal(app.container.querySelector("img"), null);
  assert.equal(app.container.querySelector("a").href, url);
});

test("URL inválida não dispara requisição externa nem vira link inseguro", async () => {
  const app = await setup({ props: [{ url: "javascript:alert(1)" }] });
  await app.view();
  assert.equal(app.script(), null);
  assert.equal(app.container.querySelector("a").href, "https://www.instagram.com/");
});
