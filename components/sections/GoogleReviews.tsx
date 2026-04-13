"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight, Plus } from "lucide-react";

const reviews = [
  {
    author: "Ivana Tomic",
    rating: 5,
    title: "Vrhunska usluga i *posvećen pristup* klijentu.",
    text: "Vrhunska usluga i prijatan, posvećen pristup klijentu. Marljiv i objektivan rad uz poštovanje rokova. Sve pohvale!",
  },
  {
    author: "Nemanja Lukić",
    rating: 5,
    title: "Sve je bilo *savršeno*, za svaku preporuku.",
    text: "Koristio sam njihove usluge savetovanja po određenim pravnim pitanjima i angažovao sam ih za pisanje ugovora u vezi nekretnina. Sve je bilo savršeno, za svaku preporuku.",
  },
  {
    author: "Gordana Jakovljevic",
    rating: 5,
    title: "Korektni, brzi i ukratko *najbolji*.",
    text: "Postovani Advokat Maric .Hvala Vam od srca sto ste mi pomogli u sudskom sporu .Korektni ,brzi i ukratko najbolji.Preporucujem svima ovu Advokatsku kancelariju",
  },
  {
    author: "Andreja Dragicevic",
    rating: 5,
    title: "Prezadovoljna sam, neko *tako posvećen* poslu.",
    text: "Sve pohvale . Usluga , ljubaznost, trud sve na nivou. Prezadovoljna sam skoro nisam videla da je neko tako posvecen poslu i da se trudi i pored tolikog posla ljubaznost na nivou. I zelela bih da se zahvalim gospodinu Dusanu Maricu na dosadasnjoj saradnji . Svaka cast👏",
  },
  {
    author: "Nela Ibricic",
    rating: 5,
    title: "Veoma pristupačan i *voljan da pomogne*.",
    text: "Gospodin Dusan Maric je veoma ljubazan,obrazovan l imao je odgovore na sva moja pitanja. Veoma pristupacan I voljan da pomogne. Cijene su realne i pristupacne obicnom gradjaninu. Preporucujem Advokatsku kancelariju Maric svima.",
  },
  {
    author: "Viktoriya Smirnova",
    rating: 5,
    title: "Izuzetan advokat. Inteligentan, *brz i jednostavan*.",
    text: "Izuzetan advokat. Intelegentan, brz i jednostavan. Preporucujem ga svakome. Dragan.",
  },
  {
    author: "dark soulz",
    rating: 5,
    title: "*Brzo, jednostavno* i veoma profesionalno.",
    text: "Brzo, jednostavno i veoma profesionalno. Sve pohvale",
  },
];

const GOOGLE_BUSINESS_URL =
  "https://www.google.com/search?sca_esv=a5ad54a154ad8b44&rlz=1C1GCEA_enRS1189RS1189&cs=0&output=search&kgmid=/g/11j8vr1jlq&q=ADVOKATSKA+KANCELARIJA+MARI%C4%86&shem=epsd1&shndl=30&source=sh/x/loc/uni/m1/1&kgs=39651c82e375c170&utm_source=epsd1,sh/x/loc/uni/m1/1#lrd=0x475961b7237b1bff:0x7584f1fe25012c87,1,,,,";


export function GoogleReviews() {
  const t = useTranslations("reviews");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    
    if (el.scrollWidth > el.clientWidth) {
      const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }
  }

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".review-card")?.clientWidth || 450;
    const gap = 32; // gap-8 is 32px
    el.scrollBy({ left: dir === "left" ? -(cardWidth + gap) : (cardWidth + gap), behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  }

  const renderTitle = (title: string) => {
    const parts = title.split(/\*(.*?)\*/g);
    return (
      <h3 className="text-2xl lg:text-3xl font-light text-white-text leading-tight mb-8">
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className="text-accent font-semibold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </h3>
    );
  };

  const thumbWidth = Math.max(20, 100 / reviews.length);
  const thumbLeft = scrollProgress * (100 - thumbWidth);

  return (
    <section className="py-24 px-4 bg-white-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white-text mb-2">
            {t("title")}
          </h2>
          <p className="text-white-text-muted text-sm">{t("subtitle")}</p>
        </div>

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="review-card min-w-[320px] md:min-w-[500px] w-full max-w-[550px] flex-shrink-0 snap-center sm:snap-start bg-white-bg shadow-sm border border-white-border rounded-xl p-8 lg:p-12 flex flex-col"
            >
              {renderTitle(review.title)}
              
              <div className="text-white-text-muted leading-relaxed space-y-6 flex-1 text-sm md:text-base mb-4">
                {review.text.split("\n\n").map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-auto">
                {review.text.length > 200 && (
                  <button className="mb-4 text-accent font-medium text-sm flex items-center hover:opacity-80 transition-opacity">
                    Pročitaj više <Plus className="w-4 h-4 ml-1" />
                  </button>
                )}

                <div className="border-t border-white-border pt-4 flex justify-between items-center">
                  <span className="font-medium text-white-text text-sm md:text-base">
                    {review.author}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto flex-1">
             <div className="flex gap-4">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white-border text-white-text hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-white-border disabled:hover:text-white-text transition-colors bg-white-bg"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white-border text-white-text hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-white-border disabled:hover:text-white-text transition-colors bg-white-bg"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
             </div>
             
             <div className="relative w-full sm:w-64 md:w-96 h-[3px] bg-white-border rounded-full overflow-hidden shrink-0">
                <div 
                  className="absolute top-0 bottom-0 bg-accent transition-all duration-300 ease-out rounded-full" 
                  style={{ 
                    width: `${thumbWidth}%`,
                    left: `${thumbLeft}%`
                  }}
                />
             </div>
          </div>
          
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-dim text-sm font-medium transition-colors whitespace-nowrap"
          >
            {t("viewAll")} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
