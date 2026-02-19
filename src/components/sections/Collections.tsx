"use client";

import { useState, useRef, useEffect } from "react";
import { images, CATEGORY_LABELS, type Category } from "@/data/portfolio";

const COLLECTIONS: { key: Category; label: string }[] = [
  { key: "editorial", label: "Editorial" },
  { key: "commercial", label: "Commercial" },
  { key: "runway", label: "Runway" },
  { key: "beauty", label: "Beauty" },
  { key: "casual", label: "Casual" },
];

export default function Collections() {
  const [active, setActive] = useState<Category>("editorial");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = images.filter((img) => img.category === active);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [active]);

  return (
    <section id="collections" className="bg-[var(--bg-dark)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Title */}
        <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]">
          Collections
        </p>
        <h2 className="mt-3 font-display text-3xl font-light text-white md:text-4xl">
          By Category
        </h2>

        {/* Category tabs */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {COLLECTIONS.map((col) => {
            const count = images.filter((img) => img.category === col.key).length;
            const isActive = active === col.key;
            return (
              <button
                key={col.key}
                onClick={() => setActive(col.key)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12px] tracking-[0.1em] uppercase transition-all ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                }`}
              >
                {col.label}
                <span className="ml-1.5 text-[10px] opacity-50">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal scroll gallery - full width */}
      <div
        ref={scrollRef}
        className="mt-10 flex gap-4 overflow-x-auto px-6 pb-4 md:px-12"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {filtered.length === 0 ? (
          <p className="py-20 text-sm text-white/30">
            이 카테고리에 아직 사진이 없습니다.
          </p>
        ) : (
          filtered.map((img, index) => (
            <div
              key={img.id}
              className="group relative h-[55vh] max-h-[500px] w-[75vw] shrink-0 md:w-[35vw] lg:w-[28vw]"
            >
              <div className="h-[calc(100%-44px)] overflow-hidden rounded-sm">
                <div
                  className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105"
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
            </div>
          ))
        )}
      </div>
    </section>
  );
}
