import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import type { Metadata } from "next";
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
    title: t(`${service.key}.title`),
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
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white-text-muted hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tCommon("backToHome")}
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-accent/10 rounded-[var(--radius-md)] p-3">
              <Icon className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white-text">
              {t(`${service.key}.title`)}
            </h1>
          </div>

          <div className="h-px bg-white-border my-8" />

          <p className="text-white-text-muted leading-relaxed text-lg">
            {t(`${service.key}.full`)}
          </p>
        </div>
      </section>
    </div>
  );
}
