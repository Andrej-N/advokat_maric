"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { Heart } from "lucide-react";

export function ProBonoPreview() {
  const t = useTranslations("proBono");

  const orgs = [t("org1"), t("org2"), t("org3")];

  return (
    <section className="py-28 px-4 bg-white-bg">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white-text mb-4">
            {t("title")}
          </h2>
          <p className="text-white-text-muted mb-4">{t("subtitle")}</p>
          <p className="text-white-text-muted leading-relaxed mb-10">
            {t("description")}
          </p>

          <div className="space-y-4 mb-10">
            {orgs.map((org, i) => (
              <div
                key={i}
                className="bg-white-bg-alt border border-white-border rounded-[var(--radius-md)] px-6 py-4 text-white-text text-sm"
              >
                {org}
              </div>
            ))}
          </div>

          <Link
            href="/pro-bono"
            className="inline-flex items-center text-accent hover:text-accent-dim font-medium transition-colors"
          >
            {t("title")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
