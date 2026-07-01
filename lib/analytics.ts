// Google Analytics 4 helpers + cookie consent (Consent Mode v2).
// GA tracks nothing until the visitor accepts cookies in the banner.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const CONSENT_KEY = "cookie-consent";

type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** True if the visitor has already accepted or declined (banner stays hidden). */
export function hasStoredConsent(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}

/** Read the stored choice, or null if the visitor has not chosen yet. */
export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function setConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage blocked — consent simply won't persist */
  }
  // We only use analytics cookies (no ads), so only analytics_storage is updated.
  window.gtag?.("consent", "update", { analytics_storage: value });
}

/** Visitor accepted — enable Google Analytics. */
export function grantConsent() {
  setConsent("granted");
}

/** Visitor declined — keep analytics disabled. */
export function denyConsent() {
  setConsent("denied");
}

/**
 * Send a custom event to GA4 (e.g. phone click, form submit).
 * No-op until GA is loaded and consent is granted.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params ?? {});
}
