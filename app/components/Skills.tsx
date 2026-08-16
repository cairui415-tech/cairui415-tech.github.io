import type { SkillGroup, Tool } from "../content";
import { WindowFrame } from "./WindowFrame";

export function Skills({ groups, tools }: { groups: SkillGroup[]; tools: Tool[] }) {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="section-index"><span>04</span><p>TOOLBOX / CAPABILITIES</p></div>
      <div className="section-heading section-heading--split">
        <h2 id="skills-title">技能工具箱</h2>
        <p>工具服务于判断与交付。这里展示的是我实际使用过的研究、数据与 AI 工作流。</p>
      </div>

      <WindowFrame title="APPLICATIONS" meta={`${tools.length} ITEMS`} className="tools-window">
        <ul className="tool-grid" aria-label="常用软件与工具">
          {tools.map((tool) => (
            <li key={tool.name}>
              <span className={`tool-icon tool-icon--${tool.tone}`} aria-hidden="true">
                {tool.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tool.icon} alt="" />
                ) : tool.mark}
              </span>
              <b>{tool.name}</b>
            </li>
          ))}
        </ul>
      </WindowFrame>

      <div className="skill-list">
        {groups.map((group, index) => (
          <article className="skill-row" key={group.title}>
            <span className="skill-row__index">0{index + 1}</span>
            <div><h3>{group.title}</h3><p>{group.advantage}</p></div>
            <ul className="tags">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
