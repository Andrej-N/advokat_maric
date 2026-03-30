"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("contact");

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
    <section className="py-28 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-text-muted">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {items.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="bg-surface border border-border rounded-[var(--radius-lg)] p-6 text-center"
            >
              <Icon className="w-6 h-6 text-accent-light mx-auto mb-3" />
              <div className="text-text-dim text-xs uppercase tracking-wider mb-2">
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  className="text-text-primary text-sm hover:text-accent-light transition-colors"
                >
                  {value}
                </a>
              ) : (
                <span className="text-text-primary text-sm">{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
