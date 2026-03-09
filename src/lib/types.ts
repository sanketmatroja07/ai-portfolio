export type ProjectType = "web" | "api" | "mobile" | "cli" | "library" | "platform";
export type ProjectStatus = "active" | "archived" | "wip";
export type TechCategory = "frontend" | "backend" | "database" | "ai" | "infrastructure" | "language" | "tool";

export interface Screenshot {
  id: string;
  url: string;
  caption: string;
  order: number;
}

export interface ProjectMetadata {
  entryPoint: string;
  buildCommand: string;
  runCommand: string;
  architecture: string;
  patterns: string[];
  features: string[];
  dependencyCount: number;
  hasDocker: boolean;
  hasTests: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  type: ProjectType;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  repoUrl: string | null;
  repoPath: string;
  technologies: string[];
  tags: string[];
  screenshots: Screenshot[];
  metadata: ProjectMetadata;
  caseStudySlug: string | null;
  gradient: string;
}

export interface Technology {
  id: string;
  slug: string;
  name: string;
  category: TechCategory;
  icon: string;
  color: string;
  projectCount: number;
}

export interface CaseStudy {
  id: string;
  slug: string;
  projectSlug: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  highlights: string[];
}
