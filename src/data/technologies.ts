import { Technology, TechCategory } from "@/lib/types";
import { projects } from "./projects";

const rawTechnologies: Omit<Technology, "projectCount">[] = [
  // Frontend
  { id: "t1", slug: "react", name: "React", category: "frontend", icon: "⚛️", color: "#61DAFB" },
  { id: "t2", slug: "nextjs", name: "Next.js", category: "frontend", icon: "▲", color: "#000000" },
  { id: "t3", slug: "vite", name: "Vite", category: "frontend", icon: "⚡", color: "#646CFF" },
  { id: "t4", slug: "tailwindcss", name: "Tailwind CSS", category: "frontend", icon: "🎨", color: "#06B6D4" },
  { id: "t5", slug: "framer-motion", name: "Framer Motion", category: "frontend", icon: "✨", color: "#FF0055" },
  { id: "t6", slug: "react-native", name: "React Native", category: "frontend", icon: "📱", color: "#61DAFB" },
  { id: "t7", slug: "expo", name: "Expo", category: "frontend", icon: "📲", color: "#000020" },
  { id: "t8", slug: "zustand", name: "Zustand", category: "frontend", icon: "🐻", color: "#443D2E" },
  { id: "t9", slug: "recharts", name: "Recharts", category: "frontend", icon: "📊", color: "#FF6B6B" },
  { id: "t10", slug: "leaflet", name: "Leaflet", category: "frontend", icon: "🗺️", color: "#199900" },

  // Backend
  { id: "t11", slug: "fastapi", name: "FastAPI", category: "backend", icon: "🚀", color: "#009688" },
  { id: "t12", slug: "firebase", name: "Firebase", category: "backend", icon: "🔥", color: "#FFCA28" },
  { id: "t13", slug: "celery", name: "Celery", category: "backend", icon: "🥬", color: "#37B24D" },

  // Database
  { id: "t14", slug: "postgresql", name: "PostgreSQL", category: "database", icon: "🐘", color: "#336791" },
  { id: "t15", slug: "mongodb", name: "MongoDB", category: "database", icon: "🍃", color: "#47A248" },
  { id: "t16", slug: "redis", name: "Redis", category: "database", icon: "🔴", color: "#DC382D" },
  { id: "t17", slug: "supabase", name: "Supabase", category: "database", icon: "⚡", color: "#3ECF8E" },
  { id: "t18", slug: "firestore", name: "Firestore", category: "database", icon: "📄", color: "#FFCA28" },

  // AI
  { id: "t19", slug: "openai", name: "OpenAI", category: "ai", icon: "🧠", color: "#412991" },
  { id: "t20", slug: "anthropic", name: "Anthropic Claude", category: "ai", icon: "🤖", color: "#D4A574" },
  { id: "t21", slug: "huggingface", name: "Hugging Face", category: "ai", icon: "🤗", color: "#FFD21E" },

  // Languages
  { id: "t22", slug: "typescript", name: "TypeScript", category: "language", icon: "🔷", color: "#3178C6" },
  { id: "t23", slug: "python", name: "Python", category: "language", icon: "🐍", color: "#3776AB" },
  { id: "t24", slug: "javascript", name: "JavaScript", category: "language", icon: "🟨", color: "#F7DF1E" },

  // Infrastructure
  { id: "t25", slug: "docker", name: "Docker", category: "infrastructure", icon: "🐳", color: "#2496ED" },
  { id: "t26", slug: "aws-lambda", name: "AWS Lambda", category: "infrastructure", icon: "☁️", color: "#FF9900" },
  { id: "t27", slug: "vercel", name: "Vercel", category: "infrastructure", icon: "▲", color: "#000000" },

  // Other
  { id: "t28", slug: "html", name: "HTML", category: "language", icon: "📄", color: "#E34F26" },
  { id: "t29", slug: "css", name: "CSS", category: "language" as TechCategory, icon: "🎨", color: "#1572B6" },
  { id: "t30", slug: "sql", name: "SQL", category: "language" as TechCategory, icon: "🗄️", color: "#336791" },
  { id: "t31", slug: "tableau", name: "Tableau", category: "tool" as TechCategory, icon: "📈", color: "#E97627" },
];

export const technologies: Technology[] = rawTechnologies.map((tech) => ({
  ...tech,
  projectCount: projects.filter((p) => p.technologies.includes(tech.slug)).length,
}));

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return technologies.find((t) => t.slug === slug);
}

export function getTechnologiesByCategory(): Record<string, Technology[]> {
  const grouped: Record<string, Technology[]> = {};
  for (const tech of technologies) {
    if (!grouped[tech.category]) grouped[tech.category] = [];
    grouped[tech.category].push(tech);
  }
  return grouped;
}

export function getUsedTechnologies(): Technology[] {
  return technologies.filter((t) => t.projectCount > 0);
}
