import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sanket Matroja — AI Engineer",
    template: "%s | Sanket Matroja",
  },
  description:
    "AI Engineer building production AI systems — fraud detection, recommendation engines, NLP pipelines, and LLM-powered tools. 14 projects. 5 AI platforms. I build AI that ships.",
  openGraph: {
    title: "Sanket Matroja — AI Engineer",
    description:
      "AI Engineer building production AI systems — fraud detection, recommendation engines, NLP pipelines, and LLM-powered tools. I build AI that ships.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sanket Matroja",
  jobTitle: "AI Engineer",
  url: "https://sanketmatroja.com",
  email: "sanket@sanketmatroja.com",
  sameAs: [
    "https://www.linkedin.com/in/sanketmatroja07/",
    "https://github.com/sanketmatroja07",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Natural Language Processing",
    "Large Language Models",
    "Fraud Detection",
    "Recommendation Engines",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "FastAPI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
