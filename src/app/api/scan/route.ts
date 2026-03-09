import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile, stat } from "fs/promises";
import { join } from "path";

const PROJECT_INDICATORS = [
  "package.json",
  "requirements.txt",
  "pyproject.toml",
  "Dockerfile",
  "docker-compose.yml",
  "go.mod",
  "Cargo.toml",
  "build.gradle",
  "composer.json",
  "Makefile",
];

interface ScannedProject {
  name: string;
  path: string;
  indicators: string[];
  language: string | null;
  framework: string | null;
}

async function detectFramework(projectPath: string): Promise<{ language: string | null; framework: string | null }> {
  try {
    const pkgPath = join(projectPath, "package.json");
    const pkgStat = await stat(pkgPath).catch(() => null);
    if (pkgStat) {
      const content = JSON.parse(await readFile(pkgPath, "utf-8"));
      const deps = { ...content.dependencies, ...content.devDependencies };
      if (deps["next"]) return { language: "TypeScript", framework: "Next.js" };
      if (deps["react-native"] || deps["expo"]) return { language: "TypeScript", framework: "React Native" };
      if (deps["react"]) return { language: "TypeScript", framework: "React" };
      if (deps["vue"]) return { language: "TypeScript", framework: "Vue" };
      if (deps["express"]) return { language: "JavaScript", framework: "Express" };
      return { language: "JavaScript", framework: null };
    }

    const reqPath = join(projectPath, "requirements.txt");
    const reqStat = await stat(reqPath).catch(() => null);
    if (reqStat) {
      const content = await readFile(reqPath, "utf-8");
      if (content.includes("fastapi")) return { language: "Python", framework: "FastAPI" };
      if (content.includes("django")) return { language: "Python", framework: "Django" };
      if (content.includes("flask")) return { language: "Python", framework: "Flask" };
      return { language: "Python", framework: null };
    }

    const goMod = join(projectPath, "go.mod");
    if (await stat(goMod).catch(() => null)) return { language: "Go", framework: null };

    const cargo = join(projectPath, "Cargo.toml");
    if (await stat(cargo).catch(() => null)) return { language: "Rust", framework: null };

    return { language: null, framework: null };
  } catch {
    return { language: null, framework: null };
  }
}

async function scanDirectory(dirPath: string): Promise<ScannedProject[]> {
  const projects: ScannedProject[] = [];

  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    const indicators: string[] = [];

    for (const entry of entries) {
      if (PROJECT_INDICATORS.includes(entry.name)) {
        indicators.push(entry.name);
      }
    }

    if (indicators.length > 0) {
      const { language, framework } = await detectFramework(dirPath);
      projects.push({
        name: dirPath.split("/").pop() || "unknown",
        path: dirPath,
        indicators,
        language,
        framework,
      });
    }

    for (const entry of entries) {
      if (
        entry.isDirectory() &&
        !entry.name.startsWith(".") &&
        !["node_modules", "dist", "build", ".next", "__pycache__", "venv"].includes(entry.name)
      ) {
        const subProjects = await scanDirectory(join(dirPath, entry.name));
        projects.push(...subProjects);
      }
    }
  } catch {
    // Skip directories we can't read
  }

  return projects;
}

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.SCAN_API_KEY && process.env.SCAN_API_KEY) {
    return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Invalid API key", status: 401 } }, { status: 401 });
  }

  try {
    const body = await request.json();
    const paths: string[] = body.paths || ["/Users/sanket"];

    const allProjects: ScannedProject[] = [];
    for (const scanPath of paths) {
      const found = await scanDirectory(scanPath);
      allProjects.push(...found);
    }

    return NextResponse.json({
      scanned: paths,
      projectsFound: allProjects.length,
      projects: allProjects,
    });
  } catch (error) {
    return NextResponse.json(
      { error: { code: "SCAN_FAILED", message: String(error), status: 500 } },
      { status: 500 }
    );
  }
}
