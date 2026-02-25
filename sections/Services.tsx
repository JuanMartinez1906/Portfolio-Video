"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const icons = [
  // Content creation icon
  <svg key="content" viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
    <rect x="4" y="10" width="32" height="20" rx="2" stroke="#e63946" strokeWidth="1.5" />
    <path d="M16 15l10 5-10 5V15z" fill="#e63946" />
    <path d="M4 30h32" stroke="#e63946" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Ads icon
  <svg key="ads" viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden>
    <path
      d="M20 4L4 14v12l16 10 16-10V14L20 4z"
      stroke="#e63946"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M4 14l16 10M36 14L20 24M20 24V34"
      stroke="#e63946"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
];

const tags = [
  ["Instagram", "TikTok", "YouTube Shorts"],
  ["CTR", "ROAS", "CPA"],
];

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-xs tracking-[0.35em] uppercase">
              {t.services.eyebrow}
            </span>
          </div>
          <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-wide">
            {t.services.title}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {t.services.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[#161616] border border-[#2a2a2a] p-8 md:p-10 overflow-hidden hover:border-accent/50 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(230,57,70,0.18)]"
            >
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-accent/10 group-hover:border-accent/30 transition-colors duration-400" />

              <div className="mb-7">{icons[i]}</div>

              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-tight">
                {item.title}
              </h3>

              <p className="text-muted leading-relaxed mb-7 text-sm md:text-base">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {tags[i].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-accent/30 text-accent text-xs tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-muted-2 text-xs tracking-wide">{item.footer}</p>

              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
