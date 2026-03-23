"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Screenshot } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  projectTitle: string;
}

export function ScreenshotGallery({ screenshots, projectTitle }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) return null;
  // Single image is already the project hero; avoid duplicating it below.
  if (screenshots.length === 1) return null;

  const sorted = [...screenshots].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Screenshots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((screenshot, idx) => (
            <button
              key={screenshot.id}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="button"
            >
              <Image
                src={screenshot.url}
                alt={screenshot.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-sm font-medium line-clamp-2">
                  {screenshot.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex - 1 + sorted.length) % sorted.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>
          <div
            className="relative max-w-6xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={sorted[selectedIndex].url}
              alt={sorted[selectedIndex].caption}
              fill
              className="object-contain rounded-lg"
              priority
            />
            <p className="mt-4 text-center text-white/90 text-sm">
              {sorted[selectedIndex].caption}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % sorted.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
