"use client";

import { useTranslations } from "next-intl";
import { Star, ExternalLink } from "lucide-react";

const mockReviews = [
  {
    author: "M. Petrović",
    rating: 5,
    text: "Izuzetno profesionalna kancelarija. Advokat Marić je rešio moj slučaj brzo i efikasno. Toplo preporučujem.",
    time: "Pre 2 meseca",
  },
  {
    author: "J. Nikolić",
    rating: 5,
    text: "Najbolja advokatska kancelarija u Loznici. Veoma stručni i posvećeni klijentima.",
    time: "Pre 3 meseca",
  },
  {
    author: "D. Jovanović",
    rating: 5,
    text: "Dugogodišnja saradnja sa kancelarijom Marić. Uvek profesionalni, detaljni i pouzdani u svom radu.",
    time: "Pre 5 meseci",
  },
];

// TODO: Replace with actual Google Business review URL
const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/place/Loznica";

export function GoogleReviews() {
  const t = useTranslations("reviews");

  return (
    <section className="py-20 px-4 bg-white-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <h2 className="text-2xl font-semibold text-white-text mb-1">
            {t("title")}
          </h2>
          <p className="text-white-text-dim text-sm">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReviews.map((review, i) => (
            <div
              key={i}
              className="bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] p-6"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-white-text-muted text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white-text text-sm font-medium">
                  {review.author}
                </span>
                <span className="text-white-text-dim text-xs">{review.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white-text-muted text-sm hover:text-accent transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t("viewAll")}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
