# Maric Advokatura - Plan Redizajna

## Tech Stack

| Komponenta | Tehnologija | Zasto |
|---|---|---|
| **Framework** | **Next.js 14+ (App Router)** | SSR/SSG za SEO, file-based routing, image optimization, metadata API |
| **Hosting** | **Vercel (free tier)** | Zero-config za Next.js, edge network, auto deploy |
| **Styling** | **Tailwind CSS** | Brz development, responsive, design tokens |
| **Animacija** | **Three.js + @react-three/fiber** | Za neuronsku/particle mrežu u hero sekciji |
| **i18n** | **next-intl** | Najzrelija i18n lib za App Router, routing po jeziku (`/sr-Latn/`, `/sr/`, `/en/`) |
| **CMS/Blog** | **MDX + lokalni fajlovi** (mock) → **Headless CMS** (produkcija) | Mock faza: MDX fajlovi. Lako se zameni sa Strapi/Sanity |
| **Dashboard** | **NextAuth.js + React komponente** | Mock auth sa credentials providerom, lako se prebaci na pravi backend |
| **SEO** | **Next.js Metadata API + JSON-LD** | Structured data, sitemap, robots.txt, OG slike |
| **Ikone** | **Lucide React** | Lagane, konzistentne |
| **Blog Editor** | **TipTap (WYSIWYG)** | Vizuelni editor, klijent ne mora da zna Markdown |

---

## Arhitektura i Struktura

```
advokat_maric/
├── app/
│   ├── [locale]/                    # sr-Latn (default) | sr | en
│   │   ├── layout.tsx               # Root layout sa navbar/footer
│   │   ├── page.tsx                 # Pocetna (hero + sekcije)
│   │   ├── o-nama/page.tsx          # O nama
│   │   ├── pravna-pomoc/
│   │   │   ├── page.tsx             # Pregled oblasti
│   │   │   ├── [slug]/page.tsx      # Pojedinacna oblast
│   │   ├── pro-bono/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx             # Lista blogova
│   │   │   ├── [slug]/page.tsx      # Pojedinacni blog
│   │   ├── kontakt/page.tsx
│   │   └── not-found.tsx
│   ├── dashboard/                   # IZVAN locale (ne treba i18n)
│   │   ├── layout.tsx               # Dashboard layout
│   │   ├── page.tsx                 # Dashboard home
│   │   ├── blog/
│   │   │   ├── page.tsx             # Lista blog postova
│   │   │   ├── new/page.tsx         # Novi post editor
│   │   │   ├── [id]/edit/page.tsx   # Edit post
│   │   └── login/page.tsx           # Login stranica
│   └── api/
│       ├── auth/[...nextauth]/      # NextAuth endpoint
│       └── blog/                    # Mock blog CRUD API
├── components/
│   ├── ui/                          # Reusable UI (Button, Card, Input...)
│   ├── layout/                      # Navbar, Footer, LanguageSwitcher
│   ├── sections/                    # Hero, Services, About, Contact
│   ├── blog/                        # BlogCard, BlogList, Editor
│   ├── dashboard/                   # Sidebar, Stats, PostTable
│   └── three/                       # NeuralNetwork canvas, particles
├── lib/
│   ├── i18n/                        # next-intl config
│   ├── auth.ts                      # NextAuth config
│   ├── blog.ts                      # Blog data layer (mock → API)
│   └── seo.ts                       # Metadata helpers, JSON-LD
├── messages/
│   ├── sr-Latn.json                 # Latinica (DEFAULT)
│   ├── sr.json                      # Cirilica
│   └── en.json                      # English
├── content/
│   └── blog/                        # MDX blog postovi (mock)
├── public/
│   ├── og/                          # OG slike
│   └── favicon/
└── tailwind.config.ts
```

---

## Dizajn Sistem

### Paleta boja

- **Primary:** `#0A1628` (tamno plava pozadina)
- **Secondary:** `#1E3A5F` (srednje plava)
- **Accent:** `#3B82F6` (jasno plava za CTA/linkove)
- **Accent Light:** `#60A5FA` (hover stanja)
- **Text Primary:** `#F8FAFC` (bela)
- **Text Muted:** `#94A3B8` (siva za sporedni tekst)
- **Surface:** `#0F2340` (kartice, sekcije)
- **Border:** `#1E3A5F40` (suptilne linije)

### Neuronska animacija (Hero)

- Three.js canvas u hero sekciji
- Plave tacke (cvorovi) povezane linijama
- Subtilno pulsiranje i pokretanje
- Reaguje na poziciju misa (parallax efekat)
- Performant: requestAnimationFrame, lazy load, reduce na mobilnom

---

## SEO Strategija

