import { LoadingState } from "@/components/feedback/LoadingState";

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-5 w-80 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingState key={i} variant="skeleton" />
        ))}
      </div>
    </div>
  );
}
