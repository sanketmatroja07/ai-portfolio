import Link from "next/link";
import { ArrowRight, Code2, Layers, GitBranch } from "lucide-react";
import { getFeaturedProjects, projects } from "@/data/projects";
import { getUsedTechnologies, getTechnologiesByCategory } from "@/data/technologies";
import { caseStudies } from "@/data/case-studies";
import { ProjectCard } from "@/components/project/ProjectCard";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { StaggeredGrid, StaggeredItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { HeroSection } from "@/components/hero/HeroSection";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const techs = getUsedTechnologies();
  const techsByCategory = getTechnologiesByCategory();

  const fullStackCount = projects.filter(
    (p) => p.technologies.includes("fastapi") || p.technologies.includes("firebase")
  ).length;

  return (
    <>
      {/* Cinematic Hero */}
      <HeroSection />

      {/* Featured Projects */}
      <SectionWrapper
        title="What I've Built"
        subtitle="Full-stack AI systems — from fraud detection to NLP pipelines to recommendation engines."
        dark
      >
        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <StaggeredItem key={project.id}>
              <ProjectCard project={project} variant="featured" />
            </StaggeredItem>
          ))}
        </StaggeredGrid>
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View all {projects.length} projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionWrapper>

      {/* Tech Stack - Clean grouped grid */}
      <SectionWrapper
        title="Engineering Stack"
        subtitle="Technologies I use daily to build and ship production systems."
      >
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techsByCategory)
              .filter(([, techs]) => techs.some((t) => t.projectCount > 0))
              .map(([category, categoryTechs]) => {
                const used = categoryTechs.filter((t) => t.projectCount > 0);
                if (used.length === 0) return null;
                const categoryLabels: Record<string, string> = {
                  frontend: "Frontend",
                  backend: "Backend",
                  database: "Data & Storage",
                  ai: "AI / ML",
                  language: "Languages",
                  infrastructure: "Infrastructure",
                  tool: "Tools",
                };
                return (
                  <div key={category} className="p-5 rounded-xl glass">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                      {categoryLabels[category] || category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {used.map((tech) => (
                        <Link
                          key={tech.slug}
                          href={`/technologies/${tech.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-blue-300/50 dark:hover:border-blue-700/30 transition-all duration-200 hover:shadow-sm group"
                        >
                          <span className="text-xs">{tech.icon}</span>
                          <span className="text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white font-medium">
                            {tech.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* Case Studies */}
      <SectionWrapper
        title="How I Think"
        subtitle="Architecture decisions, trade-offs, and outcomes behind key projects."
        dark
      >
        <StaggeredGrid className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <StaggeredItem key={cs.id}>
              <CaseStudyCard caseStudy={cs} />
            </StaggeredItem>
          ))}
        </StaggeredGrid>
      </SectionWrapper>
    </>
  );
}
