"use client";

import { useState, useEffect } from "react";
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
        <a
          href="#"
          className={`font-display text-lg tracking-[0.15em] transition-colors duration-500 md:text-xl ${
            scrolled ? "text-[var(--text-primary)]" : "text-white"
          }`}
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
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex flex-col gap-[5px] p-2 md:hidden ${
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
