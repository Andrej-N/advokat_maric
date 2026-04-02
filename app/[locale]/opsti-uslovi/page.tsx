import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import termsData from "@/content/opsti-uslovi.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Opšti uslovi poslovanja",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const year = new Date().getFullYear();

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-accent/10 rounded-[var(--radius-md)] p-3">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white-text">
              {termsData.title}
            </h1>
          </div>

          <div className="h-px bg-white-border my-8" />

          {termsData.intro && (
            <p className="text-white-text-muted leading-relaxed mb-8">
              {termsData.intro}
            </p>
          )}

          <div className="space-y-10">
            {termsData.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-white-text mb-3">
                  {section.heading}
                </h2>
                <div className="space-y-3">
                  {section.body.split("\n").map((line, j) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    return (
                      <p
                        key={j}
                        className="text-white-text-muted leading-relaxed"
                      >
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-white-border my-8" />

          <p className="text-white-text-dim text-sm">
            &copy;{year} Advokatska kancelarija Marić. Opšti uslovi
            poslovanja.
          </p>
        </div>
      </section>
    </div>
  );
}
