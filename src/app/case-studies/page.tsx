import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Architecture Case Studies",
  description: "Deep dives into the engineering decisions behind key portfolio projects.",
};

export default function CaseStudiesPage() {
  return (
    <PageContainer className="py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Architecture Case Studies
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Deep dives into the engineering decisions, trade-offs, and patterns behind
          the most complex projects in this portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.id} caseStudy={cs} />
        ))}
      </div>
    </PageContainer>
  );
}
