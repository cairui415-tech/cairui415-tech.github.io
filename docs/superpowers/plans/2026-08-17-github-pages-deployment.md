# GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Export the existing Vinext portfolio as a verified static artifact and publish it at `https://cairui415-tech.github.io/`.

**Architecture:** Keep Vinext as the authoring and server-rendering layer. After the normal production build, call the generated worker once to render `/`, copy `dist/client` into `out`, add the rendered HTML and `.nojekyll`, then publish `out` from the `gh-pages` branch while retaining source on `main`.

**Tech Stack:** React 19, Vinext, Vite 8, Node.js 22, Node test runner, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-17-github-pages-deployment.md`

## Global Constraints

- Preserve all current portfolio content and visuals.
- The public URL must be `https://cairui415-tech.github.io/`.
- The public repository must not contain credentials or a React Bits license key.
- Do not modify files outside the current workspace.

---

### Task 1: Static export contract

**Files:**
- Create: `tests/static-export.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: static artifact at `out/index.html` produced by `scripts/export-static.mjs`.
- Produces: assertions covering HTML, `.nojekyll`, the 404 fallback, and every local `src`/`href` asset.

- [ ] **Step 1: Write the failing test**

```js
test("exports a complete GitHub Pages artifact", async () => {
  const html = await readFile(join(outDir, "index.html"), "utf8");
  assert.match(html, /数据驱动的复合型人才/);
  assert.equal(await readFile(join(outDir, "404.html"), "utf8"), html);
  await access(join(outDir, ".nojekyll"));
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/static-export.test.mjs`

Expected: FAIL because `out/index.html` does not exist.

- [ ] **Step 3: Add the export command**

Add `"export:static": "npm run build && node scripts/export-static.mjs"` and run the exporter before the static export test in `npm test`.

- [ ] **Step 4: Run the focused test again**

Run: `node --test tests/static-export.test.mjs`

Expected: still FAIL until Task 2 provides the exporter.

### Task 2: Vinext static exporter

**Files:**
- Create: `scripts/export-static.mjs`
- Test: `tests/static-export.test.mjs`

**Interfaces:**
- Consumes: `dist/server/index.js` and `dist/client/` from `vinext build`.
- Produces: a self-contained `out/` directory with root-relative asset URLs.

- [ ] **Step 1: Implement a bounded output reset**

Resolve `out/` from the repository root and abort unless its parent is exactly the repository root before calling `rm(outDir, { recursive: true, force: true })`.

- [ ] **Step 2: Render and copy the site**

Import the generated worker, request `http://localhost/`, assert status 200, copy `dist/client` to `out`, and write the response body to `out/index.html` and `out/404.html`.

- [ ] **Step 3: Disable Jekyll filtering**

Write an empty `out/.nojekyll` so GitHub serves the `_next` directory.

- [ ] **Step 4: Run the exporter and focused test**

Run: `npm run export:static && node --test tests/static-export.test.mjs`

Expected: PASS, including existence checks for every local asset referenced by `index.html`.

### Task 3: Full verification and source publication

**Files:**
- Modify: `.gitignore` only if generated `out/` or local credentials are not already excluded.

**Interfaces:**
- Consumes: the verified source tree and generated `out/` artifact.
- Produces: public repository `cairui415-tech/cairui415-tech.github.io` with source on `main`.

- [ ] **Step 1: Run all checks**

Run: `npm run lint && npm test`

Expected: ESLint exits 0 and all Node tests pass.

- [ ] **Step 2: Scan for credentials**

Run: `git diff --check` and search tracked candidates for credential-shaped values; verify `components.json` only references `${REACTBITS_LICENSE_KEY}`.

- [ ] **Step 3: Create the public repository**

Use the authenticated GitHub API to create `cairui415-tech.github.io` with visibility `public` and no generated README.

- [ ] **Step 4: Commit and push source**

Commit the workspace source to `main`, add the HTTPS remote without embedded credentials, and push using Git Credential Manager.

### Task 4: Pages publication and remote verification

**Files:**
- No source changes.

**Interfaces:**
- Consumes: `out/` from Task 2 and the remote repository from Task 3.
- Produces: published GitHub Pages site at the account root.

- [ ] **Step 1: Publish the static artifact**

Create a temporary Git index rooted at `out/`, commit its contents, and push it to `refs/heads/gh-pages` without altering the source working tree.

- [ ] **Step 2: Enable Pages**

Use the authenticated GitHub Pages API with source branch `gh-pages` and path `/`.

- [ ] **Step 3: Wait for the Pages build**

Poll the official Pages build endpoint until the latest build reports `built` or a bounded timeout is reached.

- [ ] **Step 4: Verify the public site**

Request `https://cairui415-tech.github.io/`, confirm HTTP 200, open it in the in-app browser, and verify the hero, navigation, profile card, media, and contact links.

## Self-Review

- Spec coverage: all requirements map to Tasks 1-4.
- Placeholder scan: no TBD, TODO, or deferred implementation steps remain.
- Type consistency: `scripts/export-static.mjs` is the single producer of `out/`; both tests and deployment consume that path.
