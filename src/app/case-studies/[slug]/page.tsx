import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { getProjectBySlug } from "@/data/projects";
import { TechStack } from "@/components/project/TechStack";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.problem.slice(0, 160),
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const project = getProjectBySlug(cs.projectSlug);
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const prev = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const next = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <>
      <ScrollProgress />
      <PageContainer className="py-12">
        <Breadcrumb items={[
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.title },
        ]} />

        <div className="max-w-3xl mx-auto">
          {project && (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-3"
            >
              {project.title}
              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            {cs.title}
          </h1>

          {project && (
            <div className="mb-8">
              <TechStack technologies={project.technologies} size="md" />
            </div>
          )}

          {/* Problem */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
              The Problem
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {cs.problem}
            </p>
          </section>

          {/* Approach */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
              The Approach
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
              {cs.approach}
            </p>
          </section>

          {/* Outcome */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
              The Outcome
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {cs.outcome}
            </p>
          </section>

          {/* Highlights */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
              Key Highlights
            </h2>
            <div className="space-y-3">
              {cs.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30"
                >
                  <Lightbulb size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Prev/Next */}
          <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8">
            {prev ? (
              <Link
                href={`/case-studies/${prev.slug}`}
                className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                <div>
                  <span className="text-xs text-zinc-400 block">Previous</span>
                  <span className="font-medium">{prev.title}</span>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/case-studies/${next.slug}`}
                className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-right"
              >
                <div>
                  <span className="text-xs text-zinc-400 block">Next</span>
                  <span className="font-medium">{next.title}</span>
                </div>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </PageContainer>
    </>
  );
}
