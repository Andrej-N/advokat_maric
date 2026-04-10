"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ExternalLink } from "lucide-react";

const NeuralNetworkCanvas = dynamic(
  () =>
    import("@/components/three/NeuralNetwork").then(
      (mod) => mod.NeuralNetworkCanvas
    ),
  { ssr: false }
);

export default function ProBonoPageContent() {
  const t = useTranslations("proBono");
  const tNav = useTranslations("nav");

  const orgs = [
    { name: t("org1"), url: t("org1Url") },
    { name: t("org2"), url: t("org2Url") },
    { name: t("org3"), url: t("org3Url") },
  ];

  return (
    <div className="bg-white-bg flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="relative pt-32 pb-28 lg:pt-40 lg:pb-28 bg-[#033f40] bg-gradient-to-br from-[#064e4b] via-[#033f40] to-[#012a2b] overflow-hidden min-h-[45vh] lg:min-h-0 flex items-end">
        <div className="absolute inset-0 opacity-30 mix-blend-luminosity pointer-events-none">
          <Image
            src="/advokat_maric/og/greek_pillars.png"
            alt="Pillars"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <NeuralNetworkCanvas nodeCount={35} connectionDistance={3} mouseInfluence={0.1} spread={[16, 8, 3]} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#012a2b]/80 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center text-center w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-[#8B1E28] text-white/90 text-xs sm:text-sm md:text-base font-medium py-3 px-4 shadow-md z-20">
        <div className="max-w-4xl mx-auto flex items-center gap-2 uppercase tracking-wider flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            {tNav("home")}
          </Link>
          <span className="opacity-70">&rsaquo;</span>
          <span className="text-white font-bold">{tNav("proBono")}</span>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24 px-4 flex-grow">
        <div className="max-w-4xl mx-auto">
          <p className="text-white-text-muted leading-relaxed text-lg mb-8">
            {t("description")}
          </p>

          <p className="text-white-text font-semibold text-lg mb-6">
            {t("subtitle")}
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
