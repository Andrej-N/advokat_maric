import { setRequestLocale } from "next-intl/server";
import { BlogPostContent } from "@/components/blog/BlogPostContent";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <BlogPostContent slug={slug} />;
}
