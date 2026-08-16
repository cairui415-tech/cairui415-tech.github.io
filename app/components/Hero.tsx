import type { PortfolioContent } from "../content";
import { DecryptedText, PixelTrail } from "./MotionLayer";
import { PortfolioInfiniteGallery, type GalleryItem } from "./PortfolioInfiniteGallery";
import { WindowFrame } from "./WindowFrame";

const heroGallery: GalleryItem[] = [
  { src: "/works/retirement-data-02.png", alt: "养老焦虑数据可视化", label: "数据新闻 / 可视化" },
  { src: "/works/starpal-prototype-23.png", alt: "星芽 AI 产品学习板块原型", label: "AI 产品 / 原型" },
  { src: "/works/research-chart-overview.png", alt: "流媒体广告研究数据分析图", label: "实验研究 / LMM" },
  { src: "/works/ai-audio-research-15.png", alt: "Suno 产品与用户界面分析", label: "行业研究 / AI 音频" },
  { src: "/works/starpal-prototype-25.png", alt: "星芽 AI 形象创建原型", label: "交互设计 / 用户体验" },
  { src: "/works/retirement-data-04.png", alt: "新型养老模式调查数据", label: "问卷分析 / 叙事" },
  { src: "/works/ai-audio-research-23.png", alt: "AI 音频产品功能页面研究", label: "竞品分析 / 产品" },
];

export function Hero({ profile }: { profile: PortfolioContent["profile"] }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <PixelTrail />
      <div className="hero__desktop" aria-hidden="true">
        <span className="desktop-file desktop-file--one"><i>PDF</i>Resume</span>
        <span className="desktop-file desktop-file--two"><i>MP4</i>Works</span>
        <span className="desktop-file desktop-file--three"><i>AI</i>Research</span>
      </div>

      <WindowFrame title="CAI_RUI.PORTFOLIO" meta="ONLINE" className="hero-window">
        <div className="hero-window__body">
          <div className="hero__copy">
            <p className="system-label"><span>● AVAILABLE</span> SHANGHAI · 2026</p>
            <h1 id="hero-title"><DecryptedText text={profile.name} /></h1>
            <p className="hero__role">{profile.role}</p>
            <p className="hero__statement">{profile.statement}</p>
            <div className="hero__actions">
              <a className="button" href="#projects">打开作品文件夹 <span aria-hidden="true">↘</span></a>
              <a className="text-link" href="#contact">联系我 ↗</a>
            </div>
            <div className="hero__capabilities" aria-label="核心能力">
              <span>Research</span><span>Data</span><span>Content</span><span>AI Product</span>
            </div>
          </div>

          <div className="hero__showreel">
            <PortfolioInfiniteGallery items={heroGallery} />
          </div>
        </div>
      </WindowFrame>
      <p className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></p>
    </section>
  );
}
