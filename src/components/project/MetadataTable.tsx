import { ProjectMetadata } from "@/lib/types";
import { Box, Play, Wrench, GitBranch, Package, Container } from "lucide-react";

interface MetadataTableProps {
  metadata: ProjectMetadata;
}

export function MetadataTable({ metadata }: MetadataTableProps) {
  const rows = [
    { icon: Box, label: "Entry Point", value: metadata.entryPoint },
    { icon: Wrench, label: "Build", value: metadata.buildCommand },
    { icon: Play, label: "Run", value: metadata.runCommand },
    { icon: GitBranch, label: "Architecture", value: metadata.architecture },
    { icon: Package, label: "Dependencies", value: String(metadata.dependencyCount) },
    { icon: Container, label: "Docker", value: metadata.hasDocker ? "Yes" : "No" },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-zinc-100 dark:border-zinc-800 last:border-0"
            >
              <td className="px-4 py-3 flex items-center gap-2 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                <row.icon size={14} />
                {row.label}
              </td>
              <td className="px-4 py-3 text-zinc-900 dark:text-zinc-200 font-mono text-xs">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
