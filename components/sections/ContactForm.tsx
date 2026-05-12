"use client";

import { useTranslations } from "next-intl";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] p-8">
      <h2 className="text-2xl font-semibold text-white-text mb-6">
        {t("formTitle")}
      </h2>

      {status === "success" && (
        <div className="flex items-center gap-3 bg-accent/10 border border-accent/30 text-accent rounded-[var(--radius-md)] px-5 py-4 mb-6">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{t("formSuccess")}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-[var(--radius-md)] px-5 py-4 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{t("formError")}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dim text-white px-8 py-3.5 rounded-[var(--radius-md)] font-medium transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? t("formSending") : t("formSend")}
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
