"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { images as placeholderImages, CATEGORY_LABELS } from "@/data/portfolio";
import { useImages } from "@/components/ImageProvider";
import EditableImage from "@/components/ui/EditableImage";
import type { Category } from "@/data/portfolio";

// 비대칭 그리드 레이아웃: 매거진 느낌
const GRID_PATTERN = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

// 각 슬롯의 기본 카테고리
const SLOT_CATEGORIES: Category[] = [
  "editorial", "commercial", "beauty", "runway",
  "casual", "editorial", "profile", "commercial",
];

function HighlightCard({
  imageUrl,
  category,
  brand,
  photographer,
  index,
  pattern,
}: {
  imageUrl?: string;
  category: Category;
  brand?: string;
  photographer?: string;
  index: number;
  pattern: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
      className={`${pattern} group relative cursor-pointer overflow-hidden`}
    >
      <EditableImage
        imageUrl={imageUrl}
        category={category}
        className="h-full w-full"
        placeholder={
          <div
            className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            style={{
              background: `linear-gradient(${120 + index * 35}deg, #c4b99a 0%, #a89878 40%, #8c7e64 100%)`,
              minHeight: pattern.includes("row-span-2") ? "400px" : "200px",
            }}
          />
        }
      >
        {/* 실제 이미지 위 호버 줌 효과 */}
        {imageUrl && (
          <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
        )}

        {/* Hover overlay with info */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">
            {CATEGORY_LABELS[category]}
          </p>
          {brand && (
            <p className="mt-1 text-sm font-light text-white">{brand}</p>
          )}
          {photographer && (
            <p className="mt-0.5 text-[11px] text-white/50">
              Ph. {photographer}
            </p>
          )}
        </div>

        {/* Subtle border on hover */}
        <div className="absolute inset-0 border border-white/0 transition-all duration-500 group-hover:border-white/10" />
      </EditableImage>
    </motion.div>
  );
}

export default function Highlights() {
  const { images: blobImages } = useImages();

  // Blob 이미지를 슬롯에 매핑 (순서대로 채움)
  const slots = GRID_PATTERN.map((pattern, i) => {
    const blobImg = blobImages[i];
    const placeholder = placeholderImages[i];

    return {
      pattern,
      imageUrl: blobImg?.url,
      category: blobImg?.category || SLOT_CATEGORIES[i] || placeholder?.category || "casual",
      brand: blobImg?.metadata?.brand || placeholder?.metadata?.brand,
      photographer: blobImg?.metadata?.photographer || placeholder?.metadata?.photographer,
    };
  });

  return (
    <section id="highlights" className="overflow-hidden bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]"
        >
          Highlights
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 font-display text-3xl font-light tracking-tight md:text-4xl"
        >
          Range &amp; Spectrum
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm text-[var(--text-light)]"
        >
          다양한 무드와 컨셉을 소화하는 폭넓은 스펙트럼
        </motion.p>

        {/* Asymmetric Magazine Grid */}
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {slots.map((slot, i) => (
            <HighlightCard
              key={i}
              imageUrl={slot.imageUrl}
              category={slot.category as Category}
              brand={slot.brand}
              photographer={slot.photographer}
              index={i}
              pattern={slot.pattern}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
