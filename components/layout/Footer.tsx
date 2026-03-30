"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { Scale, MapPin, Phone, Mail, Globe } from "lucide-react";

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
              <Scale className="w-6 h-6 text-accent" />
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
            <Link
              href="/ogranicenje-odgovornosti"
              className="text-text-dim text-xs hover:text-accent transition-colors"
            >
              {t("footer.disclaimerLink")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
