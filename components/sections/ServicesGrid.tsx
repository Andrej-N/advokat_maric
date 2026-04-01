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
  Users,
  Globe,
  ArrowRight,
} from "lucide-react";

const services = [
  { key: "criminal", icon: Gavel },
  { key: "labor", icon: Briefcase },
  { key: "civil", icon: Home },
  { key: "administrative", icon: Building2 },
  { key: "commercial", icon: Landmark },
  { key: "misdemeanor", icon: ShieldAlert },
  { key: "humanRights", icon: Users },
  { key: "diaspora", icon: Globe },
] as const;

export function ServicesGrid() {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");

  return (
    <section id="usluge" className="py-28 px-4 bg-gradient-to-br from-primary via-primary-light to-[#1A4A3A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.key}
                href={`/pravna-pomoc/${t(`${service.key}.slug`)}`}
                className="group bg-surface/60 backdrop-blur-sm border border-border rounded-[var(--radius-lg)] p-6 hover:border-accent/50 hover:bg-surface-light/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="bg-gradient-to-br from-accent/20 to-accent-green/20 rounded-[var(--radius-md)] p-3 w-fit mb-5">
                  <Icon className="w-7 h-7 text-accent-light" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-accent-light transition-colors">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                  {t(`${service.key}.description`)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium group-hover:gap-2.5 transition-all">
                  {tCommon("learnMore")}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
