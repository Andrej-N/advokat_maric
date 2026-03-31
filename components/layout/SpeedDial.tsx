"use client";

import { Phone } from "lucide-react";

export function SpeedDial() {
  return (
    <a
      href="tel:+381638964004"
      className="fixed bottom-6 right-6 z-50 flex md:hidden items-center justify-center w-14 h-14 bg-accent hover:bg-accent-dim text-white rounded-full shadow-lg shadow-accent/30 transition-colors"
      aria-label="Pozovite nas"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
