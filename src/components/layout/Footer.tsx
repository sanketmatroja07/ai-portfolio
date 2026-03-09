import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              SM<span className="text-blue-600">.</span>
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
                {[
                  { href: "/projects", label: "Projects" },
                  { href: "/technologies", label: "Technologies" },
                  { href: "/case-studies", label: "Case Studies" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
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
            <div className="flex gap-3">
              <a
                href="https://github.com/sanketmatroja07"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/sanketmatroja07/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a
                href="mailto:sanketmatroja07@gmail.com"
                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Sanket Matroja. Built with Next.js, Tailwind CSS, and TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
