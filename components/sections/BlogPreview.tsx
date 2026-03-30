"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ArrowRight, Calendar } from "lucide-react";

const mockPosts = [
  {
    slug: "zastita-prava-zaposlenih",
    date: "2026-03-15",
    titleKey: "Zaštita prava zaposlenih u Srbiji",
    excerptKey:
      "Pregled osnovnih prava zaposlenih i mehanizama za njihovu zaštitu prema važećem Zakonu o radu.",
  },
  {
    slug: "nasledno-pravo-srbija",
    date: "2026-03-01",
    titleKey: "Nasledno pravo — osnove koje treba znati",
    excerptKey:
      "Šta je zakonsko nasleđivanje, kako funkcioniše ostavinski postupak i koja su vaša prava kao naslednika.",
  },
  {
    slug: "ustavna-zalba-postupak",
    date: "2026-02-15",
    titleKey: "Ustavna žalba — kad i kako je podneti",
    excerptKey:
      "Vodič kroz postupak podnošenja ustavne žalbe pred Ustavnim sudom Republike Srbije.",
  },
];

export function BlogPreview() {
  const t = useTranslations("blog");

  return (
    <section className="py-28 px-4 bg-white-bg-alt">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white-text mb-4">
              {t("title")}
            </h2>
            <p className="text-white-text-muted">{t("subtitle")}</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-accent hover:text-accent-dim font-medium transition-colors"
          >
            {t("allPosts")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white-bg border border-white-border rounded-[var(--radius-lg)] p-6 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-white-text-dim text-xs mb-4">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString("sr-Latn-RS", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h3 className="text-lg font-semibold text-white-text mb-2 group-hover:text-accent transition-colors">
                {post.titleKey}
              </h3>
              <p className="text-white-text-muted text-sm leading-relaxed">
                {post.excerptKey}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent font-medium"
          >
            {t("allPosts")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
