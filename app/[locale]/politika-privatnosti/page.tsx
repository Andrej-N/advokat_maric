import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Shield } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return {
    title: t("title"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacyPage");

  return (
    <div className="pt-24 lg:pt-32 bg-white-bg">
      <section className="py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-accent/10 rounded-[var(--radius-md)] p-3">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white-text">
              {t("title")}
            </h1>
          </div>

          <div className="h-px bg-white-border my-8" />

          <div className="space-y-8 text-white-text-muted leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                1) Uvodne odredbe
              </h2>
              <p>
                Advokatska kancelarija Marić (u daljem tekstu: Kancelarija) ovom
                Politikom privatnosti definiše koje sve podatke o ličnosti
                prikuplja i obrađuje od posetilaca veb-sajta www.mariclaw.rs,
                kao i rukovanje podacima lica koja stupaju u kontakt sa
                Kancelarijom putem kontakt forme ili elektronske pošte.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                2) Značenje pojedinih izraza
              </h2>
              <p className="mb-2">
                U ovoj Politici privatnosti koriste se sledeći izrazi:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Podatak o ličnosti</strong> — svaki podatak koji se
                  odnosi na fizičko lice čiji je identitet određen ili odrediv.
                </li>
                <li>
                  <strong>Lice na koje se podaci odnose</strong> — fizičko lice
                  čiji se podaci o ličnosti obrađuju.
                </li>
                <li>
                  <strong>Obrada podataka o ličnosti</strong> — svaka radnja ili
                  skup radnji koje se vrše automatizovano ili neautomatizovano sa
                  podacima o ličnosti.
                </li>
                <li>
                  <strong>Kolačići</strong> — tekstualni fajlovi koji se
                  smeštaju u pregledač korisnika prilikom posete veb-sajtu.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                3) Podaci o rukovaocu i kontakt
              </h2>
              <p>
                Rukovalac podacima o ličnosti je Advokatska kancelarija Marić, sa
                sedištem u Loznici, Ul. V. Zečevića K-1, Republika Srbija. Za
                sva pitanja u vezi sa zaštitom podataka o ličnosti možete nas
                kontaktirati putem elektronske pošte na adresu:{" "}
                <a
                  href="mailto:kancelarija.maric@gmail.com"
                  className="text-accent hover:text-accent-dim transition-colors"
                >
                  kancelarija.maric@gmail.com
                </a>{" "}
                ili putem telefona:{" "}
                <a
                  href="tel:+381638964004"
                  className="text-accent hover:text-accent-dim transition-colors"
                >
                  +381 63 896 4004
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                4) Podaci o ličnosti koje prikupljamo
              </h2>
              <p>
                Kancelarija prikuplja IP adresu posetilaca veb-sajta, kao i
                podatke koje posetioci dobrovoljno dostave putem kontakt forme
                (ime i prezime, email adresa, broj telefona, sadržaj poruke).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                5) Osnov prikupljanja i obrade podataka o ličnosti
              </h2>
              <p>
                Pravni osnov za prikupljanje i obradu podataka o ličnosti je
                pristanak lica na koja se podaci odnose, a u skladu sa članom 12
                Zakona o zaštiti podataka o ličnosti Republike Srbije.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                6) Svrha prikupljanja i obrade podataka o ličnosti
              </h2>
              <p>
                Podaci se prikupljaju u cilju omogućavanja korišćenja internet
                stranica, odgovaranja na upite posetilaca i pružanja
                informacija o uslugama Kancelarije.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                7) Način prikupljanja podataka o ličnosti
              </h2>
              <p>
                Pretraživač automatski šalje određene podatke serveru, uključujući
                IP adresu uređaja i druge tehničke informacije. Dodatni podaci se
                prikupljaju isključivo od lica koja dobrovoljno popune kontakt
                formu ili pošalju elektronsku poštu Kancelariji.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                8) Način zaštite podataka o ličnosti
              </h2>
              <p>
                Kancelarija primenjuje napredne tehnologije i organizacione mere
                zaštite podataka o ličnosti. Uprkos svim preduzetim merama,
                Kancelarija ne može bezuslovno garantovati apsolutnu sigurnost
                podataka koji se prenose putem interneta.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                9) Rok čuvanja podataka o ličnosti
              </h2>
              <p>
                Podaci o IP adresama čuvaju se privremeno, u periodu od
                nekoliko meseci. Podaci prikupljeni na osnovu pristanka čuvaju
                se do opoziva datog pristanka.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                10) Obrađivači podataka o ličnosti
              </h2>
              <p>
                Kancelarija može angažovati treća lica za obradu podataka na
                osnovu ugovora, uz zahtev da u potpunosti garantuju primenu
                odgovarajućih tehničkih, organizacionih i kadrovskih mera
                zaštite.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                11) Prava lica na koja se podaci odnose
              </h2>
              <p className="mb-2">
                Lice na koje se podaci odnose ima sledeća prava:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pravo na pristup podacima o ličnosti</li>
                <li>Pravo na ispravku podataka</li>
                <li>Pravo na brisanje podataka</li>
                <li>Pravo na ograničenje obrade</li>
                <li>Pravo na prigovor obradi</li>
                <li>Pravo na prenosivost podataka</li>
              </ul>
              <p className="mt-2">
                Automatizovano donošenje odluka i profilisanje se ne primenjuje.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                12) Politika kolačića (Cookie Policy)
              </h2>
              <p>
                Veb-sajt www.mariclaw.rs koristi kolačiće radi obezbeđivanja
                funkcionalnosti i poboljšanja korisničkog iskustva. Kategorije
                kolačića uključuju neophodne kolačiće (za osnovnu funkcionalnost
                sajta) i statističke kolačiće (za analizu posećenosti).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                13) Način kontaktiranja
              </h2>
              <p>
                Za sva pitanja u vezi sa zaštitom podataka o ličnosti možete nas
                kontaktirati putem elektronske pošte na adresu{" "}
                <a
                  href="mailto:kancelarija.maric@gmail.com"
                  className="text-accent hover:text-accent-dim transition-colors"
                >
                  kancelarija.maric@gmail.com
                </a>{" "}
                ili poštom na adresu: Advokatska kancelarija Marić, Ul. V.
                Zečevića K-1, Loznica, Republika Srbija.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                14) Poverenik za informacije od javnog značaja i zaštitu
                podataka o ličnosti
              </h2>
              <p>
                Ukoliko smatrate da je obrada Vaših podataka o ličnosti izvršena
                suprotno odredbama Zakona o zaštiti podataka o ličnosti, imate
                pravo da podnesete pritužbu Povereniku za informacije od javnog
                značaja i zaštitu podataka o ličnosti na adresu:{" "}
                <a
                  href="mailto:office@poverenik.rs"
                  className="text-accent hover:text-accent-dim transition-colors"
                >
                  office@poverenik.rs
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white-text mb-3">
                15) Stupanje na snagu i izmene Politike privatnosti
              </h2>
              <p>
                Ova Politika privatnosti stupa na snagu danom objavljivanja na
                internet stranici www.mariclaw.rs. Sve eventualne izmene biće
                objavljene na ovoj stranici pre nego što stupe na snagu.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
