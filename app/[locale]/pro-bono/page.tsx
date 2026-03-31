import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

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

  const orgs = [
    { name: t("org1"), url: t("org1Url") },
    { name: t("org2"), url: t("org2Url") },
    { name: t("org3"), url: t("org3Url") },
  ];

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white-text mb-4">
            {t("title")}
          </h1>

          <div className="h-px bg-white-border my-12" />

          <p className="text-white-text-muted leading-relaxed text-lg mb-12">
            {t("description")}
          </p>

          <div className="space-y-4">
            {orgs.map((org, i) => (
              <a
                key={i}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] px-6 py-5 flex items-center justify-between gap-4 hover:border-accent/40 transition-colors group"
              >
                <span className="text-white-text group-hover:text-accent transition-colors">
                  {org.name}
                </span>
                <ExternalLink className="w-4 h-4 text-white-text-dim group-hover:text-accent shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
