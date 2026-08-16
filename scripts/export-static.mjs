import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(repositoryRoot, "out");

if (dirname(outDir) !== repositoryRoot || basename(outDir) !== "out") {
  throw new Error(`Refusing to reset unexpected output path: ${outDir}`);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(join(repositoryRoot, "dist", "client"), outDir, { recursive: true });

const workerUrl = pathToFileURL(join(repositoryRoot, "dist", "server", "index.js"));
workerUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}`);
}

const html = await response.text();
await Promise.all([
  writeFile(join(outDir, "index.html"), html),
  writeFile(join(outDir, "404.html"), html),
  writeFile(join(outDir, ".nojekyll"), ""),
]);

console.log(`Static portfolio exported to ${outDir}`);
