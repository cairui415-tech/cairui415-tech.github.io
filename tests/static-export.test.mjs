import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(repositoryRoot, "out");

test("exports a complete GitHub Pages artifact", async () => {
  const html = await readFile(join(outDir, "index.html"), "utf8");

  assert.match(html, /数据驱动的复合型人才/);
  assert.equal(await readFile(join(outDir, "404.html"), "utf8"), html);
  await access(join(outDir, ".nojekyll"));

  const localReferences = [...html.matchAll(/(?:src|href)="(\/[^"#?]+)/g)]
    .map((match) => decodeURIComponent(match[1]).slice(1));

  assert.ok(localReferences.some((path) => path.startsWith("_next/static/chunks/")));
  assert.ok(localReferences.some((path) => path.startsWith("works/")));

  for (const path of new Set(localReferences)) {
    await access(join(outDir, path));
  }
});
