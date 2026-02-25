"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const IG_STATIC = Array.from({ length: 6 }, (_, i) => `/thumbnails/ig/${i + 1}.jpg`);
const TT_STATIC = Array.from({ length: 6 }, (_, i) => `/thumbnails/tt/${i + 1}.jpg`);

const YT_FALLBACK = [
  "from-red-900 via-red-950 to-gray-900",
  "from-gray-900 via-red-900 to-red-950",
  "from-red-950 via-gray-900 to-red-900",
  "from-gray-900 via-red-950 to-gray-800",
  "from-red-900 via-gray-900 to-red-950",
  "from-red-950 via-red-900 to-gray-900",
  "from-gray-800 via-red-950 to-red-900",
  "from-red-900 via-gray-800 to-red-950",
];

const FALLBACK_GRADIENT = "from-zinc-900 via-zinc-800 to-zinc-900";

function StaticThumb({ src, aspect = "9/16" }: { src: string; aspect?: string }) {
  return (
    <div className="overflow-hidden rounded-[3px] opacity-90 bg-zinc-900" style={{ aspectRatio: aspect }}>
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        onError={(e) => { (e.currentTarget.parentElement as HTMLDivElement).classList.add("bg-gradient-to-b", FALLBACK_GRADIENT); e.currentTarget.style.display = "none"; }}
      />
    </div>
  );
}

function PlatformCard({
  platform,
  handle,
  followers,
  href,
  accentColor,
  icon,
  visitLabel,
  delay,
  inView,
  children,
}: {
  platform: string;
  handle: string;
  followers?: string;
  href: string;
  accentColor: string;
  icon: React.ReactNode;
  visitLabel: string;
  delay: number;
  inView: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#161616] border border-[#2a2a2a] p-6 md:p-8 relative overflow-hidden group hover:border-[#3a3a3a] transition-colors duration-300"
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at top right, ${accentColor}, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="shrink-0" style={{ color: accentColor }}>{icon}</div>
        <span className="text-white font-semibold tracking-wide">{platform}</span>
      </div>

      <p className="text-muted text-sm mb-1">{handle}</p>
      {followers && (
        <p className="font-bebas text-2xl tracking-wider mb-6" style={{ color: accentColor }}>
          {followers}
        </p>
      )}

      {/* Thumbnail grid */}
      <div className="mb-6">{children}</div>

      {/* CTA */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 border text-sm font-medium tracking-wide transition-all duration-200 hover:text-white group/btn"
        style={{ borderColor: accentColor + "55", color: accentColor }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = accentColor + "18";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = accentColor;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = accentColor + "55";
        }}
      >
        {visitLabel}
        <svg
          className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.37a8.16 8.16 0 004.77 1.52V7.44a4.85 4.85 0 01-1-.75z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function SocialProof() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [ytThumbs, setYtThumbs] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/youtube-feed")
      .then((r) => r.json())
      .then(({ videos }) => {
        if (videos?.length > 0) {
          setYtThumbs(videos.map((v: { thumbnail: string }) => v.thumbnail));
        }
      })
      .catch(() => {});
  }, []);

  const ytThumbsToShow = ytThumbs.length > 0 ? ytThumbs : null;

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#0d0d0d]">
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
              {t.socialProof.eyebrow}
            </span>
          </div>
          <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-wide mb-4">
            {t.socialProof.title}
          </h2>
          <p className="text-muted max-w-lg text-sm md:text-base leading-relaxed">
            {t.socialProof.subtitle}
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <PlatformCard
            platform="Instagram"
            handle="@jemartob"
            followers={t.socialProof.igFollowers}
            href="https://www.instagram.com/jemartob/"
            accentColor="#E1306C"
            icon={<InstagramIcon />}
            visitLabel={t.socialProof.visitProfile}
            delay={0.1}
            inView={inView}
          >
            <div className="grid grid-cols-3 gap-1.5">
              {IG_STATIC.map((src, i) => (
                <StaticThumb key={i} src={src} />
              ))}
            </div>
          </PlatformCard>

          <PlatformCard
            platform="TikTok"
            handle="@jemartob"
            followers={t.socialProof.ttFollowers}
            href="https://www.tiktok.com/@jemartob"
            accentColor="#fe2c55"
            icon={<TikTokIcon />}
            visitLabel={t.socialProof.visitProfile}
            delay={0.2}
            inView={inView}
          >
            <div className="grid grid-cols-3 gap-1.5">
              {TT_STATIC.map((src, i) => (
                <StaticThumb key={i} src={src} />
              ))}
            </div>
          </PlatformCard>

          <PlatformCard
            platform="YouTube"
            handle={t.socialProof.ytHandle}
            followers={t.socialProof.ytFollowers}
            href="https://www.youtube.com/@jemartob."
            accentColor="#FF0000"
            icon={<YouTubeIcon />}
            visitLabel={t.socialProof.ytLabel}
            delay={0.3}
            inView={inView}
          >
            <div className="grid grid-cols-2 gap-1.5">
              {(ytThumbsToShow ?? YT_FALLBACK).slice(0, 8).map((src, i) =>
                ytThumbsToShow ? (
                  <StaticThumb key={i} src={src} aspect="16/9" />
                ) : (
                  <div key={i} className={`aspect-video bg-gradient-to-b ${src} rounded-[3px] opacity-90`} />
                )
              )}
            </div>
          </PlatformCard>
        </div>
      </div>
    </section>
  );
}
