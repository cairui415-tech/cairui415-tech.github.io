import type { Strength } from "../content";

export function Strengths({ strengths }: { strengths: Strength[] }) {
  return (
    <section className="section strengths" id="strengths" aria-labelledby="strengths-title">
      <div className="section-index"><span>03</span><p>WHAT I BRING</p></div>
      <div className="section-heading section-heading--split">
        <h2 id="strengths-title">四种能力，<br />同一个工作闭环。</h2>
        <p>不是孤立的工具清单，而是从发现问题、分析证据，到形成策略和完成表达的一整套方法。</p>
      </div>
      <div className="strength-grid">
        {strengths.map((strength) => (
          <article className="strength-card" key={strength.title}>
            <div className="strength-card__top"><span>{strength.index}</span><b aria-hidden="true">{strength.glyph}</b></div>
            <div><h3>{strength.title}</h3><p>{strength.description}</p></div>
            <span className="strength-card__status">READY ●</span>
          </article>
        ))}
      </div>
    </section>
  );
}
