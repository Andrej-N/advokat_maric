"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { MapPin, Phone, Mail, Building } from "lucide-react";
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
  "civil",
  "familyAndInheritance",
  "divorce",
  "contractsAndRealEstate",
  "criminal",
  "commercial",
  "diaspora",
  "administrative",
  "labor",
  "misdemeanor",
  "humanRights",
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-border overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/og/hero.png`}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 pointer-events-none" />

      <NeuralNetworkCanvas nodeCount={35} connectionDistance={3} mouseInfluence={0.1} spread={[16, 8, 3]} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={logoSvg}
                alt="Marić"
                width={230}
                height={100}
                className="h-16 lg:h-20 w-auto brightness-0 invert"
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
              <span className="flex items-center gap-3 text-text-muted text-sm transition-colors mt-0.5">
                <Building className="w-4 h-4 text-accent shrink-0" />
                {t("contact.address").split(",")[0]}
              </span>
              <a
                href="https://maps.google.com/?q=Advokatska+kancelarija+Marić,+Loznica"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-muted text-sm hover:text-accent transition-colors"
              >
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>Loznica, Srbija</span>
              </a>
            </div>
          </div>

          {/* Mapa Sajta */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              {t("footer.sitemap")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-text-muted text-sm hover:text-accent transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/usluge" className="text-text-muted text-sm hover:text-accent transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/o-nama" className="text-text-muted text-sm hover:text-accent transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/#recenzije" className="text-text-muted text-sm hover:text-accent transition-colors">
                  {t("nav.clients")}
                </Link>
              </li>
              <li>
                <Link href="/pro-bono" className="text-text-muted text-sm hover:text-accent transition-colors">
                  {t("nav.proBono")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-muted text-sm hover:text-accent transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-text-muted text-sm hover:text-accent transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              {t("footer.areas")}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
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
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border mt-12 mb-4">
          <p className="text-text-dim text-sm leading-relaxed mb-6 cursor-default">
            {t("footer.disclaimer")}
          </p>
          <div className="flex flex-col items-center">
            {/* LinkedIn icon - centered, larger */}
            <a
              href="https://www.linkedin.com/company/advokatska-kancelarija-mari%C4%87/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Full-width contrast blue bottom bar */}
      <div className="relative z-20 w-full bg-[#0a192f] border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="/ogranicenje-odgovornosti"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              {t("footer.disclaimerLink")}
            </Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link
              href="/politika-privatnosti"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              {t("footer.privacyLink")}
            </Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link
              href="/opsti-uslovi"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              {t("footer.termsLink")}
            </Link>
          </div>
          <p className="text-white/70 text-sm cursor-default">
            &copy; {year} Advokatska kancelarija MARIĆ. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
