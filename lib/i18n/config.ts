export const locales = ["sr-Latn", "sr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sr-Latn";

export const localeNames: Record<Locale, string> = {
  "sr-Latn": "Latinica",
  sr: "Ћирилица",
  en: "English",
};

export const localeShortNames: Record<Locale, string> = {
  "sr-Latn": "LAT",
  sr: "ЋИР",
  en: "EN",
};
