"use client";

import Link from "next/link";
import { Marquee } from "@/components/effects/Marquee";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Technology } from "@/lib/types";

interface TechMarqueeProps {
  technologies: Technology[];
}

export function TechMarquee({ technologies }: TechMarqueeProps) {
  const half = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, half);
  const row2 = technologies.slice(half);

  return (
    <AnimatedSection>
      <div className="space-y-4">
        <Marquee speed={40} className="py-2">
          {row1.map((tech) => (
            <TechPill key={tech.slug} tech={tech} />
          ))}
        </Marquee>
        <Marquee speed={35} reverse className="py-2">
          {row2.map((tech) => (
            <TechPill key={tech.slug} tech={tech} />
          ))}
        </Marquee>
      </div>
    </AnimatedSection>
  );
}

function TechPill({ tech }: { tech: Technology }) {
  return (
    <Link
      href={`/technologies/${tech.slug}`}
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl glass hover:scale-105 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group whitespace-nowrap"
    >
      <span className="text-lg">{tech.icon}</span>
      <span className="font-medium text-sm text-zinc-900 dark:text-white group-hover:gradient-text transition-colors">
        {tech.name}
      </span>
      <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
        {tech.projectCount}
      </span>
    </Link>
  );
}
