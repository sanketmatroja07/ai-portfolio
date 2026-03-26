import type { Metadata } from "next";
import { Mail, Github, Linkedin } from "lucide-react";
import { ContactForm } from "@/components/content/ContactForm";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactSocialCard } from "@/components/content/ContactSocialCard";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have an AI problem? Tell me what you're building. I'll tell you how AI can help — and I'll build it.",
};

export default function ContactPage() {
  return (
    <PageContainer className="py-12">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Let&apos;s{" "}
              <span className="gradient-text">Connect</span>
            </h1>
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              Hiring for an AI/full-stack role? Have a project that needs building?
              I&apos;d love to hear from you.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <ContactForm />
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Other ways to connect
            </h2>

            <ContactSocialCard
              href="mailto:sanketmatroja07@gmail.com"
              icon={<Mail size={18} />}
              label="Email"
              value="sanketmatroja07@gmail.com"
            />
            <ContactSocialCard
              href="https://github.com/sanketmatroja07"
              icon={<Github size={18} />}
              label="GitHub"
              value="@sanketmatroja07"
              external
            />
            <ContactSocialCard
              href="https://www.linkedin.com/in/sanketmatroja07/"
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value="@sanketmatroja07"
              external
            />
          </AnimatedSection>
        </div>
      </div>
    </PageContainer>
  );
}
