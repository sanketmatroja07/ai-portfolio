import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { getUsedTechnologies } from "@/data/technologies";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "About",
  description: "AI Engineer building production AI systems. I build AI-powered products that actually work — not prototypes, not demos, shipped systems.",
};

export default function AboutPage() {
  const techs = getUsedTechnologies();

  return (
    <PageContainer className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
          About
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I&apos;m Sanket Matroja. I build AI-powered products that actually work
            in production. Not prototypes. Not demos. Shipped systems used by real users.
          </p>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            My work spans {projects.length} projects using {techs.length}+ technologies —
            from AI-powered fraud detection engines (RiskPulse) to algorithmic
            recommendation systems with zero LLM cost (Coffee Sommelier),
            to NLP sentiment pipelines with 3-tier fallback chains (Mind Mirror),
            to GPT-4 signal intelligence platforms (SignalVault).
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8 mb-3">
            AI Philosophy
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mb-8">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8 mb-3">
            Core Stack
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <strong>AI/ML:</strong> OpenAI GPT-4, Anthropic Claude, Hugging Face, TextBlob, Sentence Transformers
            <br />
            <strong>Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS, React Native
            <br />
            <strong>Backend:</strong> FastAPI, Python, Node.js, Celery
            <br />
            <strong>Data:</strong> PostgreSQL, MongoDB, Redis, Supabase, Firebase
            <br />
            <strong>Infrastructure:</strong> Docker, AWS Lambda, Vercel
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            See What I&apos;ve Built
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
