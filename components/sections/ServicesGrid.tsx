"use client";

import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
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
] as const;

export function ServicesGrid() {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? services.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === services.length - 1 ? 0 : c + 1));

  const service = services[current];
  const Icon = service.icon;

  return (
    <section id="usluge" className="py-28 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {t("title")}
            </h2>
            <p className="text-text-muted max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-text-dim text-sm tabular-nums mr-2">
              {current + 1} / {services.length}
            </span>
            <button
              onClick={prev}
              className="cursor-pointer p-2.5 rounded-full border border-border text-text-muted hover:text-accent hover:border-accent/40 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="cursor-pointer p-2.5 rounded-full border border-border text-text-muted hover:text-accent hover:border-accent/40 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active service - large card */}
        <div className="bg-surface border border-border rounded-[var(--radius-xl)] p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="bg-accent/10 rounded-[var(--radius-lg)] p-4 shrink-0">
              <Icon className="w-10 h-10 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                {t(`${service.key}.title`)}
              </h3>
              <p className="text-text-muted leading-relaxed mb-6">
                {t(`${service.key}.description`)}
              </p>
              <Link
                href={`/pravna-pomoc/${t(`${service.key}.slug`)}`}
                className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium transition-colors"
              >
                {tCommon("learnMore")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Service pills - all services as small indicators */}
        <div className="flex flex-wrap gap-2">
          {services.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setCurrent(i)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === current
                  ? "bg-accent text-white"
                  : "bg-surface border border-border text-text-muted hover:text-text-primary hover:border-accent/40"
              }`}
            >
              {t(`${s.key}.title`)}
            </button>
          ))}
        </div>

        {/* Mobile nav */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-8">
          <span className="text-text-dim text-sm tabular-nums">
            {current + 1} / {services.length}
          </span>
          <button
            onClick={prev}
            className="cursor-pointer p-2 rounded-full border border-border text-text-muted hover:text-accent transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="cursor-pointer p-2 rounded-full border border-border text-text-muted hover:text-accent transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
