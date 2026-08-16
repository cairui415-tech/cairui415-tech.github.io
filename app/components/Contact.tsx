import type { PortfolioContent } from "../content";
import { WindowFrame } from "./WindowFrame";

export function Contact({ profile }: { profile: PortfolioContent["profile"] }) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__noise" aria-hidden="true" />
      <p className="contact__eyebrow">05 / LET’S MAKE SOMETHING USEFUL</p>
      <h2 id="contact-title">下一件值得<br />解决的事，<em>一起聊聊。</em></h2>
      <WindowFrame title="NEW_MESSAGE" meta="OPEN" className="contact-window">
        <div className="contact-window__body">
          <span>TO</span><a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>CALL</span><a href={`tel:${profile.phoneUri}`}>{profile.phone}</a>
          <span>BASE</span><p>{profile.location}</p>
          <a className="send-button" href={`mailto:${profile.email}?subject=作品集沟通`}>发送邮件 ↗</a>
        </div>
      </WindowFrame>
      <div className="contact__footer"><span>© 2026 CAI RUI</span><span>FUDAN UNIVERSITY · SHANGHAI</span><a href="#top">BACK TO TOP ↑</a></div>
    </section>
  );
}
