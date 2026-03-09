import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { projects, getProjectBySlug, getProjectsByTechnology } from "@/data/projects";
import { getCaseStudyForProject } from "@/data/case-studies";
import { TechStack } from "@/components/project/TechStack";
import { FeatureList } from "@/components/project/FeatureList";
import { MetadataTable } from "@/components/project/MetadataTable";
import { ArchitectureDiagram } from "@/components/project/ArchitectureDiagram";
import { ProjectCard } from "@/components/project/ProjectCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const caseStudy = getCaseStudyForProject(project.slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const related = project.technologies
    .flatMap((t) => getProjectsByTechnology(t))
    .filter((p, i, arr) => p.slug !== project.slug && arr.findIndex((a) => a.slug === p.slug) === i)
    .slice(0, 3);

  return (
    <PageContainer className="py-12">
      <Breadcrumb items={[
        { label: "Projects", href: "/projects" },
        { label: project.title },
      ]} />

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
        <div
          className={cn(
            "lg:col-span-3 h-64 lg:h-auto rounded-2xl bg-gradient-to-br flex items-center justify-center",
            project.gradient
          )}
        >
          <span className="text-6xl text-white/20 font-bold">{project.title[0]}</span>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium capitalize">
              {project.type}
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium capitalize">
              {project.status}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            {project.title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            {project.shortDescription}
          </p>
          <TechStack technologies={project.technologies} size="md" />
          <div className="flex gap-3 mt-6">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                <Github size={14} aria-hidden="true" />
                Repository
              </a>
            )}
            {caseStudy && (
              <Link
                href={`/case-studies/${caseStudy.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <ExternalLink size={14} aria-hidden="true" />
                Read Case Study
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
              Overview
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
              Key Features
            </h2>
            <FeatureList features={project.metadata.features} />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Technical Details
          </h2>
          <MetadataTable metadata={project.metadata} />
        </div>
      </div>

      {/* Architecture */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Architecture & Patterns
        </h2>
        <ArchitectureDiagram
          architecture={project.metadata.architecture}
          patterns={project.metadata.patterns}
        />
      </div>

      {/* Prev/Next Navigation */}
      <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8 mb-12">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
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
            href={`/projects/${next.slug}`}
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

      {/* Related Projects */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
            Related Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
