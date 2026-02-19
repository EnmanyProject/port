"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { images, CATEGORY_LABELS, type Category } from "@/data/portfolio";
import Lightbox from "./Lightbox";
import SwipeCards from "./SwipeCards";

const ALL_CATEGORIES: ("all" | Category)[] = [
  "all",
  "editorial",
  "commercial",
  "runway",
  "beauty",
  "casual",
  "profile",
];

export default function Gallery() {
  const [active, setActive] = useState<"all" | Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    active === "all" ? images : images.filter((img) => img.category === active);

  return (
    <section id="portfolio" className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]"
        >
          Portfolio
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-light tracking-tight md:text-4xl"
        >
          Selected Works
        </motion.h2>

        {/* Filter tabs - horizontal scroll on mobile */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-[12px] tracking-[0.1em] uppercase transition-all ${
                active === cat
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white text-[var(--text-secondary)] hover:bg-[var(--border)]"
              }`}
            >
              {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Mobile: Apple-style swipe cards (visible below md) */}
        <div className="mt-8 block md:hidden">
          <SwipeCards
            images={filtered}
            onImageClick={(index) => setLightboxIndex(index)}
          />
        </div>

        {/* Desktop: Masonry grid (visible md and above) */}
        <motion.div
          layout
          className="mt-10 hidden gap-4 md:block md:columns-2 lg:columns-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="mb-4 break-inside-avoid"
              >
                <button
                  onClick={() => setLightboxIndex(index)}
                  className="group relative block w-full overflow-hidden rounded-sm"
                >
                  <div
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                    style={{
                      aspectRatio: `${img.width}/${img.height}`,
                      background: `linear-gradient(${
                        135 + index * 30
                      }deg, #c4b99a 0%, #a89878 50%, #8c7e64 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-[11px] tracking-[0.15em] uppercase text-white/80">
                      {CATEGORY_LABELS[img.category]}
                    </p>
                    {img.metadata?.brand && (
                      <p className="mt-1 text-[13px] text-white">
                        {img.metadata.brand}
                      </p>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filtered}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
