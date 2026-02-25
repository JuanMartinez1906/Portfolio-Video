"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

// Render a single bio paragraph (supports optional bold1/mid/bold2/post or plain)
function BioParagraph({
  paragraph,
}: {
  paragraph: {
    pre?: string;
    bold1?: string;
    mid?: string;
    bold2?: string;
    post?: string;
    plain?: string;
  };
}) {
  if (paragraph.plain) {
    return <p>{paragraph.plain}</p>;
  }
  return (
    <p>
      {paragraph.pre}
      {paragraph.bold1 && (
        <span className="text-white font-medium">{paragraph.bold1}</span>
      )}
      {paragraph.mid}
      {paragraph.bold2 && (
        <span className="text-white font-medium">{paragraph.bold2}</span>
      )}
      {paragraph.post}
    </p>
  );
}

export default function About() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-8 h-px bg-accent" />
          <span className="text-accent text-xs tracking-[0.35em] uppercase">
            {t.about.eyebrow}
          </span>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* Left: Photo + Skills */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Photo */}
            <div className="relative mb-10 w-fit mx-auto md:mx-0">
              <div className="w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden border border-accent/15">
                <img
                  src="/Foto Profile.png"
                  alt="Juan Martinez"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-52 h-52 md:w-60 md:h-60 rounded-full border border-[#2a2a2a]" />
              <div className="absolute bottom-3 right-0 md:-right-2 w-4 h-4 rounded-full bg-accent" />
            </div>

            {/* Skills */}
            <p className="text-muted-2 text-[10px] tracking-[0.35em] uppercase mb-4">
              {t.about.toolsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  className="px-3 py-1.5 bg-[#161616] border border-[#2a2a2a] text-muted text-xs hover:border-accent/40 hover:text-white transition-all duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide mb-8 leading-none">
              {t.about.title1}
              <br />
              <span className="text-accent">{t.about.title2}</span>
            </h2>

            <div className="space-y-5 text-muted leading-relaxed text-sm md:text-base">
              {t.about.bio.map((paragraph, i) => (
                <BioParagraph key={i} paragraph={paragraph} />
              ))}
            </div>

            <div className="flex items-center gap-4 mt-10">
              <div className="w-12 h-px bg-accent" />
              <p className="text-muted-2 text-xs tracking-[0.2em] uppercase">
                {t.about.footer}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
