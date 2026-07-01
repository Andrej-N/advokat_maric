# Google Analytics 4 — uputstvo za podešavanje

Sajt ima ugrađenu Google Analytics 4 analitiku sa GDPR cookie banerom.
Analitika se **ne uključuje** dok posetilac ne klikne „Prihvatam" u baneru.

## Šta se prati

- **Posete stranica** (page_view) — automatski, na svakoj stranici i pri navigaciji
- **`click_phone`** — klik na broj telefona (mobilno dugme, footer, kontakt strana)
- **`click_email`** — klik na email (footer, kontakt strana)
- **`click_map`** — klik na adresu / Google Maps (kontakt strana)
- **`contact_form_submit`** — uspešno poslata kontakt forma

U GA4 ovi događaji se vide u: **Reports → Engagement → Events**.
Heatmape ne postoje u GA4 (to je zaseban alat, npr. Microsoft Clarity).

## Korak 1 — Napravi GA4 property (na advokatovom nalogu)

> Pravimo property direktno na **advokatovom Google nalogu** da bude vlasnik od starta.
> Uloguj se NJEGOVIM nalogom (login podaci od klijenta). Svoj email dodaješ kasnije u Koraku 4.

1. Idi na <https://analytics.google.com> i uloguj se **advokatovim** Google nalogom.
2. **Admin** (donji levi ugao, zupčanik) → **Create → Property**.
3. Ime: `Marić Law`, vremenska zona: Srbija, valuta: RSD → **Next** → **Create**.
4. Platforma: **Web**.
5. Website URL: `https://mariclaw.rs`, ime stream-a: `mariclaw.rs` → **Create stream**.
6. Kopiraj **Measurement ID** (izgleda kao `G-XXXXXXXXXX`).

## Korak 2 — Dodaj ID na Vercel

1. Vercel → projekat `advokat_maric` → **Settings → Environment Variables**.
2. Dodaj:
   - **Key:** `NEXT_PUBLIC_GA_ID`
   - **Value:** `G-XXXXXXXXXX` (tvoj ID)
   - **Environments:** Production, Preview, Development (sve tri)
3. **Save**, pa **Deployments → ... → Redeploy** (env promenljiva se primenjuje tek na novom deploy-u).

> Lokalno (na računaru) napravi fajl `.env.local` sa istom linijom ako želiš da testiraš.

## Korak 3 — Provera

1. Otvori `https://mariclaw.rs`, pojaviće se cookie baner → klikni **Prihvatam**.
2. U GA4 → **Reports → Realtime** trebalo bi da vidiš sebe kao aktivnog korisnika.
3. Klikni na telefon/email/pošalji formu → u **Realtime → Event count by Event name**
   pojaviće se `click_phone`, `click_email`, `contact_form_submit`.

## Dodavanje svog pristupa (za održavanje)

Property je već na advokatovom nalogu (on je vlasnik). Dodaj **svoj** email da možeš
da upravljaš kasnije:
GA4 → **Admin → Property access management → +** → tvoj Google email →
uloga **Administrator** ili **Editor** → **Add**.

## Napomene o privatnosti (GDPR)

- IP adrese su anonimizovane (`anonymize_ip`).
- Cookie baner koristi **Google Consent Mode v2** — dok posetilac ne prihvati,
  GA ne postavlja kolačiće niti šalje podatke.
- Izbor posetioca se pamti u `localStorage` (ključ `cookie-consent`); baner se
  više ne prikazuje dok korisnik ne obriše podatke pregledača.
