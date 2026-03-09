"use client";

import { X } from "lucide-react";
import { getTechnologyBySlug } from "@/data/technologies";

interface ActiveFiltersProps {
  techFilters: string[];
  searchQuery: string;
  onRemoveTech: (slug: string) => void;
  onClearSearch: () => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  techFilters,
  searchQuery,
  onRemoveTech,
  onClearSearch,
  onClearAll,
}: ActiveFiltersProps) {
  const hasFilters = techFilters.length > 0 || searchQuery.length > 0;
  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" role="status" aria-live="polite">
      <span className="text-xs text-zinc-500 dark:text-zinc-400">Active:</span>
      {techFilters.map((slug) => {
        const tech = getTechnologyBySlug(slug);
        return (
          <button
            key={slug}
            onClick={() => onRemoveTech(slug)}
            aria-label={`Remove ${tech?.name ?? slug} filter`}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
          >
            {tech?.name ?? slug}
            <X size={10} aria-hidden="true" />
          </button>
        );
      })}
      {searchQuery && (
        <button
          onClick={onClearSearch}
          aria-label={`Remove search for "${searchQuery}"`}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
        >
          &quot;{searchQuery}&quot;
          <X size={10} aria-hidden="true" />
        </button>
      )}
      <button
        onClick={onClearAll}
        className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 rounded"
      >
        Clear all
      </button>
    </div>
  );
}
