"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const FEATURED_INDEX = 1; // Pack 6 videos

export default function Pricing() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-xs tracking-[0.35em] uppercase">
              {t.pricing.eyebrow}
            </span>
          </div>
          <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-wide">
            {t.pricing.title}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {t.pricing.plans.map((plan, i) => {
            const isFeatured = i === FEATURED_INDEX;
            const badge =
              i === FEATURED_INDEX
                ? t.pricing.popular
                : i === 2
                ? t.pricing.bestValue
                : null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative flex flex-col p-7 border transition-colors duration-300 ${
                  isFeatured
                    ? "border-accent bg-[#161616]"
                    : "border-[#2a2a2a] bg-[#161616] hover:border-[#3a3a3a]"
                }`}
              >
                {/* Featured glow */}
                {isFeatured && (
                  <div className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      background:
                        "radial-gradient(ellipse at top, #e63946 0%, transparent 70%)",
                    }}
                  />
                )}

                {/* Badge */}
                <div className="h-6 mb-5">
                  {badge && (
                    <span
                      className={`text-[9px] tracking-[0.25em] uppercase font-semibold px-2.5 py-1 ${
                        isFeatured
                          ? "bg-accent text-white"
                          : "border border-[#3a3a3a] text-muted-2"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </div>

                {/* Plan name */}
                <p className="text-muted-2 text-xs tracking-[0.2em] uppercase mb-3">
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mb-1">
                  <span className="font-bebas text-5xl text-white tracking-wide leading-none">
                    {plan.price}
                  </span>
                </div>
                <p className="text-muted text-xs mb-6">{plan.unit}</p>

                {/* Per-video & savings */}
                <div className="flex flex-col gap-1.5">
                  {plan.perVideo && (
                    <p className="text-muted text-sm">{plan.perVideo}</p>
                  )}
                  {plan.savings && (
                    <p className="text-accent text-xs font-medium">
                      {t.pricing.saving} {plan.savings}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
