"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { images as placeholderImages, CATEGORY_LABELS, type Category } from "@/data/portfolio";
import { useImages } from "@/components/ImageProvider";
import EditableImage from "@/components/ui/EditableImage";

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
  const { images: blobImages } = useImages();

  // Blob 이미지를 카테고리별로 필터 — 없으면 플레이스홀더 사용
  const blobFiltered = blobImages.filter((img) => img.category === active);
  const placeholderFiltered = placeholderImages.filter((img) => img.category === active);

  // Blob 이미지가 있으면 그것만 표시, 없으면 플레이스홀더
  const hasBlob = blobFiltered.length > 0;
  const displayItems = hasBlob
    ? blobFiltered.map((img) => ({
        id: img.id,
        url: img.url,
        category: img.category,
        brand: img.metadata?.brand,
        photographer: img.metadata?.photographer,
      }))
    : placeholderFiltered.map((img) => ({
        id: img.id,
        url: undefined as string | undefined,
        category: img.category,
        brand: img.metadata?.brand,
        photographer: img.metadata?.photographer,
      }));

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [active]);

  // 각 카테고리의 실제 이미지 수 (Blob 기준)
  const getCategoryCount = (cat: Category) => {
    const blobCount = blobImages.filter((img) => img.category === cat).length;
    if (blobCount > 0) return blobCount;
    return placeholderImages.filter((img) => img.category === cat).length;
  };

  return (
    <section id="collections" className="bg-[var(--bg-dark)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
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

        {/* Category tabs */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {COLLECTIONS.map((col) => {
            const count = getCategoryCount(col.key);
            const isActive = active === col.key;
            return (
              <button
                key={col.key}
                onClick={() => setActive(col.key)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-[12px] tracking-[0.1em] uppercase transition-all duration-300 ${
                  isActive
                    ? "border-[var(--accent)] text-[var(--accent)]"
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

      {/* Horizontal scroll gallery */}
      <div className="relative mt-10">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {displayItems.length === 0 ? (
            <p className="py-20 text-sm text-white/30">
              이 카테고리에 아직 사진이 없습니다.
            </p>
          ) : (
            displayItems.map((item, index) => (
              <motion.div
                key={`${active}-${item.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group relative h-[55vh] max-h-[500px] w-[80vw] shrink-0 snap-center md:w-[50vw] lg:w-[40vw]"
              >
                <EditableImage
                  imageUrl={item.url}
                  category={active}
                  lightboxIndex={item.url ? blobImages.findIndex((img) => img.id === item.id) : undefined}
                  className="h-[calc(100%-44px)] overflow-hidden rounded-sm"
                  placeholder={
                    <div
                      className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      style={{
                        background: `linear-gradient(${
                          150 + index * 25
                        }deg, #c4b99a 0%, #a89878 50%, #8c7e64 100%)`,
                      }}
                    />
                  }
                />
                <div className="mt-2 flex items-start justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/30">
                      {CATEGORY_LABELS[item.category]}
                    </p>
                    {item.brand && (
                      <p className="mt-0.5 text-sm text-white/70">{item.brand}</p>
                    )}
                  </div>
                  {item.photographer && (
                    <p className="text-[11px] text-white/25">
                      Ph. {item.photographer}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Right fade gradient */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-[var(--bg-dark)] to-transparent md:w-24" />
      </div>
    </section>
  );
}
