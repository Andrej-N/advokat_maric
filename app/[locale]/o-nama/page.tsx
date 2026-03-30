import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageContent />;
}

function AboutPageContent() {
  const t = useTranslations("about");

  const stats = [
    { value: t("yearFounded"), label: t("yearFoundedLabel") },
    { value: t("experienceYears"), label: t("experienceLabel") },
    { value: t("areasCount"), label: t("areasLabel") },
  ];

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white-text mb-8">
            {t("title")}
          </h1>
          <p className="text-xl text-white-text-muted mb-4">{t("subtitle")}</p>

          <div className="h-px bg-white-border my-12" />

          <p className="text-white-text-muted leading-relaxed text-lg mb-6">
            {t("description")}
          </p>
          <p className="text-white-text-muted leading-relaxed text-lg mb-12">
            {t("services")}
          </p>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-white-text-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