- **Metadata API:** Svaka stranica ima unikatan title, description, keywords
- **JSON-LD:** LegalService, Organization, Attorney, BreadcrumbList schema
- **Sitemap:** Automatski generisan za sve jezike
- **robots.txt:** Pravilno konfigurisan
- **OG slike:** Dinamicki generisane per-page
- **Canonical URLs:** hreflang tagovi za svaku jezicku verziju
- **Blog:** Svaki post optimizovan sa meta tagovima, heading strukturom, internal linkovima
- **Performance:** Core Web Vitals (LCP < 2.5s, CLS < 0.1) - Next.js Image, font optimization
- **Google Business:** Povezati sa sajtom, structured data za local business

---

## i18n - Jezici

| Ruta | Latinica (default) | Cirilica | English |
|---|---|---|---|
| Pocetna | `/` ili `/sr-Latn/` | `/sr/` | `/en/` |
| O nama | `/o-nama` | `/sr/o-nama` | `/en/about` |
| Blog | `/blog/naslov` | `/sr/blog/naslov` | `/en/blog/title` |

- Default locale: sr-Latn (latinica) - bez prefiksa u URL-u
- Language switcher u navbaru (SR/ЋИР/EN)
- Sav sadrzaj preveden u messages/*.json fajlovima
- Blog postovi: svaki post ima verzije za sva tri jezika

---

## Stranice i Sekcije

### Pocetna (Landing)

1. **Hero** - Neuronska animacija + headline + CTA
2. **O kancelariji** - Kratak opis + godina osnivanja (1994)
3. **Oblasti prava** - Grid sa 7 oblasti + ikonice
4. **Pro Bono** - Sekcija o drustvenom angazmanu
5. **Blog preview** - Poslednja 3 posta
6. **Kontakt** - Info (adresa, telefon, email) - BEZ kontakt forme

### Pojedinacne stranice

- O nama
- Svaka pravna oblast (7 stranica)
- Pro Bono
- Blog lista
- Blog post (pojedinacni)
- Kontakt

---

## Dashboard (Mock → Production)

### Mock faza (sada)

- Login stranica sa hardkodovanim kredencijalima (admin/admin123)
- NextAuth sa CredentialsProvider
- Blog CRUD sa lokalnim state-om (localStorage)
- TipTap WYSIWYG editor
- Tabela postova sa statusom (draft/published)
- Preview funkcija
- Jezicke verzije posta (sr-Latn, sr, en)

### Za produkciju (lako se doda)

Pogledaj: [BLOG_PRODUCTION.md](./BLOG_PRODUCTION.md)

---

## Sadrzaj sa trenutnog sajta (za migraciju)

### O nama
"Адвокатска канцеларија Марић је основана јануара 1994. год. са седиштем у Лозници и од тада непрекидно пружа правну помоћ физичким и правним лицима на територији Републике Србије."

"Правна помоћ коју пружамо заснива се на давању правних савета и мишљења, изради општих и појединачних правних аката, уговора, изјава и других исправа, као и заступању клијената пред судовима, органима управе, организацијама и другим лицима."

### Oblasti prava

**Krivicno pravo:** Odbrana osumnjicenih i okrivljenih lica u svim fazama krivicnog postupka, zastupanje ostecenih, zastupanje maloletnih lica.

**Radno pravo:** Izrada ugovora o radu, pravilnika, zastupanje u radnim sporovima (neisplacene zarade, beneficije, prevoz, naknada zarade), povrede na radu, mobing.

**Gradjansko pravo:** Stvarno pravo, nasledno pravo, porodicno pravo.

**Upravno pravo:** Pravna pomoc u svim upravnim postupcima pred organima uprave i upravnim sporovima.

**Privredno pravo:** Osnivanje kompanija, izrada akata, statusne promene, finansijske transakcije, pravne analize, ugovori, zastupanje u privrednim prestupima i stecaju.

**Prekrsajno pravo:** Pravna pomoc fizickim i pravnim licima u svim postupcima pred Prekrsajnim sudom.

**Zastita ljudskih prava:** Zastupanje pred Ustavnim sudom RS (ustavna zalba) i podnosenje predstavki Evropskom sudu za ljudska prava u Strazburu.

### Pro Bono
Kancelarija pruza pro bono pravnu pomoc za:
1. Udruzenja gradjana za borbu protiv raka kod dece "Uvek sa decom"
2. Nacionalno udruzenje roditelja dece obolele od raka "NURDOR"
3. Udruzenje gradjana za borbu protiv retkih bolesti kod dece "ZIVOT"

### Kontakt
- Adresa: Ul. V. Zecevica K-1, Loznica
- Telefon: +38163 8964004
- Email: kancelarija.maric@gmail.com
- Web: www.mariclaw.rs

### Disclaimer
"Ova internet stranica je iskljucivo informativnog karaktera i ni na koji nacin nije namenjena pridobijanju klijenata i ne predstavlja pravno savetovanje u vezi sa bilo kojom od navedenih oblasti."
