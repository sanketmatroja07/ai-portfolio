import type { NextConfig } from "next";
import path from "node:path";

const projectRoot = __dirname;

const nextConfig: NextConfig = {
  turbopack: {
    // Multiple lockfiles under ~/CODEX AI/ make Next infer the wrong root; pin to this app.
    root: projectRoot,
    resolveAlias: {
      // Otherwise @import "tailwindcss" can resolve from the parent monorepo package.json.
      tailwindcss: path.join(projectRoot, "node_modules/tailwindcss"),
      "@tailwindcss/postcss": path.join(
        projectRoot,
        "node_modules/@tailwindcss/postcss"
      ),
    },
  },
};

export default nextConfig;
