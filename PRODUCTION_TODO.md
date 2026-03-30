# Marić Advokatura — Vodič za produkciju

Kompletna lista svega što treba uraditi da sajt bude production-ready.

---

## 1. Deployment na Vercel

### 1.1 Napravi GitHub repo

```bash
git init
git add .
git commit -m "Initial commit - Maric Advokatura website"
git remote add origin https://github.com/TVOJ_USERNAME/advokat-maric.git
git push -u origin main
```

### 1.2 Poveži sa Vercel

1. Idi na https://vercel.com i prijavi se (GitHub login)
2. Klikni "Add New Project"
3. Importuj `advokat-maric` repo sa GitHuba
4. Framework Preset: **Next.js** (automatski detektuje)
5. Klikni **Deploy**
6. Sacekaj build (2-3 minuta)
7. Dobices URL kao `advokat-maric-xxx.vercel.app` — sajt je live

### 1.3 Poveži domen (Namecheap → Vercel)

1. Na Vercel dashboardu: Settings → Domains → Dodaj `mariclaw.rs`
2. Vercel ce ti dati DNS zapise koje treba podesiti
3. Na Namecheap dashboardu: Domain List → mariclaw.rs → Manage → Advanced DNS
4. Obrisi postojece zapise (A, CNAME za @/www)
5. Dodaj nove zapise:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com. | Automatic |

6. Sacekaj propagaciju DNS-a (5 min do 48h, obicno 15-30 min)
7. Vercel automatski izdaje SSL sertifikat (besplatan)

### 1.4 Premium DNS (Namecheap)

Posto imas Premium DNS na Namecheap, zapisi se podesavaju isto kao gore, ali u Premium DNS sekciji umesto Advanced DNS. Prednost je brza propagacija i veca pouzdanost.

---

## 2. Environment varijable (Vercel)

Na Vercel dashboardu: Settings → Environment Variables. Dodaj:

| Key | Value | Opis |
|-----|-------|------|
| `NEXTAUTH_SECRET` | Generisi sa `openssl rand -base64 32` | Secret za NextAuth sesije |
| `NEXTAUTH_URL` | `https://mariclaw.rs` | Produkcioni URL |

Za sada su samo ove dve potrebne. Ostale se dodaju kad se blog prebaci na pravu bazu.

---

## 3. Google Business integracija

### 3.1 Poveži sajt sa Google Business

1. Prijavi se na https://business.google.com
2. Idi na profil kancelarije
3. Info → Website → promeni na `https://mariclaw.rs`
4. Sacekaj verifikaciju

### 3.2 Google Search Console

1. Idi na https://search.google.com/search-console
2. Dodaj property: `https://mariclaw.rs`
3. Verifikuj vlasnistvo:
   - Preporučeno: DNS verifikacija (dodaj TXT zapis na Namecheap)
   - Ili: HTML tag metoda (dodajemo meta tag u layout)
4. Posle verifikacije: Podesi sitemap URL → `https://mariclaw.rs/sitemap.xml`

### 3.3 Google Reviews — Place ID

1. Idi na: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Pretraži: "Advokatska kancelarija Marić Loznica"
3. Kopiraj Place ID (format: `ChIJ...`)
4. U fajlu `components/sections/GoogleReviews.tsx`:
   - Zameni `GOOGLE_BUSINESS_URL` sa: `https://search.google.com/local/reviews?placeid=TVOJ_PLACE_ID`

---

## 4. SEO post-launch

### 4.1 Verifikuj da sve radi

- [ ] Otvori https://mariclaw.rs/sitemap.xml — treba da se prikaze XML sa svim stranicama
- [ ] Otvori https://mariclaw.rs/robots.txt — treba da blokira /dashboard/ i /api/
- [ ] Testiraj sa https://search.google.com/test/rich-results — unesi mariclaw.rs
- [ ] Testiraj sa https://pagespeed.web.dev/ — ciljaj 90+ na svim kategorijama

### 4.2 Indeksiranje

1. U Google Search Console: URL Inspection → unesi `https://mariclaw.rs` → Request Indexing
2. Ponovi za ključne stranice: /o-nama, /blog, /kontakt, svaku oblast prava
3. Google ce indeksirati sajt u roku od 1-7 dana

### 4.3 Google Analytics

1. Napravi GA4 property na https://analytics.google.com
2. Kopiraj Measurement ID (format: `G-XXXXXXXXXX`)
3. Dodaj u `app/[locale]/layout.tsx` pre zatvaranja `</head>`:

