import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Gavel,
  Briefcase,
  Home,
  Building2,
  Landmark,
  ShieldAlert,
  Users,
  Globe,
  Heart,
  HeartCrack,
  FileSignature,
} from "lucide-react";

const services = [
  { key: "civil", icon: Home },
  { key: "familyAndInheritance", icon: Heart },
  { key: "divorce", icon: HeartCrack },
  { key: "contractsAndRealEstate", icon: FileSignature },
  { key: "criminal", icon: Gavel },
  { key: "commercial", icon: Landmark },
  { key: "diaspora", icon: Globe },
  { key: "administrative", icon: Building2 },
  { key: "labor", icon: Briefcase },
  { key: "misdemeanor", icon: ShieldAlert },
  { key: "humanRights", icon: Users },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function UslugePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <UslugeContent />;
}

function UslugeContent() {
  const t = useTranslations("services");
  const tNav = useTranslations("nav");

  return (
    <div className="bg-white-bg flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#033f40] bg-gradient-to-br from-[#064e4b] via-[#033f40] to-[#012a2b] overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <Image
            src="/advokat_maric/og/greek_pillars.png"
            alt="Pillars"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#012a2b]/80 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-[#8B1E28] text-white/90 text-xs sm:text-sm md:text-base font-medium py-3 px-4 shadow-md z-20">
        <div className="max-w-4xl mx-auto flex items-center gap-2 uppercase tracking-wider flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            {tNav("home")}
          </Link>
          <span className="opacity-70">&rsaquo;</span>
          <span className="text-white font-bold">{tNav("services")}</span>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 md:py-24 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.key}
                  href={`/pravna-pomoc/${t(`${service.key}.slug`)}`}
                  className="group bg-white-bg border border-white-border rounded-xl p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300 flex flex-col"
                >
                  <div className="mb-5">
                    <Icon
                      className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300"
                      strokeWidth={1}
                    />
                  </div>

                  <h3 className="text-xl font-medium text-white-text mb-3 leading-tight">
                    {t(`${service.key}.title`)}
                  </h3>

                  <p className="text-white-text-muted text-sm leading-relaxed flex-1">
                    {t(`${service.key}.description`)}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white-border">
                    <span className="text-accent text-sm font-medium group-hover:underline">
                      {t(`${service.key}.title`)} &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
