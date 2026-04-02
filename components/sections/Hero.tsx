"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

const NeuralNetworkCanvas = dynamic(
  () =>
    import("@/components/three/NeuralNetwork").then(
      (mod) => mod.NeuralNetworkCanvas
    ),
  { ssr: false }
);

export function Hero() {
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
      <div className="relative z-10 text-center px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/advokat_maric/og/logo_maric_m.svg"
          alt="Marić Advokatura"
          className="mx-auto w-56 sm:w-64 md:w-80 h-auto drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-text-muted" />
      </div>
    </section>
  );
}
