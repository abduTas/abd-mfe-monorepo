import { portfolio } from "@/data/portfolio";
import { ContactSection } from "./contact-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { HeroSection } from "./hero-section";
import { PortfolioFooter } from "./portfolio-footer";
import { PortfolioNav } from "./portfolio-nav";
import { SkillsSection } from "./skills-section";
import { SummarySection } from "./summary-section";

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PortfolioNav name={portfolio.name} navLinks={portfolio.navLinks} />
      <HeroSection
        name={portfolio.name}
        title={portfolio.title}
        tagline={portfolio.tagline}
        email={portfolio.email}
        phone={portfolio.phone}
        linkedin={portfolio.linkedin}
        photo={portfolio.photo}
        metrics={portfolio.metrics}
      />
      <SummarySection summary={portfolio.summary} />
      <SkillsSection skillCategories={portfolio.skillCategories} />
      <ExperienceSection experience={portfolio.experience} />
      <EducationSection degree={portfolio.education.degree} year={portfolio.education.year} />
      <ContactSection
        email={portfolio.email}
        phone={portfolio.phone}
        linkedin={portfolio.linkedin}
      />
      <PortfolioFooter name={portfolio.name} />
    </div>
  );
}
