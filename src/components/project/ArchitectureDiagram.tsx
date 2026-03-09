import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  patterns: string[];
  architecture: string;
}

export function ArchitectureDiagram({ patterns, architecture }: ArchitectureDiagramProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-6 border border-zinc-200 dark:border-zinc-700">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Architecture
        </h4>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 font-mono">
          {architecture}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
          Key Patterns
        </h4>
        <div className="grid gap-2">
          {patterns.map((pattern, i) => (
            <div
              key={pattern}
              className={cn(
                "flex items-start gap-3 rounded-lg p-3",
                "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              )}
            >
              <span className="text-xs font-mono text-zinc-400 mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {pattern}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
