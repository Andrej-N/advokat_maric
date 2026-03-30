import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://mariclaw.rs";

const serviceSlugs = [
  "krivicno-pravo",
  "radno-pravo",
  "gradjansko-pravo",
  "upravno-pravo",
  "privredno-pravo",
  "prekrsajno-pravo",
  "zastita-ljudskih-prava",
];

const blogSlugs = [
  "zastita-prava-zaposlenih",
  "nasledno-pravo-srbija",
  "ustavna-zalba-postupak",
];

const locales = ["sr-Latn", "sr", "en"];

function localePath(locale: string, path: string = "") {
  if (locale === "sr-Latn") return `${BASE_URL}${path}`;
  return `${BASE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = ["", "/o-nama", "/pro-bono", "/blog", "/kontakt"];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: localePath(locale, page),
        lastModified: new Date(),
        changeFrequency: page === "/blog" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, localePath(l, page)])
          ),
        },
      });
    }
  }

  // Service pages
  for (const slug of serviceSlugs) {
    for (const locale of locales) {
      entries.push({
        url: localePath(locale, `/pravna-pomoc/${slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, localePath(l, `/pravna-pomoc/${slug}`)])
          ),
        },
      });
    }
  }

  // Blog posts
  for (const slug of blogSlugs) {
    for (const locale of locales) {
      entries.push({
        url: localePath(locale, `/blog/${slug}`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, localePath(l, `/blog/${slug}`)])
          ),
        },
      });
    }
  }

  return entries;
}
