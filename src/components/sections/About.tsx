"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/data/portfolio";

// Polaroid-style card component
function Polaroid({
  label,
  rotate,
  delay,
}: {
  label: string;
  rotate: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="w-full max-w-[200px] md:max-w-[240px]"
    >
      <div className="rounded-sm bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] md:p-3">
        <div
          className="aspect-[3/4] w-full bg-[var(--bg-secondary)]"
          style={{
            background:
              "linear-gradient(180deg, #ddd5c8 0%, #c8bfb0 100%)",
          }}
        />
        <p className="mt-2 text-center font-accent text-[11px] tracking-wide text-[var(--text-light)] md:text-xs">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]"
        >
          About
        </motion.p>

        <div className="mt-12 grid gap-16 md:grid-cols-2">
          {/* Left: Polaroid photos */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <Polaroid label="Front" rotate={-4} delay={0.1} />
            <Polaroid label="Side" rotate={2} delay={0.25} />
            <Polaroid label="Full Body" rotate={-2} delay={0.4} />
          </div>

          {/* Right: Profile text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
              {profile.name}
            </h2>
            <p className="mt-1 font-accent text-base text-[var(--text-light)] md:text-lg">
              {profile.nameEn}
            </p>

            <p className="mt-6 text-[15px] leading-[1.8] text-[var(--text-secondary)]">
              {profile.bio}
            </p>

            {/* Stats grid */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-6">
              {Object.entries(profile.stats).map(([key, value]) => (
                <div key={key}>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-light)]">
                    {key}
                  </p>
                  <p className="mt-0.5 text-[14px] font-medium text-[var(--text-primary)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* SNS links */}
            <div className="mt-6 flex gap-4">
              {profile.sns.instagram && (
                <a
                  href={profile.sns.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] tracking-[0.1em] uppercase text-[var(--text-light)] transition-colors hover:text-[var(--accent)]"
                >
                  Instagram &rarr;
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
