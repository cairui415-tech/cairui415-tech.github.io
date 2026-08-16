import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Strengths } from "./components/Strengths";
import { portfolioContent } from "./content";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero profile={portfolioContent.profile} />
        <Experience profile={portfolioContent.profile} experiences={portfolioContent.experiences} />
        <Projects projects={portfolioContent.projects} />
        <Strengths strengths={portfolioContent.strengths} />
        <Skills groups={portfolioContent.skillGroups} tools={portfolioContent.tools} />
        <Contact profile={portfolioContent.profile} />
      </main>
    </>
  );
}