```tsx
<script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
<script dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
`}} />
```

4. Dodaj `G-XXXXXXXXXX` kao env varijablu na Vercel-u

---

## 5. Blog — od mock-a do produkcije

Detaljno opisano u `BLOG_PRODUCTION.md`. Ukratko:

### 5.1 Baza podataka

```bash
npm install prisma @prisma/client
npx prisma init
```

- Preporuka: **Vercel Postgres** (besplatan, najlakša integracija)
- Alternativa: **Supabase** (besplatan do 500MB)

### 5.2 Auth upgrade

- Zameni hardkodovane kredencijale (admin/admin123) pravim
- Dodaj bcrypt hash za lozinke
- Podesi NextAuth sa PrismaAdapter

### 5.3 Storage

- Zameni localStorage sa Prisma CRUD operacijama
- API routes već postoje, samo treba zameniti storage layer

### 5.4 Editor

- Trenutno: HTML textarea (mock)
- Produkcija: TipTap WYSIWYG (kad izadju React 19 kompatibilnu verziju)
- Alternativa: downgrade na React 18, instalirati `@tiptap/react@2.x`

### 5.5 Upload slika

- Vercel Blob (najjednostavnije, besplatno do 1GB)
- Ili Cloudinary (više kontrole, besplatno do 25GB)

---

## 6. Email notifikacije (opciono)

Ako klijent želi kontakt formu u budućnosti:

- **Resend** (besplatno do 3000 mejlova/mesec) — `npm install resend`
- Ili **EmailJS** — client-side, bez backend-a

---

## 7. Bezbednost

### 7.1 Obavezno pre launcha

- [ ] Promeniti mock kredencijale (admin/admin123) u prave
- [ ] Generisati NEXTAUTH_SECRET (min 32 karaktera)
- [ ] Verifikovati da je /dashboard/ blokiran u robots.txt
- [ ] Proveriti da .env fajlovi nisu commitovani (vec u .gitignore)

### 7.2 HTTP Security Headers

Dodati u `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
      ],
    },
  ],
};
```

### 7.3 Rate limiting (kada se doda API)

- Koristiti Vercel Edge Middleware ili `upstash/ratelimit`

---

## 8. Favicon i OG slike

### 8.1 Favicon

1. Napravi favicon sa logom kancelarije (Scale ikona + plava boja)
2. Koristi https://realfavicongenerator.net/ za generisanje svih veličina
3. Stavi fajlove u `public/favicon/`
4. Dodaj u `app/layout.tsx` metadata:

```typescript
icons: {
  icon: [
    { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
  apple: "/favicon/apple-touch-icon.png",
}
```

### 8.2 OG slika (za deljenje na društvenim mrežama)

1. Napravi sliku 1200x630px sa logom i nazivom kancelarije
2. Stavi u `public/og/default.jpg`
3. Dodaj u metadata:

```typescript
openGraph: {
  images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
}
```

---

## 9. Stari WordPress sajt — migracija

### Redosled:

1. Deploy novi sajt na Vercel (dobije privremeni URL)
2. Testiraj sve stranice na privremenom URL-u
3. Promeni DNS na Namecheap da pokazuje na Vercel
4. Stari WordPress hosting — ne diraj dok ne potvrdis da novi sajt radi
5. Posle 1 nedelju: ugasi WordPress hosting (ili zadrži za email ako koristi isti)

### 301 Redirecti (ako se URL-ovi menjaju)

Ako stari sajt ima stranice sa drugacijom URL strukturom, dodaj redirect u `next.config.ts`:

```typescript
redirects: async () => [
  { source: "/krivicno-pravo", destination: "/pravna-pomoc/krivicno-pravo", permanent: true },
  { source: "/radno-pravo", destination: "/pravna-pomoc/radno-pravo", permanent: true },
  // ... ostale stare URL-ove
],
```

Ovo je bitno za SEO — Google ne gubi ranking postojecih stranica.

---

## 10. Monitoring posle launcha

- [ ] Google Search Console — pratiti indeksiranje i greške
- [ ] Google Analytics — pratiti posete
- [ ] Vercel Analytics (besplatan) — Core Web Vitals
- [ ] Proveriti sajt na mobilnim uredjajima (Chrome DevTools → Device Mode)
- [ ] Testirati jezičke verzije: /, /sr/, /en/
- [ ] Testirati da language switcher radi na svim stranicama

---

## Checklist — krajnji pregled pre launcha

### Sadržaj
- [ ] Sav tekst proveren (pravopis, tačnost informacija)
- [ ] Kontakt informacije tačne (adresa, telefon, email)
- [ ] Blog postovi — klijent odobrio mock sadržaj ili napisao svoj
- [ ] Disclaimer tekst odobren od klijenta

### Tehničko
- [ ] Build prolazi bez grešaka (`npm run build`)
- [ ] Sve stranice se učitavaju (testirati svaku rutu)
- [ ] Language switcher radi (LAT → ЋИР → EN)
- [ ] Mobilni prikaz OK (320px, 768px, 1024px)
- [ ] Dashboard login radi
- [ ] Dashboard CRUD radi (kreiranje, izmena, brisanje postova)
- [ ] Sitemap.xml generisan
- [ ] robots.txt blokira /dashboard/ i /api/

### SEO
- [ ] Meta title i description na svim stranicama
- [ ] JSON-LD (LegalService) prisutan u HTML-u
- [ ] hreflang tagovi za sve jezike
- [ ] OG slike postavljene
- [ ] Favicon postavljen
- [ ] Google Search Console verifikovan
- [ ] Google Analytics povezan

### DNS / Domen
- [ ] A zapis → 76.76.21.21
- [ ] CNAME www → cname.vercel-dns.com
- [ ] SSL sertifikat aktivan (automatski od Vercel-a)
- [ ] Stari sajt redirect ili ugašen
