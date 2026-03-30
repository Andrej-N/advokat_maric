"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

export function AboutPreview() {
  const t = useTranslations("about");

  const stats = [
    { value: t("yearFounded"), label: t("yearFoundedLabel") },
    { value: t("experienceYears"), label: t("experienceLabel") },
    { value: t("areasCount"), label: t("areasLabel") },
  ];

  return (
    <section className="py-28 px-4 bg-white-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white-text mb-6">
              {t("title")}
            </h2>
            <p className="text-white-text-muted leading-relaxed mb-4">
              {t("description")}
            </p>
            <p className="text-white-text-muted leading-relaxed mb-8">
              {t("services")}
            </p>
            <Link
              href="/o-nama"
              className="inline-flex items-center text-accent hover:text-accent-dim font-medium transition-colors"
            >
              {t("title")} &rarr;
            </Link>
          </div>

          {/* Stats */}
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
      </div>
    </section>
  );
}
