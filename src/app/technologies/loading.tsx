import { LoadingState } from "@/components/feedback/LoadingState";

export default function TechnologiesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-5 w-80 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-24 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
