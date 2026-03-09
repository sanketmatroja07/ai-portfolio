import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTechnologyBySlug } from "@/data/technologies";

interface TechBadgeProps {
  slug: string;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

export function TechBadge({ slug, size = "sm", interactive = true }: TechBadgeProps) {
  const tech = getTechnologyBySlug(slug);
  if (!tech) return null;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm",
  };

  const badge = (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
        "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        interactive && "hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer",
        sizeClasses[size]
      )}
    >
      <span className="text-[0.7em]">{tech.icon}</span>
      {tech.name}
    </span>
  );

  if (interactive) {
    return <Link href={`/technologies/${tech.slug}`}>{badge}</Link>;
  }

  return badge;
}
