import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageContent />;
}

function ContactPageContent() {
  const t = useTranslations("contact");

  const contactItems = [
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: t("address"),
      href: "https://maps.google.com/?q=Loznica+V.+Zecevica+K-1",
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
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white-text mb-12">
            {t("title")}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] p-6"
              >
                <Icon className="w-6 h-6 text-accent mb-3" />
                <div className="text-white-text-dim text-xs uppercase tracking-wider mb-2">
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-white-text hover:text-accent transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-white-text">{value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="mt-12">
            <ContactForm />
          </div>

          {/* Google Maps Embed */}
          <div className="mt-12 rounded-[var(--radius-lg)] overflow-hidden border border-white-border h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.5!2d19.2226843!3d44.5297985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475961b7237b1bff%3A0x7584f1fe25012c87!2sADVOKATSKA%20KANCELARIJA%20MARI%C4%86!5e0!3m2!1sen!2srs!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Advokatska kancelarija Marić - Lokacija"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
