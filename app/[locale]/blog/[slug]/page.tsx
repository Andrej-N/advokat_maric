import { setRequestLocale } from "next-intl/server";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { getPosts } from "@/lib/blog";

const LOCALES = ["sr-Latn", "sr", "en"] as const;

export async function generateStaticParams() {
  const posts = getPosts();
  return LOCALES.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <BlogPostContent slug={slug} />;
}
