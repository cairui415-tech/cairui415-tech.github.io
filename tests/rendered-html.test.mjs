import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders a readable Chinese portfolio without mojibake", async () => {
  const response = await render();
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /蔡睿/);
  assert.match(html, /数据驱动的复合型人才/);
  assert.doesNotMatch(html, /钄|锝|绛|€|codex-preview|react-loading-skeleton/i);
});

test("places outcome data inside the relevant experience and project instead of a standalone wall", async () => {
  const html = await (await render()).text();

  for (const id of ["about", "projects", "evidence", "strengths", "skills", "contact"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  for (const text of ["10万+", "500万+", "150+", "ICA 2026"]) {
    assert.match(html, new RegExp(text.replace("+", "\\+")));
  }

  assert.doesNotMatch(html, /class="metrics"/);
  const newsBlock = html.slice(html.indexOf("上观新闻编辑中心"), html.indexOf("上观新闻编辑中心") + 5000);
  assert.match(newsBlock, /10万\+/);
  assert.match(newsBlock, /500万\+/);
  assert.match(html, /class="[^"]*window-frame/);
  assert.match(html, /data-motion="pixel-trail"/);
});

test("keeps all internship videos in the Shangguan News experience", async () => {
  const html = await (await render()).text();

  for (const asset of ["/works/news-video-01.mp4", "/works/news-video-02.mp4", "/works/news-video-03.mp4"]) {
    assert.match(html, new RegExp(asset.replaceAll("/", "\\/")));
  }

  assert.match(html, /上官河 \/ 两山理念视频作品/);
  assert.doesNotMatch(html.slice(0, html.indexOf('id="about"')), /news-video-0[123]\.mp4/);
});

test("uses resume wording for every internship", async () => {
  const html = await (await render()).text();

  for (const text of [
    "独立完成比亚迪深度研究报告",
    "运用Choice、Wind等金融终端采集核验产业数据",
    "协助投研团队分析消费及新能源板块",
    "使用金融终端获取财务及估值数据",
    "借助AI工具辅助脚本创作与数据分析",
    "监测各平台实时新闻",
  ]) {
    assert.match(html, new RegExp(text));
  }
});

test("shows full project galleries with additional data visualizations", async () => {
  const html = await (await render()).text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  for (const asset of [
    "/works/retirement-data.png",
    "/works/retirement-data-02.png",
    "/works/retirement-data-03.png",
    "/works/starpal-prototype-22.png",
    "/works/starpal-prototype-23.png",
    "/works/ai-audio-research-12.png",
    "/works/ai-audio-research-15.png",
  ]) {
    assert.match(html, new RegExp(asset.replaceAll("/", "\\/")));
  }

  assert.match(css, /project-gallery[\s\S]*object-fit:\s*contain/);

  for (const project of ["养老焦虑", "星芽", "AI 音频", "AI 共情"] ) {
    assert.match(html, new RegExp(project));
  }
});

test("shows analysis charts and acceptance screenshots in research evidence", async () => {
  const html = await (await render()).text();

  for (const asset of [
    "/works/research-chart-overview.png",
    "/works/research-chart-ad.png",
    "/works/research-chart-video.png",
    "/works/ica-acceptance-01.png",
    "/works/ica-acceptance-02.png",
  ]) {
    assert.match(html, new RegExp(asset.replaceAll("/", "\\/")));
  }
  assert.match(html, /两篇论文录用/);
  assert.match(html, /第一作者 \/ 共同第一作者/);
});

test("puts AI tools first and uses real brand artwork", async () => {
  const html = await (await render()).text();

  for (const asset of ["/tools/openai.svg", "/tools/anthropic.svg", "/tools/excel.svg", "/tools/ibm.svg"]) {
    assert.match(html, new RegExp(asset.replaceAll("/", "\\/")));
  }
  const toolGrid = html.slice(html.indexOf('class="tool-grid"'), html.indexOf('class="skill-list"'));
  assert.ok(toolGrid.indexOf("Claude Code") < toolGrid.indexOf("Excel"));
  assert.ok(toolGrid.indexOf("Codex") < toolGrid.indexOf("Excel"));
  assert.match(html, /数据分析与可视化/);
});

test("keeps navigation, contact actions, and reduced-motion support accessible", async () => {
  const html = await (await render()).text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  for (const href of ["#about", "#projects", "#strengths", "#skills", "#contact", "#top"]) {
    assert.match(html, new RegExp(`href="${href}"`));
  }

  assert.match(html, /href="mailto:23300130015@m\.fudan\.edu\.cn"/);
  assert.match(html, /href="tel:\+8615106036688"/);
  assert.doesNotMatch(html, /\/hero-loop\.mp4/);
  assert.match(css, /--container:\s*1700px/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /overflow-x:\s*hidden/);
});

test("renders the interactive profile card with the edited portrait", async () => {
  const html = await (await render()).text();

  assert.match(html, /data-profile-card="cai-rui"/);
  assert.match(html, /\/profile\/cai-rui-profile\.png/);
  assert.match(html, /联系我/);
});

test("places Shangguan News before the fund internships", async () => {
  const html = await (await render()).text();
  const experienceLog = html.slice(html.indexOf("EXPERIENCE.LOG"), html.indexOf('id="projects"'));

  assert.ok(experienceLog.indexOf("解放日报 · 上观新闻编辑中心") < experienceLog.indexOf("德邦基金管理有限公司"));
  assert.ok(experienceLog.indexOf("德邦基金管理有限公司") < experienceLog.indexOf("元诚私募基金管理有限公司"));
});

test("shows focused BYD research evidence inside the Debon Fund internship", async () => {
  const html = await (await render()).text();
  const debonBlock = html.slice(html.indexOf("德邦基金管理有限公司"), html.indexOf("元诚私募基金管理有限公司"));

  assert.match(debonBlock, /\/works\/byd-research-data\.png/);
  assert.doesNotMatch(debonBlock, /\/works\/byd-research-timeline\.png/);
  assert.equal((debonBlock.match(/byd-research-/g) || []).length, 1);
  assert.match(debonBlock, /比亚迪深度研究/);
});

test("uses the data-driven positioning and an image-based infinite hero gallery", async () => {
  const html = await (await render()).text();
  const hero = html.slice(html.indexOf('class="hero"'), html.indexOf('id="about"'));

  assert.match(hero, /数据驱动的复合型人才/);
  assert.match(hero, /data-gallery="infinite"/);
  assert.match(hero, /拖动探索作品/);
  assert.match(hero, /\/works\/retirement-data-02\.png/);
  assert.match(hero, /\/works\/starpal-prototype-23\.png/);
  assert.doesNotMatch(hero, /<video|hero-loop\.mp4/);
});

test("uses the supplied pill navigation pattern", async () => {
  const html = await (await render()).text();

  assert.match(html, /class="[^"]*pill-nav[^"]*"/);
  assert.match(html, /class="pill-logo"/);
  for (const label of ["首页", "经历", "项目", "优势", "技能", "联系"]) {
    assert.match(html, new RegExp(`>${label}<`));
  }
});

test("shows resume courses and IELTS in the profile card without the research grant", async () => {
  const html = await (await render()).text();
  const profile = html.slice(html.indexOf('data-profile-card="cai-rui"'), html.indexOf("EXPERIENCE.LOG"));

  assert.match(profile, /雅思 7\.0/);
  assert.match(profile, /计量经济学/);
  assert.match(profile, /数据分析与信息可视化/);
  assert.doesNotMatch(profile, /望道本科生研究资助|4,000元/);
});

test("uses prototype pages for StarPal and later visual pages for AI audio", async () => {
  const html = await (await render()).text();

  for (const asset of [
    "/works/starpal-prototype-22.png",
    "/works/starpal-prototype-23.png",
    "/works/starpal-prototype-24.png",
    "/works/starpal-prototype-25.png",
    "/works/starpal-prototype-26.png",
    "/works/ai-audio-research-12.png",
    "/works/ai-audio-research-15.png",
    "/works/ai-audio-research-23.png",
    "/works/ai-audio-research-30.png",
    "/works/ai-audio-research-31.png",
  ]) {
    assert.match(html, new RegExp(asset.replaceAll("/", "\\/")));
  }
  assert.doesNotMatch(html, /\/works\/starpal(?:-0[23])?\.png/);
  assert.doesNotMatch(html, /\/works\/ai-audio(?:-0[234])?\.png/);
});

test("labels each project window with its actual project name", async () => {
  const html = await (await render()).text();

  assert.doesNotMatch(html, /WORK_0[1-4]\./);
  for (const title of ["养老焦虑数据新闻", "星芽 AI 产品原型", "AI 音频产业研究", "AI 共情实验研究"]) {
    assert.match(html, new RegExp(title));
  }
});

test("configures both licensed React Bits registries without embedding a secret", async () => {
  const config = JSON.parse(await readFile(new URL("../components.json", import.meta.url), "utf8"));

  assert.equal(config.registries["@reactbits-starter"].url, "https://pro.reactbits.dev/api/r/starter/{name}.json");
  assert.equal(config.registries["@reactbits-pro"].url, "https://pro.reactbits.dev/api/r/pro/{name}.json");
  assert.equal(config.registries["@reactbits-starter"].headers.Authorization, "${REACTBITS_LICENSE_KEY}");
  assert.equal(config.registries["@reactbits-pro"].headers.Authorization, "${REACTBITS_LICENSE_KEY}");
});
