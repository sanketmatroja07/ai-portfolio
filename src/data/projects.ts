import { Project, ProjectType } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "riskpulse",
    title: "RiskPulse",
    shortDescription:
      "AI-powered fraud detection platform with composable rule engine, LLM-generated investigation narratives, and real-time risk scoring across the full Detect-Investigate-Mitigate lifecycle.",
    longDescription:
      "RiskPulse is a full-stack SaaS platform that automates the fraud investigation lifecycle: Detect → Investigate → Mitigate. The system features a configurable rule engine supporting threshold, velocity, blacklist, pattern, and composite detection strategies. Cases are enriched with AI-generated narratives using OpenAI or Anthropic, with graceful fallback to local heuristics. The platform includes RBAC (Admin, Analyst, Engineer, Read-only), entity graph exploration, real-time dashboards with Recharts, global search, keyboard shortcuts, and a deployment pipeline with rollback and audit logging. Built on a monorepo architecture with Next.js 14 frontend, FastAPI backend, PostgreSQL, and Redis worker queues.",
    type: "platform",
    status: "active",
    featured: true,
    order: 1,
    repoUrl: null,
    liveUrl: "https://riskpulse-9bro.vercel.app",
    repoPath: "/Users/sanket/riskpulse",
    technologies: [
      "nextjs", "react", "typescript", "tailwindcss", "fastapi", "python",
      "postgresql", "redis", "docker", "zustand", "recharts",
    ],
    tags: ["saas", "fraud-detection", "ai", "enterprise", "real-time"],
    screenshots: [
      {
        id: "00-landing",
        url: "/projects/riskpulse/landing.png",
        caption: "Marketing site — AI that investigates like your best analyst",
        order: 1,
      },
      { id: "01-login", url: "/projects/riskpulse/01-login.png", caption: "Secure sign-in with role-based quick login", order: 2 },
      { id: "02-dashboard", url: "/projects/riskpulse/02-dashboard.png", caption: "Real-time risk operations dashboard with KPIs", order: 3 },
      { id: "03-alerts", url: "/projects/riskpulse/03-alerts.png", caption: "Alert inbox with filters and bulk actions", order: 4 },
      { id: "04-cases", url: "/projects/riskpulse/04-cases.png", caption: "Case management workspace", order: 5 },
      { id: "05-case-detail", url: "/projects/riskpulse/05-case-detail.png", caption: "Case workspace with entity graph and AI narratives", order: 6 },
      { id: "06-entities", url: "/projects/riskpulse/06-entities.png", caption: "Entity explorer and graph exploration", order: 7 },
      { id: "07-rules", url: "/projects/riskpulse/07-rules.png", caption: "Detection rule engine configuration", order: 8 },
    ],
    metadata: {
      entryPoint: "apps/api/main.py / apps/web/src/app/layout.tsx",
      buildCommand: "docker compose up --build",
      runCommand: "docker compose up",
      architecture: "Monorepo SaaS — Next.js frontend + FastAPI backend + Redis workers",
      patterns: [
        "Monorepo (apps/ + packages/shared)",
        "Rule engine with composite detection",
        "LLM-optional narrative generation",
        "Portable DB types (SQLite dev / PostgreSQL prod)",
        "Background workers for detection pipeline",
        "RBAC with role-based route guards",
      ],
      features: [
        "Real-time fraud detection rule engine",
        "AI-generated investigation narratives",
        "Entity graph exploration with React Flow",
        "Case management with evidence timeline",
        "Mitigation deployment with rollback",
        "RBAC: Admin, Analyst, Engineer, Read-only",
        "Global search with keyboard shortcuts",
        "Dashboard with live metrics and charts",
        "Stripe billing integration",
        "GDPR compliance endpoint",
      ],
      dependencyCount: 35,
      hasDocker: true,
      hasTests: true,
    },
    caseStudySlug: "riskpulse-detection-engine",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "2",
    slug: "coffee-sommelier",
    title: "Coffee Sommelier",
    shortDescription:
      "Algorithmic recommendation engine using weighted cosine similarity and MMR diversification — zero LLM dependency, sub-50ms latency, serving four independent frontends.",
    longDescription:
      "Coffee Sommelier is a Grubhub-style platform for discovering cafes by location and taste preference. The system consists of four independent frontends: a consumer app (Vite + React) for browsing and ordering, an admin dashboard for cafe management, an embeddable widget for third-party integration, and a Next.js 14 B2B recommendation landing page. The FastAPI backend implements a deterministic scoring engine using weighted cosine similarity with MMR (Maximal Marginal Relevance) diversification — no LLM dependency. Features include geolocation with Leaflet maps, haversine distance filtering, cart/checkout, order tracking, PWA support, and a brew guide generator.",
    type: "platform",
    status: "active",
    featured: true,
    order: 2,
    repoUrl: null,
    liveUrl: "https://coffee-sommelier.vercel.app/",
    repoPath: "/Users/sanket/coffee-sommelier",
    technologies: [
      "nextjs", "react", "typescript", "tailwindcss", "vite", "fastapi",
      "python", "postgresql", "docker", "leaflet",
    ],
    tags: ["marketplace", "e-commerce", "recommendations", "geolocation", "pwa"],
    screenshots: [
      {
        id: "landing",
        url: "/projects/coffee-sommelier/landing.png",
        caption: "Consumer landing — discover cafes, search by city, taste quiz and ordering",
        order: 1,
      },
    ],
    metadata: {
      entryPoint: "consumer/src/main.tsx / backend/app/main.py",
      buildCommand: "docker-compose up --build",
      runCommand: "docker-compose up",
      architecture: "Multi-frontend microservice — 4 apps + 1 API + PostgreSQL",
      patterns: [
        "Multi-frontend architecture (consumer, admin, widget, B2B)",
        "Deterministic scoring with cosine similarity + MMR",
        "Geolocation with haversine distance filtering",
        "Context providers (Cart, Auth, Toast)",
        "API proxy in Vite dev config",
        "Embeddable widget architecture",
      ],
      features: [
        "Cafe discovery by location and taste",
        "Algorithmic recommendations (no LLM)",
        "Interactive map with Leaflet",
        "Cart and checkout flow",
        "Order tracking",
        "Admin dashboard for cafe management",
        "Embeddable recommendation widget",
        "B2B recommendation landing page",
        "Brew guide generator",
        "PWA with offline support",
      ],
      dependencyCount: 40,
      hasDocker: true,
      hasTests: false,
    },
    caseStudySlug: "coffee-sommelier-scoring",
    gradient: "from-amber-600 to-yellow-500",
  },
  {
    id: "3",
    slug: "mind-mirror",
    title: "Mind Mirror",
    shortDescription:
      "NLP-powered journaling with a 3-tier sentiment pipeline: Hugging Face RoBERTa inference, TextBlob fallback, and LRU-cached analysis with ~40% hit rate.",
    longDescription:
      "Mind Mirror is a full-stack journaling platform that uses NLP to analyze the emotional content of daily entries. The backend is built with FastAPI and MongoDB, processing journal text through the Hugging Face Inference API (cardiffnlp/twitter-roberta-base-sentiment) with TextBlob as fallback. An LRU cache (256 entries, 30-minute TTL) minimizes API calls. The React 19 + Vite 7 frontend offers a dashboard with sentiment distribution charts, streak tracking, mood volatility analysis, and quick-entry prompts. Pro users get trigger analysis (Work, Fatigue, Social, Health keywords), volatility mapping, and mood forecasting. The system supports CSV export, full-text search, and dual deployment via standard server and AWS Lambda (Mangum).",
    type: "web",
    status: "active",
    featured: true,
    order: 3,
    repoUrl: "https://github.com/sanketmatroja07/mind-mirror",
    repoPath: "/Users/sanket/ai-journal-app",
    technologies: [
      "react", "vite", "javascript", "fastapi", "python", "mongodb",
      "huggingface", "aws-lambda",
    ],
    tags: ["ai", "nlp", "health", "sentiment-analysis", "journaling"],
    screenshots: [],
    metadata: {
      entryPoint: "main.py / frontend/src/main.jsx",
      buildCommand: "cd frontend && npm run build",
      runCommand: "python main.py",
      architecture: "Layered monolith — FastAPI + React SPA + MongoDB",
      patterns: [
        "Layered architecture (API → Business Logic → Data Access)",
        "Dual deployment (server + AWS Lambda via Mangum)",
        "LRU sentiment cache with TTL",
        "HF Inference API with TextBlob fallback",
        "Day-key migration for backward compatibility",
        "JWT stateless auth with bcrypt",
      ],
      features: [
        "NLP sentiment analysis per journal entry",
        "Emotional trend dashboard with charts",
        "Mood streak and volatility tracking",
        "Pro insights: trigger analysis, forecasting",
        "Full-text search with MongoDB $text",
        "CSV export",
        "Quick-entry prompt chips",
        "Local draft persistence",
        "AWS Lambda deployment support",
        "User registration and authentication",
      ],
      dependencyCount: 18,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: "mind-mirror-sentiment",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "4",
    slug: "resume-tailor",
    title: "ResumeTailor",
    shortDescription:
      "LLM-powered resume optimization using Anthropic Claude — parses DOCX into structured blocks, intelligently tailors content to job descriptions, and re-exports with formatting preserved.",
    longDescription:
      "ResumeTailor is a full-stack application that helps job seekers optimize their resumes for specific positions. Users upload a DOCX resume and paste a job description. The backend parses the document into structured blocks, sends them to Anthropic Claude for intelligent tailoring, and renders the result as a before/after comparison. The system supports DOCX re-export and PDF generation via LibreOffice headless. Built with a clean service architecture: the resume engine is extracted as a standalone module (services/resume_engine) with DOCX parsing, JD parsing, AI tailoring, and export capabilities. The Next.js 14 frontend provides a polished upload flow with real-time preview.",
    type: "web",
    status: "active",
    featured: true,
    order: 4,
    repoUrl: null,
    repoPath: "/Users/sanket/Cursor Projects",
    technologies: [
      "nextjs", "react", "typescript", "tailwindcss", "fastapi", "python",
      "anthropic",
    ],
    tags: ["ai", "career", "document-processing", "nlp"],
    screenshots: [],
    metadata: {
      entryPoint: "apps/api/app/main.py / apps/web/src/app/page.tsx",
      buildCommand: "cd apps/web && npm run build",
      runCommand: "./dev.sh",
      architecture: "Service-oriented — extracted engine + FastAPI API + Next.js frontend",
      patterns: [
        "Service extraction (resume_engine module)",
        "DOCX block-level parsing and reconstruction",
        "AI pipeline: parse → tailor → render → export",
        "LibreOffice headless for PDF conversion",
        "Session-based workflow",
      ],
      features: [
        "DOCX resume upload and parsing",
        "Job description analysis",
        "AI-powered content tailoring via Claude",
        "Before/after resume comparison",
        "DOCX export with original formatting",
        "PDF export via LibreOffice",
        "Real-time HTML preview",
        "Session management",
      ],
      dependencyCount: 15,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "5",
    slug: "signalvault",
    title: "SignalVault",
    shortDescription:
      "GPT-4-powered market intelligence platform aggregating signals from Reddit, Twitter, YouTube, HN, and Google Trends with semantic similarity search.",
    longDescription:
      "SignalVault is a signal intelligence platform that collects and analyzes data from multiple sources: Reddit (PRAW), Twitter (Tweepy), YouTube (Google API), Google Trends (pytrends), Hacker News, and Product Hunt. Signals are processed through GPT-4 for trend analysis and stored in Supabase for real-time access. The system uses Celery with APScheduler for scheduled data collection and Redis for task queuing. The Next.js 14 frontend provides dashboards for browsing, filtering, and analyzing collected signals. Sentence transformers enable semantic similarity search across signals.",
    type: "platform",
    status: "active",
    featured: true,
    order: 5,
    repoUrl: null,
    repoPath: "/Users/sanket/Cursor Projects/apps/signalvault",
    technologies: [
      "nextjs", "react", "typescript", "tailwindcss", "fastapi", "python",
      "supabase", "redis", "openai", "celery",
    ],
    tags: ["ai", "intelligence", "data-pipeline", "real-time", "aggregation"],
    screenshots: [],
    metadata: {
      entryPoint: "backend/main.py / src/app/page.tsx",
      buildCommand: "npm run build",
      runCommand: "npm run dev",
      architecture: "Data aggregation pipeline — multi-source → GPT-4 analysis → Supabase",
      patterns: [
        "Multi-source data aggregation",
        "Celery + APScheduler for scheduled collection",
        "GPT-4 signal analysis",
        "Supabase real-time storage",
        "Sentence transformers for semantic search",
        "Redis task queue",
      ],
      features: [
        "Reddit signal collection",
        "Twitter trend monitoring",
        "YouTube trend analysis",
        "Google Trends integration",
        "Hacker News monitoring",
        "Product Hunt tracking",
        "GPT-4 signal analysis",
        "Semantic similarity search",
        "Real-time dashboard",
        "Scheduled data collection",
      ],
      dependencyCount: 25,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "6",
    slug: "moviematch",
    title: "MovieMatch",
    shortDescription:
      "Real-time collaborative filtering for movie matching — Firebase-powered room sync with intelligent preference matching via TMDB data and swipe-based UX.",
    longDescription:
      "MovieMatch is a React Native (Expo) mobile application that brings a Tinder-like swipe experience to movie discovery. Users create rooms, invite friends, and swipe through movies sourced from the TMDB API. When users in the same room swipe right on the same movie, it's a match. The app uses Firebase for real-time room synchronization (Firestore), authentication, and cloud functions. Features include animated swipe gestures via React Native Reanimated, tabbed navigation with React Navigation, and persistent watch lists.",
    type: "mobile",
    status: "active",
    featured: true,
    order: 6,
    repoUrl: null,
    repoPath: "/Users/sanket/Cursor Projects/apps/moviematch",
    technologies: [
      "react-native", "expo", "typescript", "firebase", "firestore",
    ],
    tags: ["mobile", "entertainment", "social", "real-time"],
    screenshots: [],
    metadata: {
      entryPoint: "index.ts → expo start",
      buildCommand: "npx expo build",
      runCommand: "npx expo start",
      architecture: "Mobile-first with serverless backend — Expo + Firebase",
      patterns: [
        "Tinder-style swipe UX with Reanimated",
        "Firebase real-time room sync",
        "TMDB API for movie data",
        "Tab navigation with React Navigation",
      ],
      features: [
        "Tinder-style movie swiping",
        "Room creation and friend invites",
        "Real-time match detection",
        "TMDB movie database integration",
        "Firebase authentication",
        "Persistent watch lists",
        "Animated gestures",
      ],
      dependencyCount: 20,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "7",
    slug: "expense-hub",
    title: "Expense Hub",
    shortDescription:
      "Data-driven personal finance tracker with intelligent categorization, interactive Recharts visualizations, and date-range pattern analysis.",
    longDescription:
      "Expense Hub is a Next.js 14 personal finance application featuring interactive expense visualization with Recharts, date-range filtering with date-fns, categorized expense management, and smooth Framer Motion animations. The UI uses Tailwind CSS with a responsive design that works across desktop and mobile.",
    type: "web",
    status: "active",
    featured: false,
    order: 7,
    repoUrl: null,
    repoPath: "/Users/sanket/Cursor Projects/apps/expense-hub",
    technologies: ["nextjs", "react", "typescript", "tailwindcss", "recharts"],
    tags: ["finance", "dashboard", "data-visualization"],
    screenshots: [],
    metadata: {
      entryPoint: "src/app/page.tsx",
      buildCommand: "npm run build",
      runCommand: "npm run dev (port 3004)",
      architecture: "Next.js App Router SPA",
      patterns: ["Client-side state management", "Recharts data visualization", "Responsive dashboard layout"],
      features: [
        "Expense categorization",
        "Interactive charts with Recharts",
        "Date-range filtering",
        "Responsive dashboard",
        "Smooth animations",
      ],
      dependencyCount: 12,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "8",
    slug: "diamond-luxe",
    title: "Diamond Luxe",
    shortDescription:
      "Premium e-commerce storefront with motion-driven UX on Next.js 16 — Framer Motion animations, Tailwind CSS v4, and high-end responsive design.",
    longDescription:
      "Diamond Luxe is a luxury e-commerce frontend built with the latest Next.js 16 and Tailwind CSS v4. The application features premium product showcases with Framer Motion animations, Lucide icons, and a modern responsive design that conveys high-end brand aesthetics.",
    type: "web",
    status: "active",
    featured: false,
    order: 8,
    repoUrl: null,
    repoPath: "/Users/sanket/Cursor Projects/apps/diamond-luxe",
    technologies: ["nextjs", "react", "typescript", "tailwindcss", "framer-motion"],
    tags: ["e-commerce", "luxury", "design"],
    screenshots: [],
    metadata: {
      entryPoint: "src/app/page.tsx",
      buildCommand: "npm run build",
      runCommand: "npm run dev",
      architecture: "Next.js 16 App Router with Tailwind v4",
      patterns: ["Premium UI animations", "Responsive luxury design", "Modern CSS with Tailwind v4"],
      features: [
        "Premium product showcase",
        "Elegant Framer Motion animations",
        "Responsive luxury design",
        "Modern typography and layout",
      ],
      dependencyCount: 8,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-slate-700 to-zinc-900",
  },
  {
    id: "9",
    slug: "leadmaphunter",
    title: "LeadMapHunter",
    shortDescription:
      "Sales intelligence platform with lead discovery, pipeline management, and Zustand-powered state for real-time interactive data views.",
    longDescription:
      "LeadMapHunter is a Next.js 14 application for discovering and managing sales leads. It uses Zustand for global state management, Framer Motion for UI transitions, and features interactive data views for lead tracking and pipeline management.",
    type: "web",
    status: "active",
    featured: false,
    order: 9,
    repoUrl: null,
    repoPath: "/Users/sanket/Cursor Projects/apps/leadmaphunter",
    technologies: ["nextjs", "react", "typescript", "tailwindcss", "zustand"],
    tags: ["sales", "crm", "productivity"],
    screenshots: [],
    metadata: {
      entryPoint: "src/app/page.tsx",
      buildCommand: "npm run build",
      runCommand: "npm run dev (port 3005)",
      architecture: "Next.js App Router with Zustand",
      patterns: ["Zustand global state", "Lead pipeline views", "Animated transitions"],
      features: [
        "Lead discovery",
        "Pipeline management",
        "Zustand state management",
        "Interactive data views",
      ],
      dependencyCount: 10,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: "10",
    slug: "privacy-world",
    title: "Privacy World",
    shortDescription:
      "tryprivacy.world — AI-powered privacy policy summaries in plain language. Decode what you are agreeing to before you click “I Agree,” with GDPR and CCPA-aware analysis.",
    longDescription:
      "Privacy World (tryprivacy.world) helps users understand website privacy policies without legal jargon. It combines AI with a compliance-focused lens (including GDPR and CCPA) to produce fast, actionable summaries. The product is built as a modern Next.js experience with a dark, high-contrast UI, clear CTAs, and flows for analyzing policies and learning how the tool works.",
    type: "web",
    status: "active",
    featured: false,
    order: 10,
    repoUrl: null,
    liveUrl: "https://tryprivacy.world/",
    repoPath: "/Users/sanket/Cursor Projects/apps/privacy-world",
    technologies: ["nextjs", "react", "typescript", "tailwindcss", "vercel"],
    tags: ["privacy", "legal", "ai", "compliance", "nlp"],
    screenshots: [
      {
        id: "hero",
        url: "/projects/privacy-world/hero.png",
        caption: "Landing page — decode privacy policies in seconds",
        order: 1,
      },
    ],
    metadata: {
      entryPoint: "src/app/page.tsx",
      buildCommand: "npm run build",
      runCommand: "npm run dev (port 3001)",
      architecture: "Next.js App Router — marketing + summary flows, deployed to production",
      patterns: [
        "AI-assisted policy summarization",
        "Compliance-oriented messaging (GDPR, CCPA)",
        "Product-led landing with clear primary CTA",
        "Dark-theme UI with strong visual hierarchy",
      ],
      features: [
        "Instant-style privacy policy analysis UX",
        "Plain-language summaries for non-lawyers",
        "Trust and social-proof positioning",
        "Product, legal, and contact navigation",
        "Deployed live at tryprivacy.world",
      ],
      dependencyCount: 10,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-orange-600 to-amber-500",
  },
  {
    id: "11",
    slug: "tripgenius",
    title: "TripGenius",
    shortDescription:
      "Intelligent travel planning with smart itinerary generation, date-aware scheduling, and location-based discovery powered by Next.js.",
    longDescription:
      "TripGenius is a Next.js 14 travel planning application that helps users create intelligent itineraries. Features date-based trip planning with date-fns, location discovery, Framer Motion animations, and a clean responsive interface with Tailwind CSS.",
    type: "web",
    status: "active",
    featured: false,
    order: 11,
    repoUrl: null,
    repoPath: "/Users/sanket/Cursor Projects/apps/tripgenius",
    technologies: ["nextjs", "react", "typescript", "tailwindcss", "framer-motion"],
    tags: ["travel", "planning", "lifestyle"],
    screenshots: [],
    metadata: {
      entryPoint: "src/app/page.tsx",
      buildCommand: "npm run build",
      runCommand: "npm run dev (port 3002)",
      architecture: "Next.js App Router",
      patterns: ["Date-based itinerary planning", "Location discovery", "Animated page transitions"],
      features: [
        "Trip itinerary creation",
        "Date-range planning",
        "Location discovery",
        "Responsive travel UI",
        "Smooth animations",
      ],
      dependencyCount: 8,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    id: "12",
    slug: "ai-journal-presentation",
    title: "AI Journal Presentation",
    shortDescription:
      "Data-driven presentation engine with 12 layout types, custom rendering pipeline, and zero external dependencies — pure algorithmic slide generation.",
    longDescription:
      "A handcrafted presentation site for the Mind Mirror capstone project. Built with zero external dependencies (vanilla HTML/CSS/JS), it features a custom slide layout engine supporting 12 layout types (hero, split, overlay, three-col, persona-grid, timeline, and more). Includes keyboard navigation, autoplay, fullscreen mode, thumbnail navigation, and a progress bar. Showcases personas, tech stack, team members, and project KPIs.",
    type: "web",
    status: "active",
    featured: false,
    order: 12,
    repoUrl: null,
    repoPath: "/Users/sanket/ai-journal-presentation-site",
    technologies: ["javascript", "html", "css"],
    tags: ["presentation", "zero-deps", "capstone"],
    screenshots: [],
    metadata: {
      entryPoint: "index.html",
      buildCommand: "N/A (static)",
      runCommand: "python -m http.server 8000",
      architecture: "Vanilla JS — data-driven slide rendering engine",
      patterns: [
        "Data-driven rendering (slide array → DOM)",
        "Custom layout type system (12 types)",
        "Event delegation for navigation",
        "CSS custom properties for theming",
        "Zero external dependencies",
      ],
      features: [
        "13-slide interactive deck",
        "12 layout types",
        "Keyboard and click navigation",
        "Autoplay mode",
        "Fullscreen support",
        "Progress bar",
        "Thumbnail sidebar",
      ],
      dependencyCount: 0,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-purple-500 to-fuchsia-500",
  },
  {
    id: "13",
    slug: "jobbot-dashboard",
    title: "JobBot Dashboard",
    shortDescription:
      "Automated job pipeline dashboard with intelligent tracking, application analytics, and data-driven search optimization in Python.",
    longDescription:
      "JobBot Dashboard is a Python application for automating and tracking the job application process. It provides a dashboard interface for managing application pipelines, tracking response rates, and analyzing job search metrics. The project demonstrates data management, automation workflows, and dashboard visualization capabilities.",
    type: "web",
    status: "active",
    featured: false,
    order: 13,
    repoUrl: "https://github.com/sanketmatroja07/jobbot-dashboard",
    repoPath: "",
    technologies: ["python"],
    tags: ["automation", "dashboard", "career", "data"],
    screenshots: [],
    metadata: {
      entryPoint: "main.py",
      buildCommand: "pip install -r requirements.txt",
      runCommand: "python main.py",
      architecture: "Python application with dashboard UI",
      patterns: [
        "Job pipeline tracking",
        "Metrics and analytics",
        "Automation workflows",
      ],
      features: [
        "Job application tracking",
        "Pipeline management",
        "Application metrics dashboard",
        "Automated job search workflows",
      ],
      dependencyCount: 0,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "14",
    slug: "ecommerce-growth-analytics",
    title: "E-Commerce Growth Analytics",
    shortDescription:
      "ML-driven customer segmentation and growth analytics — full ETL pipeline from SQL extraction through Python statistical analysis to Tableau visualization.",
    longDescription:
      "An end-to-end data analytics project that analyzes e-commerce growth patterns using SQL for data extraction and transformation, Python for statistical analysis and data processing, and Tableau for interactive visualization dashboards. The project demonstrates the full analytics pipeline from raw transaction data to actionable business insights including customer segmentation, revenue trends, and conversion funnel analysis.",
    type: "library",
    status: "active",
    featured: false,
    order: 14,
    repoUrl: "https://github.com/sanketmatroja07/ecommerce-growth-analytics",
    repoPath: "",
    technologies: ["python", "sql", "tableau"],
    tags: ["analytics", "data", "e-commerce", "visualization"],
    screenshots: [],
    metadata: {
      entryPoint: "N/A (analysis notebooks)",
      buildCommand: "pip install -r requirements.txt",
      runCommand: "jupyter notebook",
      architecture: "Data analytics pipeline — SQL → Python → Tableau",
      patterns: [
        "ETL pipeline for e-commerce data",
        "Statistical analysis with Python",
        "Interactive Tableau dashboards",
        "Customer segmentation",
      ],
      features: [
        "SQL data extraction and transformation",
        "Python statistical analysis",
        "Tableau visualization dashboards",
        "Revenue trend analysis",
        "Customer segmentation",
        "Conversion funnel analysis",
      ],
      dependencyCount: 0,
      hasDocker: false,
      hasTests: false,
    },
    caseStudySlug: null,
    gradient: "from-teal-500 to-green-500",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getProjectsByTechnology(techSlug: string): Project[] {
  return projects.filter((p) => p.technologies.includes(techSlug));
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

export function filterProjects(filters: {
  technologies?: string[];
  tags?: string[];
  type?: ProjectType;
  search?: string;
}): Project[] {
  let result = [...projects];

  if (filters.technologies?.length) {
    result = result.filter((p) =>
      filters.technologies!.some((t) => p.technologies.includes(t))
    );
  }

  if (filters.tags?.length) {
    result = result.filter((p) =>
      filters.tags!.some((t) => p.tags.includes(t))
    );
  }

  if (filters.type) {
    result = result.filter((p) => p.type === filters.type);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.includes(q)) ||
        p.tags.some((t) => t.includes(q))
    );
  }

  return result.sort((a, b) => a.order - b.order);
}
