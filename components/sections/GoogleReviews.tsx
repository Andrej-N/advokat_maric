"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

const mockReviews = [
  {
    author: "M. Petrović",
    rating: 5,
    text: "Izuzetno profesionalna kancelarija. Advokat Marić je rešio moj slučaj brzo i efikasno.",
  },
  {
    author: "J. Nikolić",
    rating: 5,
    text: "Najbolja advokatska kancelarija u Loznici. Veoma stručni i posvećeni klijentima.",
  },
  {
    author: "D. Jovanović",
    rating: 5,
    text: "Dugogodišnja saradnja sa kancelarijom Marić. Uvek profesionalni i pouzdani u svom radu.",
  },
];

// TODO: Replace with actual Google Business review URL
const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/place/Loznica";

export function GoogleReviews() {
  const t = useTranslations("reviews");

  return (
    <section className="pb-16 pt-0 px-4 bg-primary">
      <div className="max-w-3xl mx-auto">
        {/* Thin separator */}
        <div className="h-px bg-border mb-12" />

        <div className="flex items-center justify-center gap-1.5 mb-8 text-text-dim text-xs uppercase tracking-widest">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-accent/60 text-accent/60"
              />
            ))}
          </div>
          <span className="ml-2">{t("title")}</span>
        </div>

        <div className="space-y-6">
          {mockReviews.map((review, i) => (
            <div key={i} className="text-center">
              <p className="text-text-muted text-sm leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <span className="text-text-dim text-xs mt-1.5 inline-block">
                — {review.author}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-dim text-xs hover:text-text-muted transition-colors"
          >
            {t("viewAll")} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
