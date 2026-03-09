import Link from "next/link";
import type { Metadata } from "next";
import { getTechnologiesByCategory, getUsedTechnologies } from "@/data/technologies";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Technologies",
  description: "The full technology stack used across all portfolio projects.",
};

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  ai: "AI & Machine Learning",
  language: "Languages",
  infrastructure: "Infrastructure",
  tool: "Tools",
};

export default function TechnologiesPage() {
  const grouped = getTechnologiesByCategory();
  const usedSlugs = new Set(getUsedTechnologies().map((t) => t.slug));

  const categories = Object.entries(grouped).filter(([, techs]) =>
    techs.some((t) => usedSlugs.has(t.slug))
  );

  return (
    <PageContainer className="py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Technologies
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          The tools and frameworks behind every project. Click to see projects using each.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map(([category, techs]) => {
          const usedTechs = techs.filter((t) => usedSlugs.has(t.slug));
          if (usedTechs.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                {categoryLabels[category] ?? category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {usedTechs.map((tech) => (
                  <Link
                    key={tech.slug}
                    href={`/technologies/${tech.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-sm"
                  >
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tech.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {tech.projectCount} {tech.projectCount === 1 ? "project" : "projects"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
