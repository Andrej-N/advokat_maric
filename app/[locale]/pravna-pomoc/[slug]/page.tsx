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
  ArrowLeft,
  Heart,
  HeartCrack,
  FileSignature,
} from "lucide-react";

const serviceMap: Record<
  string,
  { key: string; icon: React.ComponentType<{ className?: string }> }
> = {
  "krivicno-pravo": { key: "criminal", icon: Gavel },
  "radno-pravo": { key: "labor", icon: Briefcase },
  "gradjansko-pravo": { key: "civil", icon: Home },
  "upravno-pravo": { key: "administrative", icon: Building2 },
  "privredno-pravo": { key: "commercial", icon: Landmark },
  "prekrsajno-pravo": { key: "misdemeanor", icon: ShieldAlert },
  "zastita-ljudskih-prava": { key: "humanRights", icon: Users },
  "dijaspora": { key: "diaspora", icon: Globe },
  "porodicno-i-nasledno-pravo": { key: "familyAndInheritance", icon: Heart },
  "razvod-braka": { key: "divorce", icon: HeartCrack },
  "ugovori-i-nekretnine": { key: "contractsAndRealEstate", icon: FileSignature },
};

export async function generateStaticParams() {
  return Object.keys(serviceMap).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const service = serviceMap[slug];
  if (!service) return { title: "404" };

  return {
    title: t(`${service.key}.seoTitle`),
    description: t(`${service.key}.description`),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <ServicePageContent slug={slug} />;
}

function ServicePageContent({ slug }: { slug: string }) {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const service = serviceMap[slug];

  if (!service) {
    return (
      <div className="pt-32 text-center py-28 bg-white-bg">
        <h1 className="text-2xl text-white-text">404</h1>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="bg-white-bg flex flex-col min-h-screen">
      {/* Dynamic Header Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#033f40] bg-gradient-to-br from-[#064e4b] via-[#033f40] to-[#012a2b] overflow-hidden">
        {/* Background Image of Greek Pillars */}
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <Image
            src="/og/greek_pillars.png"
            alt="Pillars"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#012a2b]/80 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-[var(--radius-md)] mb-6 backdrop-blur-sm border border-white/10">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            {t(`${service.key}.seoTitle`)}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs Bar */}
      <div className="bg-[#8B1E28] text-white/90 text-xs sm:text-sm md:text-base font-medium py-3 px-4 shadow-md z-20">
        <div className="max-w-4xl mx-auto flex items-center gap-2 uppercase tracking-wider flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            {tNav("home")}
          </Link>
          <span className="opacity-70">›</span>
          <Link href="/usluge" className="opacity-90 hover:text-white transition-colors">{tNav("services")}</Link>
          <span className="opacity-70">›</span>
          <span className="text-white font-bold">{t(`${service.key}.title`)}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {t(`${service.key}.full`)
              .split("\n\n")
              .map((paragraph, i) => {
                const dashIndex = paragraph.indexOf(" -");
                if (dashIndex > 0 && dashIndex < 60 && i > 0) {
                  const heading = paragraph.slice(0, dashIndex).replace(/\*\*/g, '');
                  const body = paragraph.slice(dashIndex + 2).trim();
                  
                  const formattedBody = body
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                    .replace(/\n/g, '<br/>')
                    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

                  return (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-white-text mb-2">
                        {heading}
                      </h3>
                      <p 
                        className="text-white-text-muted leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: formattedBody }}
                      />
                    </div>
                  );
                }

                const formattedParagraph = paragraph
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                  .replace(/\n/g, '<br/>')
                  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

                return (
                  <p
                    key={i}
                    className="text-white-text-muted leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                  />
                );
              })}
          </div>

          <div className="mt-20 relative bg-[#033f40] bg-gradient-to-br from-[#064e4b] via-[#033f40] to-[#012a2b] rounded-xl p-6 md:p-8 overflow-hidden shadow-lg">
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto max-w-4xl">
              <h2 className="text-lg md:text-xl font-medium text-white leading-tight">
                {tCommon("needHelpTitle")}
              </h2>

              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center bg-[#a91f24] text-white font-medium tracking-wider text-sm py-2.5 px-6 rounded-lg hover:bg-[#8B1E28] transition-all hover:shadow-md whitespace-nowrap"
              >
                {tCommon("contactUsLabel")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
