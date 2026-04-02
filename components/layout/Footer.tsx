"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import logoSvg from "@/public/og/logo_maric-01.svg";

const NeuralNetworkCanvas = dynamic(
  () =>
    import("@/components/three/NeuralNetwork").then(
      (mod) => mod.NeuralNetworkCanvas
    ),
  { ssr: false }
);

const serviceKeys = [
  "criminal",
  "labor",
  "civil",
  "administrative",
  "commercial",
  "misdemeanor",
  "humanRights",
  "diaspora",
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#033f40] bg-gradient-to-br from-[#064e4b] via-[#033f40] to-[#012a2b] border-t border-border overflow-hidden">
      {/* Background Image of Greek Pillars */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-luminosity pointer-events-none">
        <Image
          src="/advokat_maric/og/greek_pillars.png"
          alt="Grčki stubovi"
          fill
          className="object-cover object-center"
        />
      </div>
      
      <NeuralNetworkCanvas nodeCount={35} connectionDistance={3} mouseInfluence={0.1} spread={[16, 8, 3]} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top row: CTA left, Location right */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src={logoSvg}
                alt="Marić"
                width={230}
                height={100}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              {t("contact.title")}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+381638964004"
                className="flex items-center gap-3 text-text-muted text-sm hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 text-accent shrink-0" />
                {t("contact.phone")}
              </a>
              <a
                href="mailto:kancelarija.maric@gmail.com"
                className="flex items-center gap-3 text-text-muted text-sm hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 text-accent shrink-0" />
                {t("contact.email")}
              </a>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Loznica,+Serbia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors"
          >
            <MapPin className="w-5 h-5 text-accent shrink-0" />
            <span className="text-sm">Loznica, Srbija</span>
          </a>
        </div>

        {/* Services */}
        <div className="mb-12">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
            {serviceKeys.map((key) => (
              <li key={key}>
                <Link
                  href={`/pravna-pomoc/${t(`services.${key}.slug`)}`}
                  className="text-text-muted text-sm hover:text-accent transition-colors"
                >
                  {t(`services.${key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <p className="text-text-dim text-xs leading-relaxed mb-4">
            {t("footer.disclaimer")}
          </p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-text-dim text-xs">
              &copy; {year} Marić. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/ogranicenje-odgovornosti"
                className="text-text-dim text-xs hover:text-accent transition-colors"
              >
                {t("footer.disclaimerLink")}
              </Link>
              <Link
                href="/politika-privatnosti"
                className="text-text-dim text-xs hover:text-accent transition-colors"
              >
                {t("footer.privacyLink")}
              </Link>
              <Link
                href="/opsti-uslovi"
                className="text-text-dim text-xs hover:text-accent transition-colors"
              >
                {t("footer.termsLink")}
              </Link>
              <a
                href="https://www.linkedin.com/company/advokatska-kancelarija-mari%C4%87/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
