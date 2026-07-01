import { GA_ID, CONSENT_KEY } from "@/lib/analytics";

/**
 * Google Consent Mode v2 bootstrap. Server-rendered inline so it runs BEFORE
 * the GA script loads: analytics is denied by default and only restored to
 * "granted" if the visitor previously accepted (stored in localStorage).
 *
 * Must be rendered in the root layout <head>. No-op without NEXT_PUBLIC_GA_ID.
 */
export function ConsentInit() {
  if (!GA_ID) return null;

  const js = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });
    try {
      if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
        gtag('consent', 'update', { analytics_storage: 'granted' });
      }
    } catch (e) {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
