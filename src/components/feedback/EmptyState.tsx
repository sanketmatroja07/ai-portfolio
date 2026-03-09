import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
      <FolderOpen size={48} className="text-zinc-300 dark:text-zinc-600 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
