import { TechBadge } from "./TechBadge";

interface TechStackProps {
  technologies: string[];
  size?: "sm" | "md" | "lg";
}

export function TechStack({ technologies, size = "sm" }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {technologies.map((slug) => (
        <TechBadge key={slug} slug={slug} size={size} />
      ))}
    </div>
  );
}
