import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  variant?: "skeleton" | "spinner";
}

export function LoadingState({ variant = "spinner" }: LoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div className="space-y-4 animate-pulse" aria-busy="true" aria-label="Loading content">
        <div className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12" role="status" aria-busy="true" aria-label="Loading">
      <Loader2 size={24} className="animate-spin text-blue-600" aria-hidden="true" />
    </div>
  );
}
