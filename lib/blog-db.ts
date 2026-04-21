import { prisma } from "@/lib/prisma";

export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  content: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  image: string | null;
  category: string | null;
  serviceKey: string | null;
  translations: {
    "sr-Latn": BlogPostTranslation;
    sr: BlogPostTranslation;
    en: BlogPostTranslation;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

type PrismaPost = Awaited<ReturnType<typeof prisma.post.findUnique>> & {
  translations: Array<{ locale: string; title: string; excerpt: string; content: string }>;
  seo: { metaTitle: string | null; metaDescription: string | null; keywords: string | null } | null;
};

const EMPTY_TR: BlogPostTranslation = { title: "", excerpt: "", content: "" };

function serialize(p: PrismaPost | null): BlogPost | null {
  if (!p) return null;
  const byLocale: Record<string, BlogPostTranslation> = {};
  for (const tr of p.translations) {
    byLocale[tr.locale] = { title: tr.title, excerpt: tr.excerpt, content: tr.content };
  }
  return {
    id: p.id,
    slug: p.slug,
    status: p.status as "draft" | "published",
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    image: p.image,
    category: p.category,
    serviceKey: p.serviceKey,
    translations: {
      "sr-Latn": byLocale["sr-Latn"] ?? EMPTY_TR,
      sr: byLocale["sr"] ?? EMPTY_TR,
      en: byLocale["en"] ?? EMPTY_TR,
    },
    seo: {
      metaTitle: p.seo?.metaTitle ?? "",
      metaDescription: p.seo?.metaDescription ?? "",
      keywords: p.seo?.keywords ?? "",
    },
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await prisma.post.findMany({
    include: { translations: true, seo: true },
    orderBy: { createdAt: "desc" },
  });
  return posts.map((p) => serialize(p as PrismaPost)!).filter(Boolean);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    include: { translations: true, seo: true },
    orderBy: { publishedAt: "desc" },
  });
  return posts.map((p) => serialize(p as PrismaPost)!).filter(Boolean);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { translations: true, seo: true },
  });
  return serialize(post as PrismaPost | null);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { translations: true, seo: true },
  });
  return serialize(post as PrismaPost | null);
}

export interface UpsertPostInput {
  slug: string;
  status: "draft" | "published";
  image?: string | null;
  category?: string | null;
  serviceKey?: string | null;
  translations: {
    "sr-Latn": BlogPostTranslation;
    sr: BlogPostTranslation;
    en: BlogPostTranslation;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export async function createPost(authorId: string, input: UpsertPostInput): Promise<BlogPost> {
  const publishedAt = input.status === "published" ? new Date() : null;
  const post = await prisma.post.create({
    data: {
      slug: input.slug,
      status: input.status,
      publishedAt,
      image: input.image ?? null,
      category: input.category ?? null,
      serviceKey: input.serviceKey ?? null,
      authorId,
      translations: {
        create: (["sr-Latn", "sr", "en"] as const).map((locale) => ({
          locale,
          title: input.translations[locale].title,
          excerpt: input.translations[locale].excerpt,
          content: input.translations[locale].content,
        })),
      },
      seo: { create: input.seo },
    },
    include: { translations: true, seo: true },
  });
  return serialize(post as PrismaPost)!;
}

export async function updatePost(id: string, input: UpsertPostInput): Promise<BlogPost> {
  const current = await prisma.post.findUnique({ where: { id } });
  if (!current) throw new Error("Post not found");

  const publishedAt =
    input.status === "published"
      ? current.publishedAt ?? new Date()
      : null;

  await prisma.$transaction([
    prisma.postTranslation.deleteMany({ where: { postId: id } }),
    prisma.postSeo.deleteMany({ where: { postId: id } }),
    prisma.post.update({
      where: { id },
      data: {
        slug: input.slug,
        status: input.status,
        publishedAt,
        image: input.image ?? null,
        category: input.category ?? null,
        serviceKey: input.serviceKey ?? null,
        translations: {
          create: (["sr-Latn", "sr", "en"] as const).map((locale) => ({
            locale,
            title: input.translations[locale].title,
            excerpt: input.translations[locale].excerpt,
            content: input.translations[locale].content,
          })),
        },
        seo: { create: input.seo },
      },
    }),
  ]);

  const post = await prisma.post.findUnique({
    where: { id },
    include: { translations: true, seo: true },
  });
  return serialize(post as PrismaPost)!;
}

export async function deletePostById(id: string): Promise<void> {
  await prisma.post.delete({ where: { id } });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[čć]/g, "c")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/[đ]/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const SERVICE_KEYS = [
  "civil",
  "familyAndInheritance",
  "divorce",
  "contractsAndRealEstate",
  "criminal",
  "commercial",
  "diaspora",
  "administrative",
  "labor",
  "misdemeanor",
  "humanRights",
] as const;
