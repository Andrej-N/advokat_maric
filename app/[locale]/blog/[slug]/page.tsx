import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog-db";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug);
  if (!post || post.status !== "published") notFound();

  const others = await getPublishedPosts();
  const related = others.filter((p) => p.slug !== post.slug).slice(0, 3);

  return <BlogPostContent post={post} related={related} />;
}
