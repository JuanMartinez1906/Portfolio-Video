"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Locale } from "./i18n";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof translations)[Locale];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: translations[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
