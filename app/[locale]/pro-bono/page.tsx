import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Heart } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "proBono" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProBonoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProBonoPageContent />;
}

function ProBonoPageContent() {
  const t = useTranslations("proBono");

  const orgs = [t("org1"), t("org2"), t("org3")];

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-10 h-10 text-accent mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white-text mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-white-text-muted mb-4">{t("subtitle")}</p>

          <div className="h-px bg-white-border my-12" />

          <p className="text-white-text-muted leading-relaxed text-lg mb-12">
            {t("description")}
          </p>

          <h2 className="text-xl font-semibold text-white-text mb-6">
            {t("subtitle")}
          </h2>

          <div className="space-y-4">
            {orgs.map((org, i) => (
              <div
                key={i}
                className="bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] px-6 py-5 flex items-center gap-4"
              >
                <Heart className="w-5 h-5 text-accent shrink-0" />
                <span className="text-white-text">{org}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
