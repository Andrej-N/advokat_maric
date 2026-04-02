"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Globe, ArrowUp } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");

  const items = [
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: t("address"),
      href: undefined,
    },
    {
      icon: Phone,
      label: t("phoneLabel"),
      value: t("phone"),
      href: "tel:+381638964004",
    },
    {
      icon: Mail,
      label: t("emailLabel"),
      value: t("email"),
      href: "mailto:kancelarija.maric@gmail.com",
    },
    {
      icon: Globe,
      label: t("websiteLabel"),
      value: t("website"),
      href: undefined,
    },
  ];

  return (
    <section className="py-28 px-4 bg-[#033f40] bg-gradient-to-br from-[#064e4b] via-[#033f40] to-[#012a2b]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-white/80">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16 mt-16">
          {items.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-[var(--radius-lg)] p-8 text-center hover:bg-white/10 transition-colors"
            >
              <Icon className="w-8 h-8 text-white mx-auto mb-5 opacity-90" strokeWidth={1.5} />
              <div className="text-white/60 text-[11px] uppercase tracking-wider mb-2 font-semibold">
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  className="text-white text-sm hover:text-accent transition-colors break-words"
                >
                  {value}
                </a>
              ) : (
                <span className="text-white text-sm break-words">{value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Scroll To Top */}
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-4 text-white hover:text-accent transition-all duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <ArrowUp className="w-5 h-5" />
            </div>
            <span className="font-medium text-lg tracking-wide">{tCommon("backToTop")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
