import { Check } from "lucide-react";

interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
          <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
