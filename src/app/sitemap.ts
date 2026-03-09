import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getUsedTechnologies } from "@/data/technologies";
import { caseStudies } from "@/data/case-studies";

const BASE_URL = process.env.SITE_URL || "https://sanketmatroja.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/technologies`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const techPages: MetadataRoute.Sitemap = getUsedTechnologies().map((t) => ({
    url: `${BASE_URL}/technologies/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages, ...techPages, ...caseStudyPages];
}
