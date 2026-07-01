"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { Cookie } from "lucide-react";
import {
  GA_ID,
  grantConsent,
  denyConsent,
  hasStoredConsent,
} from "@/lib/analytics";

/**
 * GDPR cookie consent banner. Shows once until the visitor chooses; the choice
 * is stored in localStorage and toggles Google Analytics via Consent Mode v2.
 */
export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only ask when analytics is actually configured and no choice was made.
    if (GA_ID && !hasStoredConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  function handleAccept() {
    grantConsent();
    setVisible(false);
  }

  function handleDecline() {
    denyConsent();
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[60] bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] shadow-xl p-5"
    >
      <div className="flex items-start gap-3">
        <Cookie className="w-6 h-6 text-accent shrink-0 mt-0.5" />
        <div className="min-w-0">
          <h2 className="text-white-text font-semibold mb-1">{t("title")}</h2>
          <p className="text-white-text-dim text-sm leading-relaxed">
            {t("message")}{" "}
            <Link
              href="/politika-privatnosti"
              className="text-accent hover:underline"
            >
              {t("privacyLink")}
            </Link>
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              type="button"
              onClick={handleAccept}
              className="bg-accent hover:bg-accent-dim text-white px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors cursor-pointer"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="bg-transparent border border-white-border text-white-text-dim hover:text-white-text px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors cursor-pointer"
            >
              {t("decline")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
