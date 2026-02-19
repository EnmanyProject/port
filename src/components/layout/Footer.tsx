"use client";

import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--bg-dark)] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-12">
        <p className="font-display text-sm tracking-[0.15em] text-white/30">
          {profile.nameEn}
        </p>
        <p className="text-[12px] text-white/20">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
