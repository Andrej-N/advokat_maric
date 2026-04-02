import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Shield } from "lucide-react";
import privacyDataSrLatn from "@/content/politika-privatnosti.json";
import privacyDataSr from "@/content/politika-privatnosti-sr.json";
import privacyDataEn from "@/content/politika-privatnosti-en.json";

type PrivacySection = {
  heading: string;
  body: string;
  list?: string[];
  afterList?: string;
};

type PrivacyData = {
  title: string;
  sections: PrivacySection[];
};

const privacyByLocale: Record<string, PrivacyData> = {
  sr: privacyDataSr as PrivacyData,
  "sr-Latn": privacyDataSrLatn as PrivacyData,
  en: privacyDataEn as PrivacyData,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return {
    title: t("privacyLink"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = privacyByLocale[locale] || privacyByLocale["sr-Latn"];

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-accent/10 rounded-[var(--radius-md)] p-3">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white-text">
              {data.title}
            </h1>
          </div>

          <div className="h-px bg-white-border my-8" />

          <div className="space-y-8 text-white-text-muted leading-relaxed">
            {data.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-white-text mb-3">
                  {section.heading}
                </h2>
                <p className={section.list ? "mb-2" : undefined}>
                  {section.body}
                </p>
                {section.list && (
                  <ul className="list-disc pl-6 space-y-1">
                    {section.list.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.afterList && (
                  <p className="mt-2">{section.afterList}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
