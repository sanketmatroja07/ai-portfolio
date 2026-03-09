import { NextRequest, NextResponse } from "next/server";
import { projects, filterProjects } from "@/data/projects";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const tech = searchParams.get("tech");
  const tag = searchParams.get("tag");
  const type = searchParams.get("type");
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");

  let result = filterProjects({
    technologies: tech ? tech.split(",") : undefined,
    tags: tag ? tag.split(",") : undefined,
    type: type as "web" | "api" | "mobile" | "platform" | undefined,
    search: search || undefined,
  });

  if (featured === "true") {
    result = result.filter((p) => p.featured);
  }

  const summary = result.map((p) => ({
    slug: p.slug,
    title: p.title,
    shortDescription: p.shortDescription,
    type: p.type,
    status: p.status,
    featured: p.featured,
    technologies: p.technologies,
    tags: p.tags,
    gradient: p.gradient,
  }));

  return NextResponse.json({ projects: summary, total: summary.length });
}
