"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ArrowDown } from "lucide-react";

const NeuralNetworkCanvas = dynamic(
  () =>
    import("@/components/three/NeuralNetwork").then(
      (mod) => mod.NeuralNetworkCanvas
    ),
  { ssr: false }
);

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary bg-gradient-to-br from-primary via-primary-light to-[#1A4A3A]">
      <NeuralNetworkCanvas />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/advokat_maric/og/logo_maric_m.svg"
          alt="Marić Advokatura"
          className="mx-auto mb-6 w-40 sm:w-48 md:w-56 h-auto drop-shadow-lg"
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/pravna-pomoc/krivicno-pravo" scroll={false} onClick={(e) => { e.preventDefault(); document.getElementById('usluge')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="bg-accent hover:bg-accent-dim text-white px-8 py-3.5 rounded-[var(--radius-md)] font-medium transition-colors cursor-pointer"
          >
            {t("cta")}
          </Link>
          <Link
            href="/kontakt"
            className="border border-border-light text-text-primary px-8 py-3.5 rounded-[var(--radius-md)] font-medium hover:bg-surface transition-colors cursor-pointer"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-text-muted" />
      </div>
    </section>
  );
}
