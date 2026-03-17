import type { Metadata } from "next";
import { ResumeContent } from "./ResumeContent";

export const metadata: Metadata = {
  title: "Resume",
  description: "Sanket Matroja — AI Engineer. Full-stack AI systems, fraud detection, NLP pipelines, recommendation engines.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
