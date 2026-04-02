import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import termsDataSr from "@/content/opsti-uslovi-sr.json";
import termsDataSrLatn from "@/content/opsti-uslovi-sr-Latn.json";
import termsDataEn from "@/content/opsti-uslovi-en.json";

const termsByLocale: Record<string, typeof termsDataSr> = {
  sr: termsDataSr,
  "sr-Latn": termsDataSrLatn,
  en: termsDataEn,
};

const footerByLocale: Record<string, string> = {
  sr: "Адвокатска канцеларија Марић. Општи услови пословања.",
  "sr-Latn": "Advokatska kancelarija Marić. Opšti uslovi poslovanja.",
  en: "Marić Law Office. General Terms and Conditions.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return {
    title: t("termsLink"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const termsData = termsByLocale[locale] || termsDataSrLatn;
  const footer = footerByLocale[locale] || footerByLocale["sr-Latn"];
  const year = new Date().getFullYear();

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-accent/10 rounded-[var(--radius-md)] p-3">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white-text">
              {termsData.title}
            </h1>
          </div>

          <div className="h-px bg-white-border my-8" />

          {termsData.intro && (
            <p className="text-white-text-muted leading-relaxed mb-8">
              {termsData.intro}
            </p>
          )}

          <div className="space-y-10">
            {termsData.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-white-text mb-3">
                  {section.heading}
                </h2>
                <div className="space-y-3">
                  {section.body.split("\n").map((line, j) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    return (
                      <p
                        key={j}
                        className="text-white-text-muted leading-relaxed"
                      >
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-white-border my-8" />

          <p className="text-white-text-dim text-sm">
            &copy;{year} {footer}
          </p>
        </div>
      </section>
    </div>
  );
}
