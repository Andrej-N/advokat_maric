"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import {
  Gavel,
  Briefcase,
  Home,
  Building2,
  Landmark,
  ShieldAlert,
  Scale,
} from "lucide-react";

const services = [
  { key: "criminal", icon: Gavel },
  { key: "labor", icon: Briefcase },
  { key: "civil", icon: Home },
  { key: "administrative", icon: Building2 },
  { key: "commercial", icon: Landmark },
  { key: "misdemeanor", icon: ShieldAlert },
  { key: "humanRights", icon: Scale },
] as const;

export function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <section className="py-28 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ key, icon: Icon }) => (
            <Link
              key={key}
              href={`/pravna-pomoc/${t(`${key}.slug`)}`}
              className="group bg-surface border border-border rounded-[var(--radius-lg)] p-8 hover:border-accent/40 transition-all duration-200"
            >
              <Icon className="w-8 h-8 text-accent-light mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {t(`${key}.title`)}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {t(`${key}.description`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
