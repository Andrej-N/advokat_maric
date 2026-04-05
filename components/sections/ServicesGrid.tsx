"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import {
  Gavel,
  Briefcase,
  Home,
  Building2,
  Landmark,
  ShieldAlert,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartCrack,
} from "lucide-react";

const services = [
  { key: "labor", icon: Briefcase },
  { key: "commercial", icon: Landmark },
  { key: "criminal", icon: Gavel },
  { key: "civil", icon: Home },
  { key: "administrative", icon: Building2 },
  { key: "misdemeanor", icon: ShieldAlert },
  { key: "humanRights", icon: Users },
  { key: "diaspora", icon: Globe },
  { key: "familyAndInheritance", icon: Heart },
  { key: "divorce", icon: HeartCrack },
] as const;

export function ServicesGrid() {
  const t = useTranslations("services");
  
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
    // Pomičemo se za puna dva elementa ako tako bolje odgovara "dve po dve"
    // ali za glatkiji UX skrolamo po jednu na manje rezolucije.
    // Stavićemo da po jedan card skrola, cardWindow width = cardWidth + gap
    const cardWidth = el.querySelector(".service-card")?.clientWidth || 350;
    const gap = 24; // gap-6 is 24px
    el.scrollBy({ left: dir === "left" ? -(cardWidth + gap) : (cardWidth + gap), behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  }

  const thumbWidth = Math.max(20, 100 / services.length);
  const thumbLeft = scrollProgress * (100 - thumbWidth);

  return (
    <section id="usluge" className="py-24 px-4 lg:py-32 bg-[#033f40] bg-gradient-to-br from-[#064e4b] via-[#033f40] to-[#012a2b]">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-12 items-start justify-between">
        
        {/* Left Column */}
        <div className="w-full lg:w-[35%] flex flex-col justify-center shrink-0 lg:sticky lg:top-32">
          <div className="flex items-center gap-3 text-white/80 text-xs font-bold tracking-[0.15em] uppercase mb-6">
            <span className="w-2 h-2 rotate-45 border-2 border-white/80" />
            Advokat Novi Sad - Loznica
          </div>
          
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-[1.1]">
            {t("title")}
          </h2>
          
          <p className="text-white/80 text-base md:text-lg mb-12 leading-relaxed max-w-lg">
            {t("subtitle")}
          </p>

          <Link 
            href="/usluge" 
            className="inline-flex justify-center items-center bg-accent hover:opacity-90 text-white font-medium py-3 hover:scale-105 pr-8 pl-8 transition-all rounded-sm text-sm w-fit"
          >
            NAŠE USLUGE
          </Link>
        </div>

        {/* Right Column Carousel */}
        <div className="w-full lg:w-[60%] flex flex-col min-w-0">
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.key}
                  href={`/pravna-pomoc/${t(`${service.key}.slug`)}`}
                  className="group service-card w-[85%] sm:w-[calc(50%-12px)] shrink-0 snap-center sm:snap-start bg-white/5 backdrop-blur-sm border border-white/20 rounded-[4px] p-8 md:p-10 hover:bg-white/10 transition-all duration-300 flex flex-col h-auto min-h-[420px]"
                >
                  <div className="mb-6">
                    <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={1} />
                  </div>
                  
                  <h3 className="text-2xl font-normal text-white mb-4 leading-tight">
                    {t(`${service.key}.title`)}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-8 flex-1">
                    {t(`${service.key}.description`)}
                  </p>

                  <div className="mt-auto pt-4">
                    <div className="h-px w-full bg-white/20 mb-6 group-hover:bg-white/40 transition-colors" />
                    <span className="inline-flex items-center justify-center border border-white/30 group-hover:border-white text-white px-6 py-2.5 text-[11px] font-semibold tracking-[0.1em] transition-colors rounded-sm uppercase">
                      SAZNAJ VIŠE
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Controls below carousel */}
          <div className="flex items-center gap-8 mt-10">
            <div className="flex gap-4">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 disabled:opacity-30 disabled:hover:border-white/30 disabled:hover:bg-transparent transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 disabled:opacity-30 disabled:hover:border-white/30 disabled:hover:bg-transparent transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden max-w-xs shrink-0">
               <div 
                 className="absolute top-0 bottom-0 bg-white transition-all duration-300 ease-out rounded-full" 
                 style={{ 
                   width: `${thumbWidth}%`,
                   left: `${thumbLeft}%`
                 }}
               />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
