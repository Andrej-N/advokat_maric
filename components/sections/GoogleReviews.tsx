"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    author: "M. Petrović",
    rating: 5,
    text: "Izuzetno profesionalna kancelarija. Advokat Marić je rešio moj slučaj brzo i efikasno. Preporučujem svima koji traže pouzdanog advokata.",
  },
  {
    author: "J. Nikolić",
    rating: 5,
    text: "Najbolja advokatska kancelarija u Loznici. Veoma stručni i posvećeni klijentima. Sve preporuke!",
  },
  {
    author: "D. Jovanović",
    rating: 5,
    text: "Dugogodišnja saradnja sa kancelarijom Marić. Uvek profesionalni i pouzdani u svom radu.",
  },
  {
    author: "S. Đorđević",
    rating: 5,
    text: "Odlično iskustvo. Advokat je bio veoma strpljiv i detaljno mi objasnio sve opcije. Postupak je završen uspešno.",
  },
  {
    author: "N. Todorović",
    rating: 5,
    text: "Profesionalan pristup i odlična komunikacija tokom celokupnog postupka. Hvala na pomoći!",
  },
  {
    author: "A. Milić",
    rating: 5,
    text: "Veoma zadovoljan saradnjom. Brzi i efikasni, sa puno razumevanja za situaciju klijenta.",
  },
];

const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/place/Loznica";

export function GoogleReviews() {
  const t = useTranslations("reviews");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 340;
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  }

  return (
    <section className="py-28 px-4 bg-white-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white-text mb-2">
              {t("title")}
            </h2>
            <p className="text-white-text-muted text-sm">{t("subtitle")}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="cursor-pointer p-2 rounded-full border border-white-border text-white-text-muted hover:text-accent hover:border-accent/40 disabled:opacity-30 disabled:cursor-default transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="cursor-pointer p-2 rounded-full border border-white-border text-white-text-muted hover:text-accent hover:border-accent/40 disabled:opacity-30 disabled:cursor-default transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="min-w-[300px] max-w-[340px] flex-shrink-0 snap-start bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] p-6 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-white-text text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <span className="text-white-text-dim text-xs mt-4 block">
                {review.author}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-dim text-sm font-medium transition-colors"
          >
            {t("viewAll")} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
