"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="bg-[var(--bg-dark)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)]">
              Contact
            </p>
            <h2 className="mt-4 font-display text-3xl font-light text-white md:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/50">
              캐스팅, 협업, 촬영 문의 등 자유롭게 연락주세요.
            </p>

            <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-white/30">
                  Email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1 block text-[15px] text-white/70 transition-colors hover:text-[var(--accent)]"
                >
                  {profile.email}
                </a>
              </div>
              {profile.sns.instagram && (
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/30">
                    Instagram
                  </p>
                  <a
                    href={profile.sns.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[15px] text-white/70 transition-colors hover:text-[var(--accent)]"
                  >
                    @instagram
                  </a>
                </div>
              )}
            </div>

            {/* Comp Card Download */}
            <div className="mt-10">
              <a
                href="/compcard.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[12px] tracking-[0.1em] uppercase text-white/60 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Comp Card (PDF)
              </a>
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-2 w-full border-b border-white/15 bg-transparent px-0 py-3 text-[15px] text-white outline-none placeholder:text-white/20 focus:border-[var(--accent)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-2 w-full border-b border-white/15 bg-transparent px-0 py-3 text-[15px] text-white outline-none placeholder:text-white/20 focus:border-[var(--accent)]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40">
                  Inquiry Type
                </label>
                <select className="mt-2 w-full border-b border-white/15 bg-transparent px-0 py-3 text-[15px] text-white/70 outline-none focus:border-[var(--accent)]">
                  <option value="casting" className="bg-[var(--bg-dark)]">Casting</option>
                  <option value="collaboration" className="bg-[var(--bg-dark)]">Collaboration</option>
                  <option value="general" className="bg-[var(--bg-dark)]">General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  className="mt-2 w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-[15px] text-white outline-none placeholder:text-white/20 focus:border-[var(--accent)]"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-[var(--accent)] px-8 py-3 text-[12px] tracking-[0.15em] uppercase text-white transition-all hover:bg-[var(--accent-light)] hover:text-[var(--text-primary)]"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
