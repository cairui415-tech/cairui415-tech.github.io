import type { Project } from "../content";
import { WindowFrame } from "./WindowFrame";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="section-index section-index--light"><span>02</span><p>{`SELECTED WORK / ${projects.length} FILES`}</p></div>
      <div className="section-heading section-heading--split">
        <h2 id="projects-title">精选项目</h2>
        <p>从真实材料中提取证据，再把结论变成产品、研究或内容方案。向下滚动，逐个打开我的工作文件。</p>
      </div>

      <div className="project-stack">
        {projects.map((project, index) => (
          <WindowFrame
            title={project.windowTitle}
            meta={project.year}
            className={`project-card project-card--${project.accent}`}
            key={project.title}
          >
            <article className="project-card__body">
              <div className="project-gallery" aria-label={`${project.title} 项目图片`}>
                {project.images ? project.images.map((image, imageIndex) => (
                  <figure key={image.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>0{imageIndex + 1} / 0{project.images?.length}</figcaption>
                  </figure>
                )) : project.visual === "workflow" ? (
                  <div className="workflow-visual" data-project-visual="workflow" aria-label="联运素材工作台脱敏产品界面">
                    <div className="workflow-visual__chrome"><span>联运素材工作台</span><small>AI WORKFLOW · READY</small></div>
                    <div className="workflow-visual__tabs"><b>01 素材自动分类</b><span>02 CP 需求单生成</span></div>
                    <div className="workflow-visual__body">
                      <div className="workflow-dropzone"><span>ZIP / 7Z / RAR</span><strong>拖入素材压缩包</strong><small>识别 → 分类 → 校验</small></div>
                      <div className="workflow-steps" aria-label="产品流程">
                        <i>01<em>文件识别</em></i><b>→</b><i>02<em>素材自动分类</em></i><b>→</b><i>03<em>CP 需求单生成</em></i>
                      </div>
                      <div className="workflow-output"><span>OUTPUT</span><b>TXT / EXCEL</b><small>实时预览 · 一键复制 · 下载交付</small></div>
                    </div>
                  </div>
                ) : project.visual === "sql" ? (
                  <div className="sql-visual" data-project-visual="sql" aria-label="Olist 电商经营与用户价值分析示意">
                    <div className="sql-visual__editor">
                      <span>olist_analysis.sql</span>
                      <code><i>WITH</i> customer_value <i>AS</i> (</code>
                      <code>&nbsp;&nbsp;<i>SELECT</i> customer_id,</code>
                      <code>&nbsp;&nbsp;SUM(payment_value) <i>OVER</i> (...)</code>
                      <code>&nbsp;&nbsp;<i>FROM</i> orders JOIN payments</code>
                      <code>) <i>SELECT</i> * <i>FROM</i> customer_value;</code>
                    </div>
                    <div className="sql-visual__dashboard">
                      <div><strong>10万+</strong><span>订单记录</span></div>
                      <div><strong>9 张关联表</strong><span>数据建模</span></div>
                      <div><strong>CTE</strong><span>复杂查询</span></div>
                      <div><strong>窗口函数</strong><span>用户价值</span></div>
                    </div>
                    <div className="sql-visual__metrics"><span>GMV</span><span>客单价</span><span>复购率</span><span>履约及时率</span></div>
                  </div>
                ) : (
                  <div className="research-visual" aria-label="AI 共情研究关键数据">
                    <span>AI EMPATHY</span><b>N = 240</b><div><i>社会支持 ↑</i><i>预期违背 ↑</i></div><small>社会框架提示 → 修复意愿显著提升</small>
                  </div>
                )}
                <span className="project-card__number">0{index + 1}</span>
              </div>
              <div className="project-card__copy">
                <div className="project-card__meta"><span>{project.category}</span><b>{project.proof}</b></div>
                <h3>{project.title}</h3>
                <p className="project-card__role">{project.role}</p>
                <p className="project-card__summary">{project.summary}</p>
                <ul className="tags" aria-label={`${project.title} 能力标签`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          </WindowFrame>
        ))}
      </div>

      <section className="evidence" id="evidence" aria-labelledby="evidence-title">
        <WindowFrame title="RESEARCH_ACCEPTANCE.MSG" meta="VERIFIED" className="evidence-window">
          <div className="evidence-window__body">
            <div className="evidence-window__intro">
              <div className="evidence-seal" aria-hidden="true"><span>ICA</span><b>26</b></div>
              <div>
              <p className="profile-kicker">INTERNATIONAL COMMUNICATION ASSOCIATION</p>
              <h3 id="evidence-title">ICA 2026 · 两篇论文录用</h3>
              <p>围绕流媒体视频情绪、侵入式广告稳定性与受众定向反应开展实验研究，参与 ECG / HR 生理数据采集、LMM 分析与论文写作。</p>
              <span className="evidence-role">第一作者 / 共同第一作者</span>
              </div>
              <div className="evidence-status"><i />ACCEPTED<br /><small>CAPE TOWN · 2026</small></div>
            </div>
            <div className="evidence-gallery" aria-label="论文数据分析与录用证明">
              {[
                ["/works/research-chart-overview.png", "心率变化自然立方样条模型"],
                ["/works/research-chart-ad.png", "广告唤醒度与时间交互分析"],
                ["/works/research-chart-video.png", "视频唤醒度与时间交互分析"],
                ["/works/ica-acceptance-01.png", "ICA 2026 第一篇论文录用通知"],
                ["/works/ica-acceptance-02.png", "ICA 2026 第二篇论文录用通知"],
              ].map(([src, alt], index) => (
                <figure key={src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={alt} loading="lazy" />
                  <figcaption>{index < 3 ? `DATA ANALYSIS 0${index + 1}` : `ACCEPTANCE 0${index - 2}`}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </WindowFrame>
      </section>
    </section>
  );
}
