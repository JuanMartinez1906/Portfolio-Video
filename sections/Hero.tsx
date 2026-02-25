"use client";

import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
      {/* ── Animated background ── */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#110a0a] to-[#0d0d0d]" />

        <motion.div
          className="absolute rounded-full blur-[120px] opacity-25"
          style={{
            width: "50vw",
            height: "50vw",
            background: "#e63946",
            left: "-10vw",
            top: "10%",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute rounded-full blur-[160px] opacity-15"
          style={{
            width: "40vw",
            height: "40vw",
            background: "#8b1a22",
            right: "-5vw",
            bottom: "15%",
          }}
          animate={{ x: [0, -20, 0], y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute inset-0 bg-[#0d0d0d]/50" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center pt-24 pb-32">
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-xs tracking-[0.35em] uppercase font-medium">
              {t.hero.role}
            </span>
            <span className="w-8 h-px bg-accent" />
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="font-bebas leading-none tracking-wider text-white mb-2"
            style={{ fontSize: "clamp(4rem, 15vw, 13rem)" }}
          >
            JUAN
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            className="font-bebas leading-none tracking-wider text-accent mb-10"
            style={{ fontSize: "clamp(4rem, 15vw, 13rem)" }}
          >
            MARTINEZ
          </motion.h1>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <button
              onClick={() => scrollTo("#work")}
              className="px-10 py-4 bg-accent text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-accent-hover transition-colors duration-200"
            >
              {t.hero.cta}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-2 text-[10px] tracking-[0.35em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
