import type { ExperienceItem, PortfolioContent } from "../content";
import { ProfileCard } from "./ProfileCard";
import { WindowFrame } from "./WindowFrame";

type Props = {
  profile: PortfolioContent["profile"];
  experiences: ExperienceItem[];
};

export function Experience({ profile, experiences }: Props) {
  const preferredOrder = ["上观新闻", "德邦基金", "元诚私募"];
  const orderedExperiences = [...experiences].sort((a, b) => {
    const rank = (organization: string) => preferredOrder.findIndex((name) => organization.includes(name));
    return rank(a.organization) - rank(b.organization);
  });

  return (
    <section className="section experience" id="about" aria-labelledby="about-title">
      <div className="section-index"><span>01</span><p>PROFILE / EXPERIENCE</p></div>
      <div className="section-heading section-heading--split">
        <h2 id="about-title">用研究建立判断，<br />用表达推动行动。</h2>
        <p>{profile.introduction}</p>
      </div>

      <div className="about-windows about-windows--single">
        <WindowFrame title="READ_ME.TXT" meta="PROFILE" className="profile-window">
          <div className="profile-window__body">
            <ProfileCard
              avatarUrl="/profile/cai-rui-profile.png"
              name={profile.name}
              title="Research · Data · AI"
              handle="cairui"
              contactHref={`mailto:${profile.email}`}
            />
            <div className="profile-copy">
              <p className="profile-kicker">HELLO, I’M</p>
              <h3>{profile.name}</h3>
              <p>{profile.education}</p>
              <p>{profile.location} · {profile.languages}</p>
              <p className="profile-courses-label">核心课程</p>
              <ul className="profile-courses" aria-label="核心课程">
                {profile.courses.map((course) => <li key={course}>{course}</li>)}
              </ul>
            </div>
          </div>
        </WindowFrame>
      </div>

      <div className="timeline-wrap">
        <p className="timeline-title">EXPERIENCE.LOG</p>
        <ol className="timeline">
          {orderedExperiences.map((item, index) => (
            <li key={`${item.organization}-${item.role}`}>
              <div className="timeline__mark" aria-hidden="true">{item.mark}</div>
              <p className="timeline__period">{item.period}</p>
              <div className="timeline__content">
                <span>0{index + 1}</span>
                <h3>{item.organization}</h3>
                <p className="timeline__role">{item.role}</p>
                <p className="timeline__focus">{item.focus}</p>
                <ul className="timeline__details">
                  {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                {item.outcomes ? (
                  <dl className="experience-outcomes">
                    {item.outcomes.map((outcome) => <div key={outcome.label}><dt>{outcome.value}</dt><dd>{outcome.label}</dd></div>)}
                  </dl>
                ) : null}
                {item.media ? (
                  <div className="experience-media" aria-label="比亚迪深度研究材料">
                    <div className="experience-media__heading"><span>BYD_DEEP_RESEARCH.XLSX</span><small>德邦基金 · 研究底稿节选</small></div>
                    <div className="experience-media__grid">
                      {item.media.map((media) => (
                        <figure className={`experience-media__figure experience-media__figure--${media.view}`} key={media.src}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={media.src} alt={media.alt} loading="lazy" />
                          <figcaption>{media.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ) : null}
                {item.videos ? (
                  <div className="experience-videos">
                    <div className="experience-videos__heading"><span>上官河 / 两山理念视频作品</span><small>03 FILES · 上观新闻实习</small></div>
                    <div className="experience-videos__grid">
                      {item.videos.map((video) => (
                        <figure key={video.src}>
                          <video controls muted playsInline preload="metadata" aria-label={video.label}>
                            <source src={video.src} type="video/mp4" />
                          </video>
                          <figcaption>{video.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
