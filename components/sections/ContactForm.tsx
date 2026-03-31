"use client";

import { useTranslations } from "next-intl";
import { Send } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");

  return (
    <div className="bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] p-8">
      <h2 className="text-2xl font-semibold text-white-text mb-6">
        {t("formTitle")}
      </h2>
      <form
        action="mailto:kancelarija.maric@gmail.com"
        method="POST"
        encType="text/plain"
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-white-text-dim text-xs uppercase tracking-wider mb-2"
          >
            {t("formName")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white-bg border border-white-border rounded-[var(--radius-md)] text-white-text placeholder:text-white-text-dim/50 focus:outline-none focus:border-accent/60 transition-colors"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="email"
              className="block text-white-text-dim text-xs uppercase tracking-wider mb-2"
            >
              {t("formEmail")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-white-bg border border-white-border rounded-[var(--radius-md)] text-white-text placeholder:text-white-text-dim/50 focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-white-text-dim text-xs uppercase tracking-wider mb-2"
            >
              {t("formPhone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 bg-white-bg border border-white-border rounded-[var(--radius-md)] text-white-text placeholder:text-white-text-dim/50 focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-white-text-dim text-xs uppercase tracking-wider mb-2"
          >
            {t("formMessage")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 bg-white-bg border border-white-border rounded-[var(--radius-md)] text-white-text placeholder:text-white-text-dim/50 focus:outline-none focus:border-accent/60 transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dim text-white px-8 py-3.5 rounded-[var(--radius-md)] font-medium transition-colors cursor-pointer"
        >
          {t("formSend")}
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
