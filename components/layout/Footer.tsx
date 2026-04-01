"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const serviceKeys = [
  "criminal",
  "labor",
  "civil",
  "administrative",
  "commercial",
  "misdemeanor",
  "humanRights",
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-light border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <span className="text-lg font-semibold text-text-primary">
                Marić
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              {t("about.description")}
            </p>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">
              {t("nav.services")}
            </h3>
            <ul className="space-y-2">
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

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">
              {t("nav.home")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/o-nama"
                  className="text-text-muted text-sm hover:text-accent transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/pro-bono"
                  className="text-text-muted text-sm hover:text-accent transition-colors"
                >
                  {t("nav.proBono")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-text-muted text-sm hover:text-accent transition-colors"
                >
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-text-muted text-sm hover:text-accent transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">
              {t("contact.title")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-text-muted text-sm">
                  {t("contact.address")}
                </span>
              </li>
              <li>
                <a
                  href="tel:+381638964004"
                  className="flex items-center gap-3 text-text-muted text-sm hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  {t("contact.phone")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:kancelarija.maric@gmail.com"
                  className="flex items-center gap-3 text-text-muted text-sm hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  {t("contact.email")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-accent shrink-0" />
                <span className="text-text-muted text-sm">
                  {t("contact.website")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
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
