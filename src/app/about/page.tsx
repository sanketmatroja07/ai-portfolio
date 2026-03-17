import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { getUsedTechnologies } from "@/data/technologies";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedSection, StaggeredGrid, StaggeredItem } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About",
  description: "AI Engineer building production AI systems. I build AI-powered products that actually work — not prototypes, not demos, shipped systems.",
};

export default function AboutPage() {
  const techs = getUsedTechnologies();

  const philosophyItems = [
    {
      title: "AI is a tool, not a feature",
      desc: "I don't add AI for the buzzword. Every model, every pipeline, every LLM call solves a specific user problem.",
    },
    {
      title: "Deterministic when possible, intelligent when necessary",
      desc: "I built a recommendation engine with zero LLM cost using cosine similarity. I use GPT-4 when the problem demands it. I always know why.",
    },
    {
      title: "Resilient AI pipelines",
      desc: "My systems don't break when the API goes down. 3-tier fallbacks, LRU caches, graceful degradation. Zero downtime for AI features.",
    },
    {
      title: "Ship, then optimize",
      desc: "I get AI into production fast, measure what matters, and iterate. No research rabbit holes. No perfect-model paralysis.",
    },
  ];

  return (
    <PageContainer className="py-12">
      <div className="max-w-3xl">
        <AnimatedSection>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I&apos;m Sanket Matroja. I build AI-powered products that actually work
              in production. Not prototypes. Not demos.{" "}
              <span className="text-zinc-900 dark:text-white font-medium">Shipped systems used by real users.</span>
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              My work spans {projects.length} projects using {techs.length}+ technologies —
              from AI-powered fraud detection engines (RiskPulse) to algorithmic
              recommendation systems with zero LLM cost (Coffee Sommelier),
              to NLP sentiment pipelines with 3-tier fallback chains (Mind Mirror),
              to GPT-4 signal intelligence platforms (SignalVault).
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">
            AI Philosophy
          </h2>
        </AnimatedSection>

        <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {philosophyItems.map((item) => (
            <StaggeredItem key={item.title}>
              <div className="p-5 rounded-xl glass group hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1.5 group-hover:gradient-text transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            </StaggeredItem>
          ))}
        </StaggeredGrid>

        <AnimatedSection delay={0.3}>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">
            Core Stack
          </h2>
          <div className="p-5 rounded-xl glass space-y-2">
            {[
              { label: "AI/ML", value: "OpenAI GPT-4, Anthropic Claude, Hugging Face, TextBlob, Sentence Transformers" },
              { label: "Frontend", value: "React, Next.js, TypeScript, Tailwind CSS, React Native" },
              { label: "Backend", value: "FastAPI, Python, Node.js, Celery" },
              { label: "Data", value: "PostgreSQL, MongoDB, Redis, Supabase, Firebase" },
              { label: "Infrastructure", value: "Docker, AWS Lambda, Vercel" },
            ].map((row) => (
              <div key={row.label} className="flex gap-3">
                <span className="text-sm font-semibold gradient-text whitespace-nowrap min-w-[100px]">
                  {row.label}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{row.value}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:shadow-lg active:scale-[0.98]"
          >
            See What I&apos;ve Built
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>
    </PageContainer>
  );
}
