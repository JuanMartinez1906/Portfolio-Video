"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-10 px-6 border-t border-[#2a2a2a] bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <span className="text-muted-2 text-xs">
          © {new Date().getFullYear()} Juan Martinez. {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
