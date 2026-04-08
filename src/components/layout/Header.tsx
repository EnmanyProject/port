"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Portfolio", href: "#highlights" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-12">
        {/* 로고 길게 누르면 어드민으로 이동 (비밀 진입점) */}
        <a
          href="#"
          className={`font-display text-lg tracking-[0.15em] transition-colors duration-500 select-none md:text-xl ${
            scrolled ? "text-[var(--text-primary)]" : "text-white"
          }`}
          onTouchStart={() => {
            longPressTimer.current = setTimeout(() => {
              router.push("/admin/login");
            }, 1000);
          }}
          onTouchEnd={() => {
            if (longPressTimer.current) clearTimeout(longPressTimer.current);
          }}
          onMouseDown={() => {
            longPressTimer.current = setTimeout(() => {
              router.push("/admin/login");
            }, 1000);
          }}
          onMouseUp={() => {
            if (longPressTimer.current) clearTimeout(longPressTimer.current);
          }}
          onMouseLeave={() => {
            if (longPressTimer.current) clearTimeout(longPressTimer.current);
          }}
        >
          PORTFOLIO
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] tracking-[0.15em] uppercase transition-colors duration-500 hover:text-[var(--accent)] ${
                scrolled ? "text-[var(--text-secondary)]" : "text-white/80"
              }`}
            >
              {item.label}
            </a>
          ))}
          <ShareButton scrolled={scrolled} />
        </nav>

        {/* Mobile: 공유 + 메뉴 버튼 */}
        <div className="flex items-center gap-1 md:hidden">
          <ShareButton scrolled={scrolled} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col gap-[5px] p-2 ${
              scrolled ? "text-[var(--text-primary)]" : "text-white"
            }`}
            aria-label="Menu"
          >
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              menuOpen ? "translate-y-[6.5px] rotate-45" : ""
            } ${scrolled ? "bg-[var(--text-primary)]" : "bg-white"}`}
          />
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            } ${scrolled ? "bg-[var(--text-primary)]" : "bg-white"}`}
          />
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            } ${scrolled ? "bg-[var(--text-primary)]" : "bg-white"}`}
          />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 border-b border-[var(--border)] bg-white/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-[13px] tracking-[0.15em] uppercase text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// 공유 버튼 — Web Share API 지원 시 네이티브 공유, 아니면 클립보드 복사
function ShareButton({ scrolled }: { scrolled: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.origin;
    const shareData = {
      title: "OTHMAN — Portfolio",
      text: "Check out my portfolio",
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`relative p-2 transition-colors duration-500 hover:text-[var(--accent)] ${
        scrolled ? "text-[var(--text-secondary)]" : "text-white/80"
      }`}
      aria-label="Share portfolio"
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      )}
    </button>
  );
}
