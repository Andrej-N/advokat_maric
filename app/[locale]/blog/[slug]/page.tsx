import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/routing";
import type { Metadata } from "next";
import { ArrowLeft, Calendar } from "lucide-react";

const mockPosts: Record<
  string,
  { title: string; date: string; category: string; content: string }
> = {
  "zastita-prava-zaposlenih": {
    title: "Zaštita prava zaposlenih u Srbiji",
    date: "2026-03-15",
    category: "Radno pravo",
    content: `Zakon o radu Republike Srbije pruža niz zaštitnih mehanizama za zaposlene. Svaki zaposleni ima pravo na zaštitu od nezakonitog otkaza, pravo na zaradu, pravo na bezbednost i zdravlje na radu, kao i pravo na sindikalno organizovanje.

U praksi, najčešći sporovi se odnose na nezakonite otkaze ugovora o radu, neisplaćene zarade i naknade, zlostavljanje na radu (mobbing) i povrede prava iz radnog odnosa.

Zaposleni koji smatra da su mu prava povređena može podneti tužbu nadležnom sudu u roku od 60 dana od dana saznanja za povredu prava, odnosno od dana učinjene povrede. Važno je napomenuti da je rok za tužbu prekluzivan, što znači da protekom roka zaposleni gubi pravo na sudsku zaštitu.

Advokatska kancelarija Marić pruža pravnu pomoć u svim fazama radnog spora, od pokušaja mirnog rešavanja spora, preko podnošenja tužbe, do zastupanja pred sudom.`,
  },
  "nasledno-pravo-srbija": {
    title: "Nasledno pravo — osnove koje treba znati",
    date: "2026-03-01",
    category: "Građansko pravo",
    content: `Nasledno pravo u Srbiji regulisano je Zakonom o nasleđivanju. Nasleđivanje može biti zakonsko (po sili zakona) i testamentarno (po osnovu testamenta).

Zakonski naslednici dele se u nasledne redove. Prvi nasledni red čine potomci ostavioca i bračni drug. Drugi nasledni red čine roditelji ostavioca i bračni drug. Treći nasledni red čine dedovi i babe ostavioca.

Ostavinski postupak pokreće se nakon smrti lica. Nadležni sud sprovodi ostavinski postupak u kome se utvrđuje ko su naslednici, šta čini zaostavštinu i koja prava pripadaju pojedinim naslednicima.

Testament je jednostrani pravni posao kojim ostavilac raspolaže svojom imovinom za slučaj smrti. Testament mora ispunjavati zakonom propisane uslove forme da bi bio punovažan.

Nužni naslednici (potomci, bračni drug, roditelji) imaju pravo na nužni deo, koji iznosi polovinu zakonskog naslednog dela.`,
  },
  "ustavna-zalba-postupak": {
    title: "Ustavna žalba — kad i kako je podneti",
    date: "2026-02-15",
    category: "Zaštita ljudskih prava",
    content: `Ustavna žalba je pravno sredstvo kojim se štite ustavom garantovana ljudska i manjinska prava i slobode. Podnosi se Ustavnom sudu Republike Srbije.

Ustavna žalba se može podneti protiv pojedinačnih akata ili radnji državnih organa ili organizacija kojima su poverena javna ovlašćenja, a kojima se povređuju ili uskraćuju ljudska ili manjinska prava i slobode zajemčena Ustavom.

Ustavna žalba se može izjaviti tek nakon iscrpljivanja svih drugih pravnih sredstava. To znači da podnosilac mora prvo iskoristiti sve redovne i vanredne pravne lekove.

Rok za podnošenje ustavne žalbe je 30 dana od prijema poslednje odluke kojom je iscrpljeno pravno sredstvo.

Nakon Ustavnog suda, poslednja instanca zaštite ljudskih prava je Evropski sud za ljudska prava u Strazburu.`,
  },
};

export async function generateStaticParams() {
  return Object.keys(mockPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = mockPosts[slug];
  if (!post) return { title: "404" };

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = mockPosts[slug];

  if (!post) {
    return (
      <div className="pt-32 text-center py-28 bg-white-bg">
        <h1 className="text-2xl text-white-text">404</h1>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <article className="py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white-text-muted hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToBlog")}
          </Link>

          <div className="flex items-center gap-3 mb-6">
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

          <h1 className="text-3xl md:text-4xl font-bold text-white-text mb-8">
            {post.title}
          </h1>

          <div className="max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-white-text-muted leading-relaxed mb-6 text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
