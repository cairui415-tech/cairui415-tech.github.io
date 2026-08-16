# 蔡睿个人作品集网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个面向互联网公司招聘场景、桌面端优先、可继续换肤的 React + Vite 单页个人作品集。

**Architecture:** 使用 Sites 提供的 vinext/Vite React 结构输出单路由静态站点。页面由独立内容数据模块和六个语义化展示组件组成，全局 CSS 变量控制约 1700px 版心、亮色视觉、响应式和减少动态回退；外部视频下载为本地资源，运行时不依赖接口。

**Tech Stack:** React 19、TypeScript、Vite 8/vinext、CSS、Node.js 内置测试运行器。

**Spec:** `docs/superpowers/specs/2026-08-17-portfolio-site-design.md`

## Global Constraints

- 使用 React 与 Vite 构建可本地运行、可预览的单页网站。
- 页面最大内容宽度约为 1700px，重点适配 1440px 及以上桌面屏幕，并提供基本窄屏适配。
- 包含全屏 Hero、个人经历、精选项目、个人优势、专业技能和整屏联系方式六个模块。
- 首版只定义可用的视觉骨架，不锁定最终风格；不添加后台、复杂路由、表单、统计或 CMS。
- 简历内容集中存放在独立数据模块，不虚构项目链接、职位或量化成果。
- Hero 视频必须有静态回退，并尊重 `prefers-reduced-motion`。
- 主要链接必须支持键盘焦点；项目图缺失时使用设计化媒体槽，不显示破损图片。

---

## File Structure

- `app/content.ts`: 定义 `PortfolioContent` 类型并保存简历、项目、优势和技能数据。
- `app/components/Navigation.tsx`: 桌面导航和联系入口。
- `app/components/Hero.tsx`: 全屏标题、背景视频和静态回退。
- `app/components/Experience.tsx`: 介绍、抽象人物视觉、经历时间线与数据成果。
- `app/components/Projects.tsx`: 四张精选项目大卡片及媒体槽。
- `app/components/Strengths.tsx`: 四张个人优势卡。
- `app/components/Skills.tsx`: 四组专业技能矩阵。
- `app/components/Contact.tsx`: 整屏联系方式和返回顶部入口。
- `app/page.tsx`: 组合六个区块并提供页面元数据。
- `app/layout.tsx`: 设置中文语言、站点元数据与全局样式。
- `app/globals.css`: 设计变量、桌面布局、响应式、焦点与减少动态规则。
- `public/hero-loop.mp4`: 本地 Hero 视频；来源为 MDN CC0 示例视频，经遮罩和滤镜抽象化呈现。
- `tests/rendered-html.test.mjs`: 从生产构建检查页面内容、链接、视频属性和样式约束。

### Task 1: 初始化 Vite React 站点并建立失败测试

**Files:**
- Create/replace: starter files produced by Sites initializer
- Modify: `tests/rendered-html.test.mjs`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: empty project surface plus approved design documents temporarily preserved under `work/` during initialization
- Produces: installable vinext/Vite project and `render()` helper that tests server-rendered HTML

- [ ] **Step 1: Preserve design docs, initialize the site once, and restore docs**

Resolve both source and destination paths, confirm they remain inside the workspace, move `docs/` to `work/design-docs/`, run the bundled `init-site.sh` with the project root as target, then restore `docs/`. Do not run a second initializer.

```powershell
$root = (Resolve-Path '.').Path
$docs = Join-Path $root 'docs'
$hold = Join-Path $root 'work\design-docs'
if (-not $docs.StartsWith($root) -or -not $hold.StartsWith($root)) { throw 'Path escaped workspace' }
Move-Item -LiteralPath $docs -Destination $hold
bash 'C:/Users/35337/.codex/plugins/cache/openai-bundled/sites/0.1.34/scripts/init-site.sh' "$root"
Move-Item -LiteralPath $hold -Destination $docs
```

- [ ] **Step 2: Replace starter tests with one failing portfolio shell test**

Keep the existing `render()` helper and add this test before changing product code:

```js
test("server-renders Cai Rui portfolio shell", async () => {
  const response = await render();
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /蔡睿/);
  assert.match(html, /研究驱动的复合型候选人/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
```

- [ ] **Step 3: Run the test and confirm the intended failure**

Run: `npm test`

Expected: FAIL because the starter still renders the loading skeleton and does not contain “蔡睿”。

