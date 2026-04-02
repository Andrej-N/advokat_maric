import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "disclaimerPage" });
  return {
    title: t("title"),
    description: t("p1"),
  };
}

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DisclaimerContent />;
}

function DisclaimerContent() {
  const t = useTranslations("disclaimerPage");
  const year = new Date().getFullYear();

  const paragraphs = [
    "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11",
  ] as const;

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-accent/10 rounded-[var(--radius-md)] p-3">
              <ShieldAlert className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white-text">
              {t("title")}
            </h1>
          </div>

          <div className="h-px bg-white-border my-8" />

          <div className="space-y-6">
            {paragraphs.map((key) => (
              <p
                key={key}
                className="text-white-text-muted leading-relaxed"
              >
                {t(key)}
              </p>
            ))}
          </div>

          <div className="h-px bg-white-border my-8" />

          <p className="text-white-text-dim text-sm">
            &copy;{year} {t("footer")}
          </p>
        </div>
      </section>
    </div>
  );
}
