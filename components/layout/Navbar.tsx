"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import logoSvg from "@/public/og/logo_maric-01.svg";

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

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On homepage hero: transparent bg with white text, then solid on scroll
  // On other pages: always solid white bg with dark text
  const isTransparent = isHome && !scrolled && !mobileOpen;

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/o-nama", label: t("nav.about") },
    { href: "#", label: t("nav.services"), hasDropdown: true },
    { href: "/pro-bono", label: t("nav.proBono") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/kontakt", label: t("nav.contact") },
  ];

  const textColor = isTransparent ? "text-text-muted" : "text-white-text-muted";
  const textActiveColor = isTransparent ? "text-white" : "text-white-text";
  const accentColor = "text-accent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white-bg/95 backdrop-blur-xl border-b border-white-border shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <Image
              src={logoSvg}
              alt="Marić"
              width={230}
              height={100}
              className={`h-16 lg:h-20 w-auto transition-all duration-300 ${
                isTransparent
                  ? "brightness-0 invert"
                  : ""
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`cursor-pointer flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${textColor} hover:${textActiveColor}`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 w-64 py-2 bg-white-bg border border-white-border rounded-[var(--radius-lg)] shadow-xl shadow-black/10">
                      {serviceKeys.map((key) => (
                        <Link
                          key={key}
                          href={`/pravna-pomoc/${t(`services.${key}.slug`)}`}
                          className="block px-4 py-2.5 text-sm text-white-text-muted hover:text-accent hover:bg-white-bg-alt transition-colors"
                          onClick={() => setServicesOpen(false)}
                        >
                          {t(`services.${key}.title`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? accentColor
                      : `${textColor} hover:${textActiveColor}`
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              href="/kontakt"
              className={`hidden md:block px-4 py-1.5 text-[13px] font-medium uppercase tracking-wide border rounded-[var(--radius-md)] transition-colors ${
                isTransparent 
                  ? "border-white/50 text-white hover:border-white hover:bg-white/10" 
                  : "border-accent text-accent hover:bg-accent hover:text-white"
              }`}
            >
              {t("hero.ctaSecondary")}
            </Link>
            <div className="hidden sm:block">
              <LanguageSwitcher isTransparent={isTransparent} />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden cursor-pointer p-2 ${textColor} hover:${textActiveColor}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-white-border mt-2 pt-4 bg-white-bg rounded-b-[var(--radius-lg)]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="cursor-pointer w-full flex items-center justify-between px-4 py-3 text-base text-white-text-muted hover:text-white-text"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="pl-6">
                        {serviceKeys.map((key) => (
                          <Link
                            key={key}
                            href={`/pravna-pomoc/${t(`services.${key}.slug`)}`}
                            className="block px-4 py-2 text-sm text-white-text-muted hover:text-accent"
                            onClick={() => setMobileOpen(false)}
                          >
                            {t(`services.${key}.title`)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 text-base transition-colors ${
                      pathname === link.href
                        ? "text-accent"
                        : "text-white-text-muted hover:text-white-text"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <div className="mt-4 px-4">
              <Link
                href="/kontakt"
                className="block w-full text-center bg-accent hover:bg-accent-dim text-white px-6 py-3 rounded-[var(--radius-md)] font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
            <div className="mt-4 px-4 sm:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
