import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpeedDial } from "@/components/layout/SpeedDial";
import { generateOrganizationJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages as Record<string, Record<string, string>>).meta;

  return {
    title: {
      default: meta.title,
      template: `%s | ${locale === "en" ? "Marić Law Office" : "Advokatska kancelarija Marić"}`,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://mariclaw.rs/${locale === "sr-Latn" ? "" : locale}`,
      languages: {
        "sr-Latn": "https://mariclaw.rs/",
        sr: "https://mariclaw.rs/sr",
        en: "https://mariclaw.rs/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_RS",
      siteName:
        locale === "en"
          ? "Marić Law Office"
          : "Advokatska kancelarija Marić",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationJsonLd()),
        }}
      />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <SpeedDial />
    </NextIntlClientProvider>
  );
}
