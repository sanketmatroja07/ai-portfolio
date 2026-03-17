"use client";

import { TiltCard } from "@/components/effects/TiltCard";
import { SpotlightCard } from "@/components/effects/SpotlightCard";

interface ContactSocialCardProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}

export function ContactSocialCard({ href, icon, label, value, external }: ContactSocialCardProps) {
  return (
    <TiltCard className="rounded-xl" maxTilt={6}>
      <SpotlightCard className="rounded-xl" spotlightColor="rgba(59, 130, 246, 0.06)">
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-300/50 dark:hover:border-blue-700/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">{label}</p>
            <p className="text-xs text-zinc-500">{value}</p>
          </div>
        </a>
      </SpotlightCard>
    </TiltCard>
  );
}
