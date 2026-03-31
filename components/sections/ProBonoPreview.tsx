"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ExternalLink } from "lucide-react";

export function ProBonoPreview() {
  const t = useTranslations("proBono");

  const orgs = [
    { name: t("org1"), url: t("org1Url") },
    { name: t("org2"), url: t("org2Url") },
    { name: t("org3"), url: t("org3Url") },
  ];

  return (
    <section className="py-28 px-4 bg-white-bg">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white-text mb-4">
            {t("title")}
          </h2>
          <p className="text-white-text-muted leading-relaxed mb-10">
            {t("description")}
          </p>

          <div className="space-y-4 mb-10">
            {orgs.map((org, i) => (
              <a
                key={i}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white-bg-alt border border-white-border rounded-[var(--radius-md)] px-6 py-4 text-white-text text-sm flex items-center justify-between gap-3 hover:border-accent/40 transition-colors group"
              >
                <span className="group-hover:text-accent transition-colors">{org.name}</span>
                <ExternalLink className="w-4 h-4 text-white-text-dim group-hover:text-accent shrink-0 transition-colors" />
              </a>
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
