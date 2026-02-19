"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { images, CATEGORY_LABELS, type Category } from "@/data/portfolio";

const COLLECTIONS: { key: Category; label: string }[] = [
  { key: "editorial", label: "Editorial" },
  { key: "commercial", label: "Commercial" },
  { key: "runway", label: "Runway" },
  { key: "beauty", label: "Beauty" },
  { key: "casual", label: "Casual" },
];

function GalleryCards({
  filtered,
}: {
  filtered: (typeof images)[number][];
}) {
  return filtered.length === 0 ? (
    <p className="py-20 text-sm text-white/30">
      이 카테고리에 아직 사진이 없습니다.
    </p>
  ) : (
    filtered.map((img, index) => (
      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: index * 0.08,
          ease: "easeOut",
        }}
        className="group relative h-full w-[75vw] flex-none snap-center md:w-[40vw] lg:w-[30vw]"
      >
        <div className="h-[calc(100%-40px)] overflow-hidden rounded-sm">
          <div
            className="h-full w-full transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            style={{
              background: `linear-gradient(${
                150 + index * 25
              }deg, #c4b99a 0%, #a89878 50%, #8c7e64 100%)`,
            }}
          />
        </div>
        <div className="mt-2 flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/30">
              {CATEGORY_LABELS[img.category]}
            </p>
            {img.metadata?.brand && (
              <p className="mt-0.5 text-sm text-white/70">
                {img.metadata.brand}
              </p>
            )}
          </div>
          {img.metadata?.photographer && (
            <p className="text-[11px] text-white/25">
              Ph. {img.metadata.photographer}
            </p>
          )}
        </div>
      </motion.div>
    ))
  );
}

export default function Collections() {
  const [active, setActive] = useState<Category>("editorial");
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const filtered = images.filter((img) => img.category === active);

  // Reset scroll on category change
  useEffect(() => {
    desktopScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    mobileScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [active]);

  return (
    <section id="collections" className="bg-[var(--bg-dark)] py-24 md:py-32">
      {/* Title + Tabs - in container */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="md:grid md:grid-cols-[240px_1fr] md:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]"
            >
              Collections
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-3 font-display text-3xl font-light text-white md:text-4xl"
            >
              By Category
            </motion.h2>

            <nav className="mt-8 flex gap-2 overflow-x-auto md:flex-col md:gap-0 md:overflow-visible">
              {COLLECTIONS.map((col) => {
                const count = images.filter(
                  (img) => img.category === col.key
                ).length;
                return (
                  <button
                    key={col.key}
                    onClick={() => setActive(col.key)}
                    className={`group flex shrink-0 items-center gap-3 border-b border-transparent py-3 text-left transition-all md:border-b md:border-white/5 ${
                      active === col.key
                        ? "text-[var(--accent)]"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <span className="text-[13px] tracking-[0.1em] uppercase">
                      {col.label}
                    </span>
                    <span className="text-[11px] text-white/20">{count}</span>
                    {active === col.key && (
                      <motion.div
                        layoutId="collection-indicator"
                        className="hidden h-[2px] flex-1 bg-[var(--accent)] md:block"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop gallery - inside grid */}
          <div className="relative hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  ref={desktopScrollRef}
                  className="flex h-[60vh] max-h-[600px] snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <GalleryCards filtered={filtered} />
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-dark)] to-transparent" />
          </div>
        </div>
      </div>

      {/* Mobile gallery - full width, outside container, no negative margins */}
      <div className="relative mt-8 md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              ref={mobileScrollRef}
              className="flex h-[50vh] max-h-[500px] snap-x snap-mandatory items-start gap-4 overflow-x-auto overflow-y-hidden pl-6 pr-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <GalleryCards filtered={filtered} />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--bg-dark)] to-transparent" />
      </div>
    </section>
  );
}
