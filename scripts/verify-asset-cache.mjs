import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

// Rodar após npm run build, contra vite preview ou, após deploy, contra a produção.
const base = process.argv[2] ?? "http://127.0.0.1:3100";
const config = JSON.parse(
  await readFile(new URL("../.vercel/output/config.json", import.meta.url), "utf8"),
);
const filesystem = config.routes.findIndex((route) => route.handle === "filesystem");
const ssr = config.routes.findIndex((route) => route.dest === "/__server");
assert.ok(filesystem >= 0 && ssr > filesystem, "Vercel serve assets existentes antes do SSR");

for (const method of ["GET", "HEAD"]) {
  for (const path of [
    "/assets/diagnostico-inexistente.js",
    "/assets/nested/diagnostico.css?v=1",
    "/assets/diagnostico.webp",
  ]) {
    const response = await fetch(new URL(path, base), {
      method,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    assert.equal(response.status, 404, `${method} ${path}`);
    assert.equal(
      response.headers.get("cache-control"),
      "no-store",
      `${method} ${path}: cache do browser`,
    );
    assert.equal(
      response.headers.get("cdn-cache-control"),
      "no-store",
      `${method} ${path}: cache intermediário`,
    );
    // A Vercel consome este header e pode removê-lo da resposta pública.
    const vercelCache = response.headers.get("vercel-cdn-cache-control");
    if (vercelCache) assert.equal(vercelCache, "no-store");
    assert.match(response.headers.get("content-type"), /^text\/plain/);
    assert.equal(await response.text(), method === "HEAD" ? "" : "Asset not found.\n");
    console.log(`OK ${method} ${path}: 404 sem cache, sem HTML`);
  }
}

const assets = await readdir(new URL("../.vercel/output/static/assets/", import.meta.url));
for (const extension of [".js", ".css", ".webp"]) {
  const name = assets.find((asset) => asset.endsWith(extension));
  assert.ok(name, extension);
  const assetPath = `/assets/${name}`;
  const longCacheRule = config.routes
    .slice(0, filesystem)
    .some(
      (route) =>
        route.src &&
        new RegExp(`^(?:${route.src})$`).test(assetPath) &&
        /max-age=31536000/.test(route.headers?.["cache-control"] ?? ""),
    );
  assert.ok(longCacheRule, `Cache longo preservado na configuração Vercel: ${name}`);
  const response = await fetch(new URL(assetPath, base), { signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, name);
  const expectedMime = { ".js": /javascript/, ".css": /text\/css/, ".webp": /image\/webp/ }[
    extension
  ];
  assert.match(response.headers.get("content-type"), expectedMime, name);
  const expected = await readFile(
    new URL(`../.vercel/output/static/assets/${name}`, import.meta.url),
  );
  assert.deepEqual(
    Buffer.from(await response.arrayBuffer()),
    expected,
    `Asset servido intacto: ${name}`,
  );
  console.log(`OK ${name}: 200, conteúdo intacto; cache longo configurado na Vercel`);
}
console.log(
  "OK: assets ausentes não são cacheáveis; assets existentes e roteamento SSR preservados.",
);
