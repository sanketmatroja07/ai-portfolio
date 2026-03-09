import type { Metadata } from "next";
import { Mail, Github, Linkedin } from "lucide-react";
import { ContactForm } from "@/components/content/ContactForm";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have an AI problem? Tell me what you're building. I'll tell you how AI can help — and I'll build it.",
};

export default function ContactPage() {
  return (
    <PageContainer className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Have an AI Problem?
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Tell me what you&apos;re building. I&apos;ll tell you how AI can help — and I&apos;ll build it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Other ways to connect
            </h2>

            <div className="space-y-4">
              <a
                href="mailto:sanketmatroja07@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <Mail size={18} className="text-zinc-500" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">Email</p>
                  <p className="text-xs text-zinc-500">sanketmatroja07@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/sanketmatroja07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <Github size={18} className="text-zinc-500" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">GitHub</p>
                  <p className="text-xs text-zinc-500">@sanketmatroja07</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/sanketmatroja07/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <Linkedin size={18} className="text-zinc-500" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">LinkedIn</p>
                  <p className="text-xs text-zinc-500">@sanketmatroja07</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
