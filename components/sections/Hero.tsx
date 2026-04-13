"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const NeuralNetworkCanvas = dynamic(
  () =>
    import("@/components/three/NeuralNetwork").then(
      (mod) => mod.NeuralNetworkCanvas
    ),
  { ssr: false }
);

function AnimatedTagline({ text }: { text: string }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 60);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500"
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? "translateY(0)" : "translateY(8px)",
            transitionDelay: `${i * 30}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#033f40] bg-gradient-to-br from-[#064e4b] via-[#033f40] to-[#012a2b]">
      {/* Background Image of Greek Pillars */}
      <div className="absolute inset-0 opacity-30 mix-blend-luminosity pointer-events-none">
        <Image
          src="/advokat_maric/og/greek_pillars.png"
          alt="Grčki stubovi"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <NeuralNetworkCanvas />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#064e4b]/40 via-[#033f40]/20 to-[#012a2b] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        {/* Title above logo */}
        <div
          className="transition-all duration-1000 ease-out mb-10 md:mb-14"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <h1 className="text-white uppercase tracking-[0.25em] text-base sm:text-lg md:text-xl font-light">
            {t("title")}
          </h1>
          <p className="text-white uppercase tracking-[0.25em] text-base sm:text-lg md:text-xl font-light mt-2">
            {t("titleAccent")}
          </p>
        </div>

        {/* M Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/advokat_maric/og/logo_maric_m.svg"
          alt="Marić Advokatura"
          className="mx-auto w-40 sm:w-48 md:w-56 h-auto drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] transition-opacity duration-1000"
          style={{ opacity: mounted ? 1 : 0 }}
        />

        {/* Tagline with letter-by-letter animation */}
        <div className="h-10 flex items-center justify-center mt-10 md:mt-14">
          <p className="text-white/80 uppercase tracking-[0.25em] text-base sm:text-lg md:text-xl font-light">
            {mounted && <AnimatedTagline text={t("tagline")} />}
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href={`/${locale}/kontakt`}
          className="mt-12 md:mt-16 inline-block bg-accent hover:bg-accent-dim text-white uppercase tracking-[0.2em] text-sm sm:text-base px-10 py-4 transition-all duration-500 rounded-full"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transitionProperty: "opacity, transform, background-color",
            transitionDuration: "1000ms, 1000ms, 300ms",
            transitionDelay: "2500ms, 2500ms, 0ms",
          }}
        >
          {t("ctaSecondary")}
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-text-muted" />
      </div>
    </section>
  );
}
