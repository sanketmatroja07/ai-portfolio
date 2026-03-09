"use client";

import { useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { projects, filterProjects } from "@/data/projects";
import { getUsedTechnologies } from "@/data/technologies";
import { ProjectCard } from "@/components/project/ProjectCard";
import { SearchBar } from "@/components/filter/SearchBar";
import { TechFilter } from "@/components/filter/TechFilter";
import { ActiveFilters } from "@/components/filter/ActiveFilters";
import { EmptyState } from "@/components/feedback/EmptyState";
import { PageContainer } from "@/components/layout/PageContainer";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const techs = useMemo(() => getUsedTechnologies(), []);

  const searchQuery = searchParams.get("q") || "";
  const selectedTechs = useMemo(() => {
    const techParam = searchParams.get("tech");
    return techParam ? techParam.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: { q?: string; tech?: string[] }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.q !== undefined) {
        if (updates.q) params.set("q", updates.q);
        else params.delete("q");
      }

      if (updates.tech !== undefined) {
        if (updates.tech.length > 0) params.set("tech", updates.tech.join(","));
        else params.delete("tech");
      }

      const qs = params.toString();
      router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
    },
    [searchParams, router]
  );

  const filtered = useMemo(
    () =>
      filterProjects({
        technologies: selectedTechs.length > 0 ? selectedTechs : undefined,
        search: searchQuery || undefined,
      }),
    [searchQuery, selectedTechs]
  );

  return (
    <PageContainer className="py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          {projects.length} AI-powered platforms, tools, and production systems.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <SearchBar
          onSearch={(q) => updateParams({ q })}
          placeholder="Search projects, technologies, or tags..."
          initialValue={searchQuery}
        />
        <TechFilter
          technologies={techs}
          selected={selectedTechs}
          onChange={(tech) => updateParams({ tech })}
        />
        <div className="flex items-center justify-between">
          <ActiveFilters
            techFilters={selectedTechs}
            searchQuery={searchQuery}
            onRemoveTech={(slug) =>
              updateParams({ tech: selectedTechs.filter((s) => s !== slug) })
            }
            onClearSearch={() => updateParams({ q: "" })}
            onClearAll={() => updateParams({ q: "", tech: [] })}
          />
          <p className="text-xs text-zinc-500" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"} found
          </p>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects found"
          description="Try adjusting your filters or search query."
          action={
            <button
              onClick={() => updateParams({ q: "", tech: [] })}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Clear all filters
            </button>
          }
        />
      )}
    </PageContainer>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsContent />
    </Suspense>
  );
}
