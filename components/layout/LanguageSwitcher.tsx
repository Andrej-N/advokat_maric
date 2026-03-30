"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/routing";
import { locales, localeShortNames, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="text-white-text-dim mx-1 opacity-40">|</span>}
          <button
            onClick={() => switchLocale(loc)}
            className={`cursor-pointer text-sm font-medium transition-colors ${
              locale === loc
                ? "text-accent"
                : "text-white-text-muted hover:text-white-text"
            }`}
          >
            {localeShortNames[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
