"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ArrowLeft, ArrowUpRight, Calendar } from "lucide-react";
import { getPostBySlug, getPublishedPosts, type BlogPost } from "@/lib/blog";

export function BlogPostContent({ slug }: { slug: string }) {
  const t = useTranslations("blog");
  const tServices = useTranslations("services");
  const locale = useLocale() as "sr-Latn" | "sr" | "en";

  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    const found = getPostBySlug(slug);
    setPost(found || null);
    if (found) {
      const others = getPublishedPosts()
        .filter((p) => p.slug !== found.slug)
        .slice(0, 3);
      setRelated(others);
    }
  }, [slug]);

  if (post === undefined) {
    return <div className="pt-32 min-h-screen bg-white-bg" />;
  }

  if (post === null) {
    return (
      <div className="pt-32 text-center py-28 bg-white-bg min-h-screen">
        <h1 className="text-2xl text-white-text">{t("notFound")}</h1>
        <Link href="/blog" className="text-accent mt-4 inline-block">
          {t("backToBlog")}
        </Link>
      </div>
    );
  }

  const tr = post.translations[locale] || post.translations["sr-Latn"];
  const dateLocale = locale === "en" ? "en-US" : "sr-Latn-RS";
  const publishedDate = new Date(post.publishedAt || post.createdAt);

  let serviceSlug: string | null = null;
  let serviceTitle: string | null = null;
  if (post.serviceKey) {
    try {
      serviceSlug = tServices(`${post.serviceKey}.slug` as never);
      serviceTitle = tServices(`${post.serviceKey}.title` as never);
    } catch {
      serviceSlug = null;
    }
  }

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <article className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white-text-muted hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToBlog")}
          </Link>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {post.category && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-[var(--radius-full)]">
                {post.category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-white-text-dim text-xs">
              <Calendar className="w-3.5 h-3.5" />
              {publishedDate.toLocaleDateString(dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white-text mb-8 leading-tight">
            {tr.title}
          </h1>

          {post.image && (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={tr.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className="blog-content max-w-none text-white-text-muted text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: tr.content }}
          />

          {serviceSlug && serviceTitle && (
            <div className="mt-12 p-6 md:p-8 border border-accent/30 bg-accent/5 rounded-xl">
              <p className="text-white-text-muted text-sm mb-3">
                {t("readService")}
              </p>
              <Link
                href={`/pravna-pomoc/${serviceSlug}`}
                className="group inline-flex items-center gap-3 text-white-text hover:text-accent transition-colors"
              >
                <span className="text-xl font-medium">{serviceTitle}</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-20 px-4 border-t border-white-border bg-primary-light/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white-text mb-10">
              {t("relatedPosts")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rp) => {
                const rtr = rp.translations[locale] || rp.translations["sr-Latn"];
                return (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-primary-light">
                      {rp.image && (
                        <img
                          src={rp.image}
                          alt={rtr.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {rp.category && (
                        <div className="absolute top-3 right-3 bg-accent/90 text-white px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase">
                          {rp.category}
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-white-text group-hover:text-accent transition-colors leading-snug">
                      {rtr.title}
                    </h3>
                    <p className="text-white-text-muted text-sm mt-2 line-clamp-2">
                      {rtr.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
