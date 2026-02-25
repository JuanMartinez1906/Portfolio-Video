"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

function AnimatedCounter({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const hasDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!active) return;
    const duration = 2200;
    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(hasDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };

    requestAnimationFrame(tick);
  }, [active, value, hasDecimal]);

  const formatted = hasDecimal ? display.toFixed(1) : display.toString();

  return (
    <span>
      {formatted}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-6 bg-[#111] border-y border-[#2a2a2a] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs tracking-[0.35em] uppercase mb-3">
            {t.stats.eyebrow}
          </p>
          <p className="text-muted text-lg max-w-lg mx-auto leading-relaxed">
            {t.stats.captionPre}{" "}
            <span className="text-white font-medium">{t.stats.captionBold}</span>{" "}
            {t.stats.captionPost}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-bebas text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-none text-white mb-3 tracking-wide">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  active={inView}
                />
              </div>
              <p className="text-muted-2 text-sm tracking-wide">
                {t.stats.labels[i]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
