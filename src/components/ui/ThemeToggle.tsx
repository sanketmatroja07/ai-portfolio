"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const options = [
  { value: "light" as const, icon: Sun, label: "Light mode" },
  { value: "dark" as const, icon: Moon, label: "Dark mode" },
  { value: "system" as const, icon: Monitor, label: "System theme" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const order = ["light", "dark", "system"] as const;
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const current = options.find((o) => o.value === theme) || options[2];
  const Icon = current.icon;

  return (
    <button
      onClick={cycle}
      aria-label={current.label}
      title={current.label}
      className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
