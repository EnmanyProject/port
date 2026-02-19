"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]"
        >
          About
        </motion.p>

        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          {/* Photo side - 60% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <div
              className="aspect-[3/4] w-full rounded-sm bg-[var(--bg-secondary)]"
              style={{
                background:
                  "linear-gradient(180deg, #e8e4de 0%, #d4cec4 100%)",
              }}
            />
          </motion.div>

          {/* Text side - 40% */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center md:col-span-2"
          >
            <h2 className="font-display text-3xl font-light tracking-tight md:text-4xl">
              {profile.name}
            </h2>
            <p className="mt-1 font-accent text-lg text-[var(--text-light)]">
              {profile.nameEn}
            </p>

            <p className="mt-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {profile.bio}
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-8">
              {Object.entries(profile.stats).map(([key, value]) => (
                <div key={key}>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-light)]">
                    {key}
                  </p>
                  <p className="mt-1 text-[15px] text-[var(--text-primary)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* SNS */}
            {profile.sns.instagram && (
              <div className="mt-8">
                <a
                  href={profile.sns.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] tracking-[0.15em] uppercase text-[var(--text-light)] transition-colors hover:text-[var(--accent)]"
                >
                  Instagram &rarr;
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
