"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/routing";
import { locales, localeShortNames, type Locale } from "@/lib/i18n/config";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";

interface Props {
  isTransparent?: boolean;
}

export function LanguageSwitcher({ isTransparent }: Props) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 focus:outline-none transition-colors ${
          isTransparent 
            ? "text-white/90 hover:text-white" 
            : "text-white-text-muted hover:text-white-text"
        }`}
      >
        <Globe className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />
        <span className="text-[13px] font-bold tracking-wide uppercase mt-[1px]">
          {localeShortNames[locale]}
        </span>
        <ChevronDown 
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
          strokeWidth={3} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] right-0 py-2 w-28 bg-white border border-white-border rounded-md shadow-xl shadow-black/5 z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors ${
                locale === loc
                  ? "text-accent bg-accent/5"
                  : "text-white-text hover:text-accent hover:bg-white-bg-alt"
              }`}
            >
              {localeShortNames[loc].toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
