"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { StoredImage } from "@/lib/store";

interface ImageContextType {
  images: StoredImage[];
  isAdmin: boolean;
  uploadImage: (file: File, category: string) => Promise<void>;
  refresh: () => Promise<void>;
  openLightbox: (index: number) => void;
}

const ImageContext = createContext<ImageContextType>({
  images: [],
  isAdmin: false,
  uploadImage: async () => {},
  refresh: async () => {},
  openLightbox: () => {},
});

export function useImages() {
  return useContext(ImageContext);
}

async function checkAdmin(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth", { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/images");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch {
      // 빈 배열 유지
    }
  }, []);

  useEffect(() => {
    refresh();
    checkAdmin().then(setIsAdmin);
  }, [refresh]);

  const uploadImage = useCallback(
    async (file: File, category: string) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("alt", file.name.replace(/\.[^/.]+$/, ""));

      await fetch("/api/images", { method: "POST", body: formData });
      await refresh();
    },
    [refresh]
  );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <ImageContext.Provider value={{ images, isAdmin, uploadImage, refresh, openLightbox }}>
      {children}
      <FullscreenLightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </ImageContext.Provider>
  );
}

// ─── 전체화면 라이트박스 ───

const SWIPE_THRESHOLD = 50;

function FullscreenLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: StoredImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
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
      if (offset.x > SWIPE_THRESHOLD || velocity.x > 500) {
        handlePrev();
        return;
      }
      if (offset.x < -SWIPE_THRESHOLD || velocity.x < -500) {
        handleNext();
        return;
      }
      if (offset.y > 100) {
        onClose();
      }
    },
    [handlePrev, handleNext, onClose]
  );

  // 키보드 네비게이션 + 스크롤 잠금
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

  if (!isOpen || !current) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
        onClick={onClose}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 text-white/60 transition-colors hover:text-white"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* 이전 버튼 (데스크톱) */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 z-20 hidden p-3 text-white/40 transition-colors hover:text-white md:left-8 md:block"
          aria-label="Previous"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* 스와이프 가능한 이미지 영역 */}
        <div
          className="relative flex h-[85vh] w-[90vw] items-center justify-center md:w-[75vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current.id}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 0.92 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, scale: 0.92 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
              style={{ touchAction: "pan-y" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.url}
                alt={current.alt}
                className="max-h-[85vh] max-w-full rounded-sm object-contain"
                draggable={false}
              />

              {/* 이미지 정보 오버레이 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--accent)]">
                  {current.category}
                </p>
                {current.metadata?.brand && (
                  <p className="mt-1 text-sm text-white/80">{current.metadata.brand}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 다음 버튼 (데스크톱) */}
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 z-20 hidden p-3 text-white/40 transition-colors hover:text-white md:right-8 md:block"
          aria-label="Next"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* 프로그레스 도트 + 카운터 */}
        {images.length > 1 && (
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
                />
              ))}
            </div>
            <span className="text-[12px] tracking-[0.1em] text-white/30">
              {currentIndex! + 1}/{images.length}
            </span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
