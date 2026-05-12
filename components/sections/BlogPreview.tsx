"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-db";

export function BlogPreview() {
  const t = useTranslations("blog");
  const locale = useLocale() as "sr-Latn" | "sr" | "en";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/blog?status=published")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: BlogPost[]) => {
        setPosts(data.slice(0, 3));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded || posts.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-white-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white-text mb-4">
              {t("title")}
            </h2>
            <p className="text-white-text-muted max-w-2xl">{t("subtitle")}</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-accent hover:text-accent-dim font-medium transition-colors"
          >
            {t("allPosts")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const tr = post.translations[locale] ?? post.translations["sr-Latn"];
            const date = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt);
            const day = date.getDate().toString().padStart(2, "0");
            const month = date.toLocaleString("sr-Latn", { month: "short" }).toUpperCase();

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col items-start transition-all"
              >
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6">
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

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-dim transition-colors"
          >
            {t("allPosts")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
