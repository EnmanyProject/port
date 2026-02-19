"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section className="relative flex h-[100dvh] items-end overflow-hidden bg-[var(--bg-dark)]">
      {/* Background placeholder - replace with actual hero image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 w-full px-6 pb-16 md:px-12 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3 text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]"
          >
            {profile.title}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl font-light tracking-[0.05em] text-white md:text-7xl lg:text-8xl"
          >
            {profile.nameEn}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-2 text-lg text-white/50 md:text-xl"
          >
            {profile.name}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8"
          >
            <a
              href="#portfolio"
              className="inline-block border-b border-white/30 pb-1 text-[12px] tracking-[0.2em] uppercase text-white/60 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              View Portfolio
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
