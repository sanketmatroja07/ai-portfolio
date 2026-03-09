import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { technologies, getTechnologyBySlug } from "@/data/technologies";
import { getProjectsByTechnology } from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

type TechPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return technologies.filter((t) => t.projectCount > 0).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: TechPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tech = getTechnologyBySlug(slug);
  if (!tech) return {};
  return {
    title: `${tech.name} Projects`,
    description: `All projects built with ${tech.name}.`,
  };
}

export default async function TechnologyDetailPage({ params }: TechPageProps) {
  const { slug } = await params;
  const tech = getTechnologyBySlug(slug);
  if (!tech) notFound();

  const techProjects = getProjectsByTechnology(tech.slug);

  return (
    <PageContainer className="py-12">
      <Breadcrumb items={[
        { label: "Technologies", href: "/technologies" },
        { label: tech.name },
      ]} />

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{tech.icon}</span>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {tech.name}
          </h1>
        </div>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {techProjects.length} {techProjects.length === 1 ? "project" : "projects"} built with {tech.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageContainer>
  );
}
