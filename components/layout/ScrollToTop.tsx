"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 w-11 h-11 rounded-full border border-white/30 bg-[#033f40]/80 backdrop-blur-sm flex items-center justify-center text-white hover:border-accent hover:bg-accent/20 transition-all duration-300 cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Vrati se na vrh"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
