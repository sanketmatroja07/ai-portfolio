"use client";

import { Download, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ResumeContent() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Print-only styles injected via style tag to avoid Turbopack CSS parsing issues */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; color: black !important; }
          nav, footer { display: none !important; }
          main { padding-top: 0 !important; min-height: auto !important; }
          @page { margin: 0.4in 0.5in; size: letter; }
        }
      `}} />
      {/* Toolbar - hidden in print */}
      <div className="print:hidden sticky top-16 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98]"
          >
            <Printer size={14} />
            Save as PDF
          </button>
        </div>
      </div>

      {/* Resume Paper */}
      <div className="mx-auto max-w-4xl px-6 py-8 print:p-0 print:max-w-none">
        <div className="bg-white dark:bg-zinc-950 shadow-xl print:shadow-none rounded-lg print:rounded-none overflow-hidden">
          <div className="px-10 py-8 print:px-8 print:py-6 space-y-6 text-zinc-800 dark:text-zinc-200 print:text-black print:dark:text-black [&_*]:print:!text-black [&_*]:print:!border-zinc-300">

            {/* Header */}
            <header className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-5">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                SANKET MATROJA
              </h1>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                New York, NY 10038 &middot; (201) 856-1595 &middot;{" "}
                <a href="mailto:sanketmatroja07@gmail.com" className="text-blue-600 dark:text-blue-400 print:text-black print:no-underline">
                  sanketmatroja07@gmail.com
                </a>
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <a href="https://linkedin.com/in/sanketmatroja07" className="text-blue-600 dark:text-blue-400 print:text-black">linkedin.com/in/sanketmatroja07</a>
                {" "}&middot;{" "}
                <a href="https://github.com/sanketmatroja07" className="text-blue-600 dark:text-blue-400 print:text-black">github.com/sanketmatroja07</a>
                {" "}&middot;{" "}
                <a href="https://sanketmatroja.com" className="text-blue-600 dark:text-blue-400 print:text-black">sanketmatroja.com</a>
              </p>
            </header>

            {/* Summary */}
            <Section title="SUMMARY">
              <p className="text-sm leading-relaxed">
                AI Engineer with full-stack expertise building production AI systems — fraud detection platforms,
                algorithmic recommendation engines, NLP sentiment pipelines, and LLM-powered tools. 14 shipped
                projects across 30+ technologies. I architect resilient AI systems with deterministic fallbacks,
                composable rule engines, and zero-downtime pipelines. MS Computer Science (GPA 3.77) with
                professional experience building data pipelines processing 50K+ records daily.
              </p>
            </Section>

            {/* Technical Skills */}
            <Section title="TECHNICAL SKILLS">
              <div className="space-y-1.5 text-sm">
                <SkillRow label="AI / ML" value="OpenAI GPT-4, Anthropic Claude, Hugging Face Transformers, TextBlob, Sentence Transformers, Cosine Similarity, MMR Diversification, Sentiment Analysis, NLP Pipelines" />
                <SkillRow label="Frontend" value="React 19, Next.js 14/16, TypeScript, Tailwind CSS, Framer Motion, React Native (Expo), Zustand, Recharts, Leaflet" />
                <SkillRow label="Backend" value="FastAPI, Python, Node.js, Express.js, Celery, REST API Design, WebSocket, Background Workers" />
                <SkillRow label="Databases" value="PostgreSQL, MongoDB, Redis, Supabase, Firebase/Firestore, SQLite, SQL (CTEs, window functions, query optimization)" />
                <SkillRow label="Infrastructure" value="Docker, AWS (S3, Lambda, EC2, RDS, Kinesis), Vercel, CI/CD, Apache Kafka" />
                <SkillRow label="Practices" value="System Design, Microservices, Monorepo Architecture, ETL Pipelines, RBAC, Schema Migration, Caching (LRU), Rate Limiting" />
              </div>
            </Section>

            {/* Experience */}
            <Section title="PROFESSIONAL EXPERIENCE">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold">Data & AI Engineer</h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">Apr 2024 – Jul 2024</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm italic text-zinc-600 dark:text-zinc-400">LEAP (Contract)</p>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Kuala Lumpur, Malaysia</span>
                </div>
                <ul className="mt-1.5 space-y-1 text-sm list-disc pl-4">
                  <li>Designed automated ETL pipelines (Python, Pandas) extracting data from 4 e-commerce platform APIs, transforming 50,000+ records monthly into a centralized PostgreSQL data warehouse</li>
                  <li>Built data validation framework achieving 99% accuracy with automated anomaly detection, schema compliance checks, and business rule enforcement before production loading</li>
                  <li>Optimized PostgreSQL queries with indexing strategies and query plan analysis, improving analytics workload performance by 40% for BI tool consumption</li>
                  <li>Automated daily data collection with error handling and retry logic, reducing manual processing by 8 hours/week and achieving 99.5% pipeline uptime</li>
                  <li>Managed AWS S3 data infrastructure with lifecycle policies for cost optimization across raw, processed, and analytics data tiers</li>
                </ul>
              </div>
            </Section>

            {/* AI Projects */}
            <Section title="AI & FULL-STACK PROJECTS">
              <div className="space-y-4">

                <ProjectEntry
                  title="RiskPulse — AI Fraud Detection Platform"
                  tech="Next.js, FastAPI, PostgreSQL, Redis, Docker, OpenAI/Anthropic"
                  bullets={[
                    "Architected full-stack SaaS fraud detection platform with composable rule engine supporting 5 detection strategies (threshold, velocity, blacklist, pattern, composite) configurable by business analysts without engineering involvement",
                    "Built LLM-powered investigation narrative generation with graceful fallback to rule-based heuristics — zero downtime when AI APIs are unavailable",
                    "Implemented RBAC (4 roles), entity graph exploration, real-time dashboards, background Redis workers for async detection pipeline, and Stripe billing integration",
                  ]}
                />

                <ProjectEntry
                  title="Coffee Sommelier — Zero-LLM Recommendation Engine"
                  tech="Next.js, FastAPI, PostgreSQL, Python (scikit-learn)"
                  bullets={[
                    "Built deterministic recommendation engine using weighted cosine similarity + MMR diversification — sub-50ms latency, $0 LLM cost, serving 4 frontends through a single API",
                    "Implemented haversine geo-filtering and admin-configurable scoring weights for A/B testing across consumer, admin, widget, and B2B interfaces",
                  ]}
                />

                <ProjectEntry
                  title="Mind Mirror — NLP Journaling Platform with Zero-Downtime AI"
                  tech="React, FastAPI, MongoDB, Hugging Face, AWS Lambda"
                  bullets={[
                    "Engineered 3-tier sentiment pipeline: LRU cache (256 entries, 30-min TTL) → Hugging Face RoBERTa API (85% accuracy) → TextBlob fallback (70% accuracy) — zero user-facing failures",
                    "Achieved ~40% cache hit rate reducing API calls; dual deployment via Uvicorn + AWS Lambda (Mangum) with MongoDB connection pool optimization for cold starts",
                  ]}
                />

                <ProjectEntry
                  title="SignalVault — GPT-4 Market Intelligence Platform"
                  tech="Next.js, FastAPI, Supabase, Redis, Celery, OpenAI GPT-4"
                  bullets={[
                    "Built multi-source data aggregation pipeline (Reddit, Twitter, YouTube, Google Trends, HN, Product Hunt) with GPT-4 signal analysis and Supabase real-time storage",
                    "Implemented scheduled data collection with Celery + APScheduler for continuous market intelligence monitoring",
                  ]}
                />

              </div>
            </Section>

            {/* Education */}
            <Section title="EDUCATION">
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">Pace University – Seidenberg School of Computer Science</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Aug 2024 – May 2026</span>
                  </div>
                  <p className="text-sm">Master of Science, Computer Science — GPA: 3.77</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Database Systems, Data Engineering, Cloud Computing, Distributed Systems, Machine Learning, Algorithms</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">ITM Vocational University</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Jan 2021 – May 2024</span>
                  </div>
                  <p className="text-sm">Bachelor of Technology, Computer Science — GPA: 3.87</p>
                </div>
              </div>
            </Section>

            {/* Additional */}
            <Section title="ADDITIONAL">
              <div className="text-sm space-y-0.5">
                <p><span className="font-semibold">Work Authorization:</span> F-1 Student Visa, CPT/OPT Eligible</p>
                <p><span className="font-semibold">Availability:</span> Immediate for internships; Full-time after May 2026 graduation</p>
                <p><span className="font-semibold">Languages:</span> English (Fluent), Hindi (Native)</p>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 print:text-black border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SkillRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-semibold whitespace-nowrap min-w-[110px]">{label}:</span>
      <span className="text-zinc-600 dark:text-zinc-400">{value}</span>
    </div>
  );
}

function ProjectEntry({
  title,
  tech,
  bullets,
}: {
  title: string;
  tech: string;
  bullets: string[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">{tech}</p>
      <ul className="mt-1 space-y-1 text-sm list-disc pl-4">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
