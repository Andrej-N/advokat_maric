import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

const mockPosts = [
  {
    slug: "ugovor-o-delu",
    day: "10",
    month: "MAR",
    title: "Ugovor o delu – Šta je i kada se koristi?",
    excerpt: "Ugovor o delu je obligacioni ugovor kojim se jedna strana (poslenik, preduzimač, izvođač radova) obavezuje da za...",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800",
    category: "Radno pravo",
  },
  {
    slug: "ugovor-o-poklonu",
    day: "25",
    month: "FEB",
    title: "Ugovor o poklonu – Sve što treba da znate",
    excerpt: "Ugovor o poklonu je besteretni, dobročini pravni posao kojim jedno lice bez naknade prenosi određenu imovinu ili pravo na...",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=800",
    category: "Obligaciono pravo",
  },
  {
    slug: "sporazumni-prestanak",
    day: "30",
    month: "JAN",
    title: "Sporazumni prestanak radnog odnosa: Zašto poslodavci često nude sporazum?",
    excerpt: "Kao jedan od razloga za prestanak radnog odnosa Zakon o radu navodi i sporazum između zaposlenog i poslodavca. Sporazum...",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    category: "Radno pravo",
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
    <div className="pt-24 lg:pt-32 bg-white-bg min-h-screen">
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white-text mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white-text-muted max-w-2xl">{t("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col items-start transition-all"
              >
                {/* Image Container with Custom Cutout */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                  
                  {/* Overlay shadow for text contrast if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg text-white flex flex-col items-center justify-center p-2 min-w-[3.5rem] border border-white/10">
                    <span className="text-lg font-bold leading-none">{post.day}</span>
                    <span className="text-[10px] font-medium tracking-wider uppercase mt-1">{post.month}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase">
                    {post.category}
                  </div>

                  {/* Bottom Right Cutout for Arrow Button */}
                  <div className="absolute bottom-0 right-0 bg-white-bg pt-3 pl-3 rounded-tl-xl z-10 pointer-events-none">
                    <div className="w-12 h-12 flex items-center justify-center border border-white-border bg-white-bg text-accent rounded-sm group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 pointer-events-auto">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Card Text Content */}
                <h3 className="text-xl font-medium text-white-text mb-3 leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-white-text-muted text-sm leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto">
                  <span className="text-sm font-medium text-accent inline-flex items-center">
                    Pročitaj više
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
