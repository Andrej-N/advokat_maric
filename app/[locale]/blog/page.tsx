import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import type { Metadata } from "next";
import { Calendar } from "lucide-react";

const mockPosts = [
  {
    slug: "zastita-prava-zaposlenih",
    date: "2026-03-15",
    title: "Zaštita prava zaposlenih u Srbiji",
    excerpt:
      "Pregled osnovnih prava zaposlenih i mehanizama za njihovu zaštitu prema važećem Zakonu o radu.",
    category: "Radno pravo",
  },
  {
    slug: "nasledno-pravo-srbija",
    date: "2026-03-01",
    title: "Nasledno pravo — osnove koje treba znati",
    excerpt:
      "Šta je zakonsko nasleđivanje, kako funkcioniše ostavinski postupak i koja su vaša prava kao naslednika.",
    category: "Građansko pravo",
  },
  {
    slug: "ustavna-zalba-postupak",
    date: "2026-02-15",
    title: "Ustavna žalba — kad i kako je podneti",
    excerpt:
      "Vodič kroz postupak podnošenja ustavne žalbe pred Ustavnim sudom Republike Srbije.",
    category: "Zaštita ljudskih prava",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogPageContent />;
}

function BlogPageContent() {
  const t = useTranslations("blog");

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white-text mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-white-text-muted mb-12">{t("subtitle")}</p>

          <div className="space-y-6">
            {mockPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white-bg-alt border border-white-border rounded-[var(--radius-lg)] p-6 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-[var(--radius-full)]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white-text-dim text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("sr-Latn-RS", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white-text mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-white-text-muted text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
