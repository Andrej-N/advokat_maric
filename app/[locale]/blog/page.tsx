"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { getPublishedPosts, type BlogPost } from "@/lib/blog";

const MONTHS_SR: Record<number, string> = {
  0: "JAN", 1: "FEB", 2: "MAR", 3: "APR", 4: "MAJ", 5: "JUN",
  6: "JUL", 7: "AVG", 8: "SEP", 9: "OKT", 10: "NOV", 11: "DEC",
};

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale() as "sr-Latn" | "sr" | "en";
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getPublishedPosts());
  }, []);

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg min-h-screen">
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white-text mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white-text-muted max-w-2xl">{t("subtitle")}</p>
          </div>

          {posts.length === 0 ? (
            <p className="text-white-text-muted">Uskoro...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const tr = post.translations[locale] || post.translations["sr-Latn"];
                const date = new Date(post.publishedAt || post.createdAt);
                const day = String(date.getDate()).padStart(2, "0");
                const month = MONTHS_SR[date.getMonth()];

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col items-start transition-all"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-primary-light">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={tr.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg text-white flex flex-col items-center justify-center p-2 min-w-[3.5rem] border border-white/10">
                        <span className="text-lg font-bold leading-none">{day}</span>
                        <span className="text-[10px] font-medium tracking-wider uppercase mt-1">{month}</span>
                      </div>

                      {post.category && (
                        <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase">
                          {post.category}
                        </div>
                      )}

                      <div className="absolute bottom-0 right-0 bg-white-bg pt-3 pl-3 rounded-tl-xl z-10 pointer-events-none">
                        <div className="w-12 h-12 flex items-center justify-center border border-white-border bg-white-bg text-accent rounded-sm group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 pointer-events-auto">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-medium text-white-text mb-3 leading-snug group-hover:text-accent transition-colors">
                      {tr.title}
                    </h3>

                    <p className="text-white-text-muted text-sm leading-relaxed mb-5 flex-1">
                      {tr.excerpt}
                    </p>

                    <div className="mt-auto">
                      <span className="text-sm font-medium text-accent inline-flex items-center">
                        {t("readMore")}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
