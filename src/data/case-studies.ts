import { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "cs1",
    slug: "riskpulse-detection-engine",
    projectSlug: "riskpulse",
    title: "Designing an AI Detection Engine That Doesn't Need a Data Scientist",
    problem:
      "Traditional fraud detection systems are rigid — they either rely on static thresholds that generate excessive false positives, or require expensive ML pipelines that are slow to update. RiskPulse needed a detection system that business analysts could configure without engineering involvement, while still supporting complex composite rules.",
    approach:
      "Designed a rule engine supporting five composable detection strategies: threshold (simple value checks), velocity (event frequency over time windows), blacklist (entity matching), pattern (regex/behavioral), and composite (boolean logic combining other rules). Each rule type implements a common interface with `evaluate(event) → Alert | null`. Composite rules enable AND/OR/NOT combinations, allowing analysts to build complex detection logic from simple primitives. The engine processes events through a pipeline: ingest → enrich → evaluate → score → alert. A model score simulator provides deterministic heuristics for demo environments without requiring a trained ML model. Background workers (Redis + Python) handle async processing to keep the API responsive.",
    outcome:
      "The composable architecture allows new detection rules to be created in minutes rather than days. The rule type system is extensible — adding a new detection strategy requires implementing a single interface. The portable database types (SQLite for dev, PostgreSQL for prod) enable rapid local development with production parity. LLM-optional narrative generation means the platform degrades gracefully without API keys.",
    highlights: [
      "Rule creation: minutes instead of days",
      "5 composable detection strategies",
      "Async pipeline via Redis workers",
      "Zero-downtime LLM fallback",
      "Dev/prod DB parity (SQLite/PostgreSQL)",
    ],
  },
  {
    id: "cs2",
    slug: "coffee-sommelier-scoring",
    projectSlug: "coffee-sommelier",
    title: "Why I Built a Recommendation Engine Without GPT — And It's Better",
    problem:
      "Coffee recommendation systems typically either use basic filtering (too simple) or LLM-powered suggestions (expensive, unpredictable latency, non-deterministic). Coffee Sommelier needed recommendations that feel personalized while remaining fast, predictable, and cost-free to operate at scale.",
    approach:
      "Built a deterministic scoring engine using weighted cosine similarity between user preference vectors and product feature vectors. User vectors encode preferences for roast level, origin region, brew method, and flavor notes. Product vectors are pre-computed from cafe menu data. To prevent recommendation homogeneity, implemented Maximal Marginal Relevance (MMR) diversification — each successive recommendation is penalized for similarity to already-selected items. The scoring weights are configurable via the admin dashboard, allowing business operators to tune the recommendation behavior. Geolocation filtering uses the haversine formula to pre-filter cafes within a configurable radius before scoring.",
    outcome:
      "Zero LLM costs with sub-50ms recommendation latency. The MMR diversification ensures users see variety rather than a cluster of similar cafes. Configurable weights mean the business can A/B test different scoring strategies without code changes. The multi-frontend architecture (consumer, admin, widget, B2B) allows the recommendation engine to serve different contexts through a single API.",
    highlights: [
      "<50ms latency, $0 LLM cost",
      "Cosine similarity + MMR diversification",
      "Haversine geo-filtering",
      "Admin-configurable scoring weights",
      "Multi-frontend: consumer, admin, widget, B2B",
    ],
  },
  {
    id: "cs3",
    slug: "mind-mirror-sentiment",
    projectSlug: "mind-mirror",
    title: "Zero-Downtime AI: Building a Sentiment Pipeline That Never Fails",
    problem:
      "Mind Mirror needs real-time sentiment analysis for every journal entry, but the Hugging Face Inference API has rate limits, occasional downtime, and costs that scale with usage. The system needed to be resilient against API failures while maintaining acceptable sentiment quality.",
    approach:
      "Implemented a three-tier sentiment pipeline: (1) Check LRU cache — an OrderedDict-based cache holding 256 entries with 30-minute TTL. (2) Call Hugging Face Inference API (cardiffnlp/twitter-roberta-base-sentiment-latest) with retry logic for 429 and 5xx responses using exponential backoff. (3) Fall back to TextBlob for offline sentiment analysis. The cache key is the normalized journal text, so identical or very similar entries resolve instantly. Trigger analysis uses keyword-based classification (Work, Fatigue, Social, Health categories) applied post-sentiment to correlate mood patterns with life domains. The dual deployment strategy (standard Uvicorn server + AWS Lambda via Mangum) required careful handling of cold starts — the MongoDB connection pool is initialized during the FastAPI lifespan event.",
    outcome:
      "Cache hit rate of ~40% for regular journalers reduces API calls significantly. The fallback chain means zero downtime for sentiment analysis — users never see an error. TextBlob quality is acceptable for fallback (accuracy ~70% vs ~85% for the RoBERTa model). The day-key migration system handles backward compatibility when the entry schema evolved, preventing data loss for existing users.",
    highlights: [
      "Zero downtime: 3-tier fallback chain",
      "~40% cache hit rate, fewer API calls",
      "85% accuracy (RoBERTa) / 70% fallback (TextBlob)",
      "Dual deploy: Uvicorn + AWS Lambda",
      "Backward-compatible schema migration",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudyForProject(projectSlug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.projectSlug === projectSlug);
}
