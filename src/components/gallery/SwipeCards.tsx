"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { PortfolioImage } from "@/data/portfolio";
import { CATEGORY_LABELS } from "@/data/portfolio";

interface SwipeCardsProps {
  images: PortfolioImage[];
  onImageClick: (index: number) => void;
}

const DRAG_THRESHOLD = 40;
const VELOCITY_THRESHOLD = 300;

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "80%" : "-80%",
    opacity: 0,
    scale: 0.88,
    rotateY: direction > 0 ? 8 : -8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-80%" : "80%",
    opacity: 0,
    scale: 0.88,
    rotateY: direction > 0 ? -8 : 8,
  }),
};

const cardTransition = {
  x: { type: "spring" as const, stiffness: 350, damping: 35, mass: 0.6 },
  opacity: { duration: 0.2, ease: "easeOut" as const },
  scale: { type: "spring" as const, stiffness: 400, damping: 30 },
  rotateY: { type: "spring" as const, stiffness: 400, damping: 35 },
};

export default function SwipeCards({ images, onImageClick }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const current = images[currentIndex];
  const prevImage = currentIndex > 0 ? images[currentIndex - 1] : null;
  const nextImage = currentIndex < images.length - 1 ? images[currentIndex + 1] : null;

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length || index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex, images.length]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const { offset, velocity } = info;

      if (
        offset.x > DRAG_THRESHOLD ||
        velocity.x > VELOCITY_THRESHOLD
      ) {
        if (currentIndex > 0) goTo(currentIndex - 1);
        return;
      }
      if (
        offset.x < -DRAG_THRESHOLD ||
        velocity.x < -VELOCITY_THRESHOLD
      ) {
        if (currentIndex < images.length - 1) goTo(currentIndex + 1);
        return;
      }
    },
    [currentIndex, images.length, goTo]
  );

  if (!current) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Card area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "60vh", perspective: "1200px" }}
      >
        {/* Peek previous card */}
        {prevImage && (
          <div
            className="absolute left-0 top-1/2 z-0 w-[15%] -translate-y-1/2 opacity-30"
            style={{
              aspectRatio: `${prevImage.width}/${prevImage.height}`,
              maxHeight: "50vh",
              background: `linear-gradient(135deg, #c4b99a 0%, #a89878 100%)`,
              borderRadius: "8px",
            }}
          />
        )}

        {/* Main swipeable card */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={cardTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onClick={() => {
              if (!isDragging) onImageClick(currentIndex);
            }}
            className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
          >
            <div className="relative mx-auto h-full w-[85%] overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
              <div
                className="h-full w-full"
                style={{
                  background: `linear-gradient(${135 + currentIndex * 30}deg, #c4b99a 0%, #a89878 50%, #8c7e64 100%)`,
                }}
              />
              {/* Card info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--accent)]">
                  {CATEGORY_LABELS[current.category]}
                </p>
                {current.metadata?.brand && (
                  <p className="mt-0.5 text-[13px] font-light text-white">
                    {current.metadata.brand}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Peek next card */}
        {nextImage && (
          <div
            className="absolute right-0 top-1/2 z-0 w-[15%] -translate-y-1/2 opacity-30"
            style={{
              aspectRatio: `${nextImage.width}/${nextImage.height}`,
              maxHeight: "50vh",
              background: `linear-gradient(135deg, #a89878 0%, #8c7e64 100%)`,
              borderRadius: "8px",
            }}
          />
        )}
      </div>

      {/* Progress dots */}
      <div className="mt-5 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "h-2 w-5 bg-[var(--accent)]"
                : "h-2 w-2 bg-[var(--border)]"
            }`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="mt-2 text-[12px] tracking-[0.1em] text-[var(--text-light)]">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}
