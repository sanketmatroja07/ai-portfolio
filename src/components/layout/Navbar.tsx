"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MagneticButton } from "@/components/effects/MagneticButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && mobileOpen) {
      setMobileOpen(false);
      toggleRef.current?.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Main"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-2 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl saturate-150 shadow-sm shadow-zinc-200/20 dark:shadow-zinc-900/20 border-b border-zinc-200/30 dark:border-zinc-800/30"
          : "py-0 bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={cn(
          "flex items-center justify-between transition-all duration-500",
          scrolled ? "h-14" : "h-16"
        )}>
          <MagneticButton strength={0.15}>
            <Link
              href="/"
              className="group text-xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              SM<span className="gradient-text">.</span>
              <span className="hidden lg:inline-block ml-2 text-xs font-medium text-zinc-400 dark:text-zinc-500 group-hover:gradient-text transition-all duration-300">
                AI Engineer
              </span>
            </Link>
          </MagneticButton>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <MagneticButton key={link.href} strength={0.2} as="span">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    isActive(link.href)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </MagneticButton>
            ))}
            <ThemeToggle />
            <MagneticButton strength={0.2} as="span">
              <a
                href="/resume"
                className="ml-1 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-all duration-300"
              >
                <Download size={14} />
                Resume
              </a>
            </MagneticButton>
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: "auto" }}
                  exit={{ opacity: 0, scale: 0.9, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <MagneticButton strength={0.2}>
                    <Link
                      href="/contact"
                      className="ml-1 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 whitespace-nowrap"
                    >
                      Hire Me
                    </Link>
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              ref={toggleRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 top-16 bg-black/20 dark:bg-black/40 md:hidden z-40"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 relative z-50"
            >
              <div className="px-4 py-3 space-y-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "block px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        isActive(link.href)
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05, duration: 0.2 }}
                  className="pt-2 flex gap-2"
                >
                  <a
                    href="/resume"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-lg transition-all"
                  >
                    Resume
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg rounded-lg transition-all"
                  >
                    Hire Me
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
