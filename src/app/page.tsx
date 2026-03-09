import Link from "next/link";
import { ArrowRight, Brain, Cpu, Rocket, Zap } from "lucide-react";
import { getFeaturedProjects, projects } from "@/data/projects";
import { getUsedTechnologies } from "@/data/technologies";
import { caseStudies } from "@/data/case-studies";
import { ProjectCard } from "@/components/project/ProjectCard";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { StatCard } from "@/components/content/StatCard";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { AnimatedSection, StaggeredGrid, StaggeredItem } from "@/components/ui/AnimatedSection";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const techs = getUsedTechnologies();

  const aiPlatformCount = projects.filter((p) =>
    p.technologies.some((t) => ["openai", "anthropic", "huggingface"].includes(t)) ||
    p.tags.some((t) => ["ai", "nlp", "sentiment-analysis"].includes(t))
  ).length;

  const aiToolCount = techs.filter((t) =>
    ["openai", "anthropic", "huggingface", "celery"].includes(t.slug) ||
    t.category === "ai"
  ).length;

  const stats = [
    { label: "AI-Powered Platforms", value: String(aiPlatformCount), icon: <Brain size={20} /> },
    { label: "AI/ML Tools Mastered", value: String(aiToolCount), icon: <Cpu size={20} /> },
    { label: "Projects Shipped", value: String(projects.length), icon: <Rocket size={20} /> },
    { label: "Production Systems", value: String(projects.filter((p) => p.type === "platform" || p.type === "web").length), icon: <Zap size={20} /> },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <AnimatedSection className="max-w-3xl">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4 tracking-wide uppercase">
              AI Engineer
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              I build AI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                that ships.
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Fraud detection engines. Recommendation systems. NLP sentiment pipelines.
              LLM-powered tools. I don&apos;t just use AI — I architect the systems
              that make it useful. From data pipeline to production deployment.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors active:scale-[0.98]"
              >
                See What I&apos;ve Built
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors active:scale-[0.98]"
              >
                Have an AI Problem?
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <SectionWrapper>
        <StaggeredGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StaggeredItem key={stat.label}>
              <StatCard {...stat} />
            </StaggeredItem>
          ))}
        </StaggeredGrid>
      </SectionWrapper>

      {/* Featured Projects */}
      <SectionWrapper
        title="AI Systems I've Built"
        subtitle="Production-grade AI platforms — from fraud detection to NLP pipelines to recommendation engines."
        dark
      >
        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <StaggeredItem key={project.id}>
              <ProjectCard project={project} variant="featured" />
            </StaggeredItem>
          ))}
        </StaggeredGrid>
        <AnimatedSection delay={0.3} className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View all {projects.length} projects
            <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </SectionWrapper>

      {/* Technology Overview */}
      <SectionWrapper
        title="My AI & Engineering Stack"
        subtitle="The AI frameworks, languages, and infrastructure I use to build production systems."
      >
        <AnimatedSection>
          <div className="flex flex-wrap gap-3">
            {techs.map((tech) => (
              <Link
                key={tech.slug}
                href={`/technologies/${tech.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-sm text-sm"
              >
                <span>{tech.icon}</span>
                <span className="font-medium text-zinc-900 dark:text-white">
                  {tech.name}
                </span>
                <span className="text-xs text-zinc-400">
                  {tech.projectCount} {tech.projectCount === 1 ? "project" : "projects"}
                </span>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* Case Studies */}
      <SectionWrapper
        title="How I Solve Hard AI Problems"
        subtitle="Deep dives into the AI architecture decisions, trade-offs, and outcomes behind key projects."
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

      {/* CTA */}
      <section className="py-24">
        <AnimatedSection className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Have an AI problem that needs solving?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8">
            I turn &quot;we need AI for X&quot; into shipped products.
            Tell me what you&apos;re building.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors active:scale-[0.98]"
          >
            Let&apos;s Talk
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
