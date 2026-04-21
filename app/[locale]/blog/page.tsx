import { setRequestLocale, getTranslations } from "next-intl/server";
import { BlogListClient } from "./BlogListClient";
import { getPublishedPosts } from "@/lib/blog-db";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = await getPublishedPosts();

  return (
    <BlogListClient
      posts={posts}
      locale={locale as "sr-Latn" | "sr" | "en"}
      labels={{
        title: t("title"),
        subtitle: t("subtitle"),
        readMore: t("readMore"),
      }}
    />
  );
}
