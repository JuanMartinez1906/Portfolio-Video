"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { type Locale } from "@/lib/i18n";

const NAV_HREFS = [
  { key: "work", href: "#work" },
  { key: "services", href: "#services" },
  { key: "about", href: "#about" },
] as const;

const LANGUAGES: { locale: Locale; label: string; short: string }[] = [
  { locale: "es", label: "Español", short: "ES" },
  { locale: "en", label: "English", short: "EN" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLabels: Record<string, string> = {
    work: t.nav.work,
    services: t.nav.services,
    about: t.nav.about,
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#2a2a2a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-bebas text-2xl tracking-[0.25em] text-white hover:text-accent transition-colors duration-200 shrink-0"
        >
          JUAN
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {NAV_HREFS.map(({ key, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="relative text-sm text-muted hover:text-white transition-colors duration-200 group"
            >
              {navLabels[key]}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right side: language switcher + hamburger */}
        <div className="flex items-center gap-3">
          {/* ── Language dropdown ── */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2a2a2a] hover:border-accent/50 text-muted hover:text-white text-xs tracking-wider transition-all duration-200"
            >
              <span className="font-medium">
                {LANGUAGES.find((l) => l.locale === locale)?.short}
              </span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 12 12"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-36 bg-[#161616] border border-[#2a2a2a] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.locale}
                      onClick={() => {
                        setLocale(lang.locale);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors duration-150 ${
                        locale === lang.locale
                          ? "text-white bg-[#1f1f1f]"
                          : "text-muted hover:text-white hover:bg-[#1a1a1a]"
                      }`}
                    >
                      <span>{lang.label}</span>
                      {locale === lang.locale && (
                        <span className="text-accent text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px bg-white transition-all duration-300 origin-center ${
                mobileOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
              }`}
            />
            <span
              className={`block h-px bg-white transition-all duration-300 ${
                mobileOpen ? "w-0 opacity-0" : "w-4 opacity-100"
              }`}
            />
            <span
              className={`block h-px bg-white transition-all duration-300 origin-center ${
                mobileOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#0d0d0d]/98 border-t border-[#2a2a2a]"
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {NAV_HREFS.map(({ key, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="text-left text-lg text-muted hover:text-white transition-colors"
                >
                  {navLabels[key]}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
