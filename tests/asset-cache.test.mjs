import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Executa a entrada real, transpila em memória e isola só o handler SSR e o logger.
// O build/preview também é verificado por scripts/verify-asset-cache.mjs.
function serverFixture(responseFactory = () => new Response("SSR preservado")) {
  const source = readFileSync(new URL("../src/server.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const calls = [];
  const errors = [];
  const module = { exports: {} };
  runInNewContext(compiled, {
    module,
    exports: module.exports,
    Response,
    URL,
    console: { error: (error) => errors.push(error) },
    require(name) {
      if (name === "@tanstack/react-start/server-entry") {
        return {
          default: {
            fetch: (...args) => {
              calls.push(args);
              return responseFactory();
            },
          },
        };
      }
      if (name === "./lib/error-capture") return { consumeLastCapturedError: () => undefined };
      if (name === "./lib/error-page") return { renderErrorPage: () => "SSR error page" };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return { handler: module.exports.default, calls, errors };
}

test("assets ausentes retornam 404 sem HTML, SSR ou cache no browser/CDNs", async () => {
  const { handler, calls, errors } = serverFixture();
  for (const pathname of [
    "/assets/chunk-antigo.js",
    "/assets/nested/chunk.js?version=old",
    "/assets/style.css",
    "/assets/image.webp",
    "/assets/",
    "/assets",
  ]) {
    const response = await handler.fetch(new Request(`https://alemdofeed.test${pathname}`));
    assert.equal(response.status, 404, pathname);
    for (const header of ["cache-control", "cdn-cache-control", "vercel-cdn-cache-control"]) {
      assert.equal(response.headers.get(header), "no-store", `${pathname}: ${header}`);
    }
    assert.match(response.headers.get("content-type"), /^text\/plain/);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(await response.text(), "Asset not found.\n");
  }
  assert.equal(calls.length, 0, "Não carregar TanStack para assets ausentes");
  assert.equal(errors.length, 0, "404 esperado não é falha SSR");
});

test("HEAD de asset ausente não envia corpo e também não pode ser cacheado", async () => {
  const { handler } = serverFixture();
  const response = await handler.fetch(
    new Request("https://alemdofeed.test/assets/missing.js", { method: "HEAD" }),
  );
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(await response.text(), "");
});

test("rotas normais, nomes parecidos e query strings continuam no SSR sem mudar headers", async () => {
  const { handler, calls } = serverFixture(
    () => new Response("SSR preservado", { headers: { "cache-control": "private, max-age=0" } }),
  );
  for (const pathname of [
    "/",
    "/episodios/isso-e-real",
    "/assets-editoriais",
    "/conteudos?next=/assets/missing.js",
  ]) {
    const request = new Request(`https://alemdofeed.test${pathname}`);
    const env = { fixture: true };
    const ctx = { requestId: pathname };
    const response = await handler.fetch(request, env, ctx);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "private, max-age=0");
    assert.equal(await response.text(), "SSR preservado");
    assert.deepEqual(calls.at(-1), [request, env, ctx]);
  }
  assert.equal(calls.length, 4);
});

test("404 de uma página continua sendo resposta do router, não erro de asset", async () => {
  const { handler, calls } = serverFixture(
    () =>
      new Response("Página não encontrada", {
        status: 404,
        headers: { "content-type": "text/html" },
      }),
  );
  const response = await handler.fetch(
    new Request("https://alemdofeed.test/episodios/inexistente"),
  );
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("content-type"), "text/html");
  assert.equal(await response.text(), "Página não encontrada");
  assert.equal(calls.length, 1);
});

test("erros reais de SSR continuam registrados e recebem a página de erro existente", async () => {
  const failure = new Error("SSR fixture failure");
  const { handler, errors } = serverFixture(() => {
    throw failure;
  });
  const response = await handler.fetch(new Request("https://alemdofeed.test/"));
  assert.equal(response.status, 500);
  assert.equal(await response.text(), "SSR error page");
  assert.equal(errors[0], failure);
});
