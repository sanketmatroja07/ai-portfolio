"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { MagneticButton } from "@/components/effects/MagneticButton";

const socialLinks = [
  { href: "https://github.com/sanketmatroja07", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/sanketmatroja07/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:sanket@sanketmatroja.com", icon: Mail, label: "Email" },
];

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/technologies", label: "Technologies" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative">
      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-zinc-50 dark:via-blue-950/10 dark:to-zinc-950" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Looking for an AI engineer who{" "}
            <span className="gradient-text">ships?</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8">
            I&apos;m open to full-time roles, contract work, and technical co-founder opportunities.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <MagneticButton className="inline-block">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98]"
              >
                Get in Touch
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <MagneticButton className="inline-block">
              <a
                href="/resume"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all active:scale-[0.98]"
              >
                <Download size={15} />
                Download Resume
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Footer content */}
      <div className="bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                SM<span className="gradient-text">.</span>
              </Link>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
                AI Engineer. I build intelligent systems that ship to production.
                Fraud detection. Recommendations. NLP. LLM tools.
                If it needs AI, I build it.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Navigation</h3>
              <nav aria-label="Footer">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Connect</h3>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <MagneticButton key={social.label} strength={0.3}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="group p-2.5 rounded-lg text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 bg-zinc-100 dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-blue-200/50 dark:hover:border-blue-800/30 transition-all duration-300 hover:shadow-sm hover:shadow-blue-500/5"
                      aria-label={social.label}
                    >
                      <social.icon size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:scale-110" />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              &copy; {new Date().getFullYear()} Sanket Matroja
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
              Built with Next.js, Tailwind CSS & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