- [ ] **Step 4: Create the minimal portfolio shell**

Remove `app/_sites-preview`, remove `react-loading-skeleton` with `npm uninstall react-loading-skeleton`, set `<html lang="zh-CN">`, update metadata to `蔡睿｜个人作品集`, and make `app/page.tsx` render the heading and positioning sentence required by the test.

- [ ] **Step 5: Run the test and confirm it passes**

Run: `npm test`

Expected: PASS with one test and no starter-preview markers.

### Task 2: 建立内容数据与六区块语义结构

**Files:**
- Create: `app/content.ts`
- Create: `app/components/Navigation.tsx`
- Create: `app/components/Hero.tsx`
- Create: `app/components/Experience.tsx`
- Create: `app/components/Projects.tsx`
- Create: `app/components/Strengths.tsx`
- Create: `app/components/Skills.tsx`
- Create: `app/components/Contact.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `PortfolioContent` from `app/content.ts`
- Produces: `portfolioContent`, six section IDs (`top`, `about`, `projects`, `strengths`, `skills`, `contact`) and server-rendered semantic content

- [ ] **Step 1: Add failing assertions for required content**

```js
test("renders all portfolio sections and verified resume outcomes", async () => {
  const html = await (await render()).text();
  for (const id of ["about", "projects", "strengths", "skills", "contact"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  for (const text of ["10万+", "500万+", "150+", "ICA 2026", "4,000元"]) {
    assert.match(html, new RegExp(text));
  }
  for (const project of ["养老焦虑", "星芽", "Suno/Udio", "流媒体广告研究"]) {
    assert.match(html, new RegExp(project));
  }
});

test("renders strengths and four skill groups", async () => {
  const html = await (await render()).text();
  for (const text of ["研究洞察", "数据分析", "内容策略", "AI 产品思维", "AI 与效率", "商业与金融研究", "用户与实验研究"]) {
    assert.match(html, new RegExp(text));
  }
});
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm run build && node --test --test-name-pattern="portfolio sections|skill groups" tests/rendered-html.test.mjs`

Expected: FAIL because the six sections and resume outcomes do not yet exist.

- [ ] **Step 3: Define exact content interfaces and resume-backed data**

Create discriminated, readonly-friendly types for `Metric`, `ExperienceItem`, `Project`, `Strength`, `SkillGroup`, and `PortfolioContent`. Export `portfolioContent` containing three internships, four projects, four strengths, four skill groups, email `23300130015@m.fudan.edu.cn`, phone `151-0603-6688`, and the five verified outcomes from the design spec.

- [ ] **Step 4: Implement the components and compose the page**

Each section component accepts only the relevant array/object from `portfolioContent`. Use `section`, `header`, `article`, `ol`, `ul`, `address`, and heading levels in document order; implement project media as styled `<div aria-hidden="true">` slots with project-specific labels rather than broken `<img>` elements.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`

Expected: all content tests PASS.

### Task 3: 导航、联系方式和 Hero 视频行为

**Files:**
- Modify: `app/components/Navigation.tsx`
- Modify: `app/components/Hero.tsx`
- Modify: `app/components/Contact.tsx`
- Create: `public/hero-loop.mp4`
- Modify: `tests/rendered-html.test.mjs`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: section IDs and contact values from Task 2
- Produces: valid anchor navigation, `mailto:`/`tel:` links, autoplay-muted-loop inline video with poster/fallback layer

- [ ] **Step 1: Add failing interaction and media assertions**

```js
test("renders accessible navigation, contact links, and local hero video", async () => {
  const html = await (await render()).text();
  for (const href of ["#about", "#projects", "#strengths", "#skills", "#contact", "#top"]) {
    assert.match(html, new RegExp(`href="${href}"`));
  }
  assert.match(html, /href="mailto:23300130015@m\.fudan\.edu\.cn"/);
  assert.match(html, /href="tel:\+8615106036688"/);
  assert.match(html, /<video[^>]*autoplay[^>]*muted[^>]*loop[^>]*playsinline/i);
  assert.match(html, /src="\/hero-loop\.mp4"/);
});
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm run build && node --test --test-name-pattern="accessible navigation" tests/rendered-html.test.mjs`

Expected: FAIL because navigation links and the video source are absent.

- [ ] **Step 3: Download the local CC0 video asset**

After obtaining network permission, download `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4` to `public/hero-loop.mp4`; verify the response is a non-empty MP4 and keep the attribution/license note in `README.md`. The visual treatment will desaturate, brighten, blur and mask the footage so it functions as an abstract texture.

- [ ] **Step 4: Implement navigation, contact links, and video fallback**

Add the six anchors, use `+8615106036688` in the telephone URI while displaying the formatted resume number, and render a decorative fallback layer immediately behind the `<video autoPlay muted loop playsInline preload="metadata">` element. Keep all primary text outside the video element.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`

Expected: all tests PASS and the production renderer references `/hero-loop.mp4`.

### Task 4: 完成亮色桌面布局与可访问回退

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: class names emitted by all section components
- Produces: `--container: 1700px`, full-viewport Hero/contact sections, desktop project grid, responsive collapse, visible focus and reduced-motion rules

- [ ] **Step 1: Add failing stylesheet contract test**

```js
test("defines the desktop container and accessibility fallbacks", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /--container:\s*1700px/);
  assert.match(css, /min-height:\s*100(?:svh|vh)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /overflow-x:\s*hidden/);
});
```

- [ ] **Step 2: Run the stylesheet test and confirm failure**

Run: `node --test --test-name-pattern="desktop container" tests/rendered-html.test.mjs`

Expected: FAIL because the starter stylesheet lacks the portfolio tokens and reduced-motion contract.

- [ ] **Step 3: Implement the visual skeleton**

Define warm-white surfaces, near-black text, one cool blue accent, a 1700px container with fluid side padding, typography using system Chinese sans-serif fallbacks, thin borders, restrained radius, project media aspect ratios, sticky/floating navigation, and a two-column desktop experience layout. Use CSS shapes for the abstract portrait and project media placeholders. Apply blur, grayscale, brightness and a white overlay to the Hero video.

- [ ] **Step 4: Add responsive and reduced-motion rules**

At widths below 960px, collapse multi-column layouts, reduce display type and keep tap targets at least 44px high. Under `prefers-reduced-motion: reduce`, disable smooth scrolling and entrance transitions and hide/pause the decorative video through CSS while leaving the fallback visible.

- [ ] **Step 5: Run tests and lint**

Run: `npm test && npm run lint`

Expected: all tests PASS and ESLint exits with zero errors.

### Task 5: 生产构建与桌面预览验收

**Files:**
- Modify when defects are found: the smallest relevant file from Tasks 2–4
- Test: production build, rendered HTML suite, browser preview

**Interfaces:**
- Consumes: complete portfolio implementation
- Produces: locally runnable first version with fresh verification evidence

- [ ] **Step 1: Start and retain the development preview**

Run `npm run dev`, keep the process alive, use the exact Local URL printed by Vite, and open it once in Codex.

- [ ] **Step 2: Run fresh automated verification**

Run: `npm test && npm run lint && npm run build`

Expected: every command exits 0 with no test failures or compilation errors.

- [ ] **Step 3: Inspect the desktop page**

At approximately 1440px and 1920px widths, verify the Hero and contact sections fill the viewport, the content stays within the 1700px container, all six sections are readable, four projects and four skill groups are present, there is no horizontal scroll, and the video fallback preserves text contrast.

- [ ] **Step 4: Inspect keyboard and reduced-motion behavior**

Tab through navigation and contact links to confirm visible focus. Emulate reduced motion and confirm smooth scrolling/transitions are disabled and the Hero remains readable without motion.

- [ ] **Step 5: Record actual validation results**

Update this plan's checkboxes and report the exact test/build/lint results plus any remaining visual limitations caused by placeholder media.

## Actual Validation Results

- `npm test`: 5 tests passed, 0 failed.
- `npm run lint`: exited successfully with 0 ESLint errors.
- `npm run build`: production build completed successfully.
- Browser checks: 1440px and 1920px desktop previews inspected; 6 sections, 4 project cards and 4 skill groups rendered; Hero video reached ready state 4; no horizontal overflow or browser console errors were detected.
- Accessibility checks: semantic navigation and contact links are present; visible focus and reduced-motion rules are covered by the stylesheet contract test.
- Current media limitation: project visuals and the portrait are intentionally abstract placeholders pending user-provided screenshots and photography.
- Version-control limitation: the environment allowed reading but not writing `.git` metadata, so the working tree is preserved without a commit.
