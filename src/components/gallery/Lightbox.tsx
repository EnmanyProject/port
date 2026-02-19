"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { PortfolioImage } from "@/data/portfolio";
import { CATEGORY_LABELS } from "@/data/portfolio";

interface LightboxProps {
  images: PortfolioImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY = 500;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.92,
  }),
};

const springTransition = {
  x: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 },
  opacity: { duration: 0.25, ease: "easeOut" as const },
  scale: { duration: 0.25, ease: "easeOut" as const },
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [direction, setDirection] = useState(0);
  const isOpen = currentIndex !== null;
  const current = currentIndex !== null ? images[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    setDirection(-1);
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    setDirection(1);
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onNavigate]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;

      // Swipe right → previous (or velocity-based)
      if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY) {
        handlePrev();
        return;
      }
      // Swipe left → next (or velocity-based)
      if (offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY) {
        handleNext();
        return;
      }

      // Swipe down → close
      if (offset.y > 100) {
        onClose();
      }
    },
    [handlePrev, handleNext, onClose]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 text-white/60 transition-colors hover:text-white"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev button (desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 z-20 hidden p-3 text-white/40 transition-colors hover:text-white md:left-8 md:block"
            aria-label="Previous"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Swipeable image area */}
          <div
            className="relative flex h-[85vh] w-[90vw] items-center justify-center md:w-[75vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={springTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
                style={{ touchAction: "pan-y" }}
              >
                <div className="relative h-full w-full">
                  <div
                    className="mx-auto h-full rounded-sm"
                    style={{
                      aspectRatio: `${current.width}/${current.height}`,
                      maxHeight: "85vh",
                      maxWidth: "100%",
                      width: "auto",
                      background: `linear-gradient(135deg, #c4b99a 0%, #a89878 50%, #8c7e64 100%)`,
                    }}
                  />

                  {/* Image info overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"
                  >
                    <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--accent)]">
                      {CATEGORY_LABELS[current.category]}
                    </p>
                    {current.metadata?.brand && (
                      <p className="mt-1 text-sm text-white/80">
                        {current.metadata.brand}
                      </p>
                    )}
                    {current.metadata?.photographer && (
                      <p className="mt-1 text-[12px] text-white/50">
                        Photo by {current.metadata.photographer}
                      </p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button (desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 z-20 hidden p-3 text-white/40 transition-colors hover:text-white md:right-8 md:block"
            aria-label="Next"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Counter + progress dots */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(i > currentIndex! ? 1 : -1);
                    onNavigate(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 bg-[var(--accent)]"
                      : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-[12px] tracking-[0.1em] text-white/30">
              {currentIndex! + 1}/{images.length}
            </span>
          </div>

          {/* Swipe hint (mobile) */}
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 text-[11px] text-white/20 md:hidden"
          >
            Swipe to navigate
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
