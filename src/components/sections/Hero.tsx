"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/portfolio";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100dvh] overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 40%, #0d0d0d 100%)",
          }}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[11px] tracking-[0.35em] uppercase text-[var(--accent)]"
          >
            {profile.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-3 font-display text-[clamp(3rem,10vw,7rem)] font-light leading-[0.95] tracking-[0.02em] text-white"
          >
            {profile.nameEn}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-3 text-base text-white/40 md:text-lg"
          >
            French-born, Seoul-based fashion &amp; beauty model
          </motion.p>

          <motion.a
            href="#highlights"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-10 inline-block border-b border-white/20 pb-1 text-[11px] tracking-[0.2em] uppercase text-white/50 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            View Portfolio
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
