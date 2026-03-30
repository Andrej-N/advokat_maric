# Vraćanje sa GitHub Pages na Vercel (produkcija)

Kad klijent odobri dizajn i budemo spremni za produkciju, treba vratiti ove promene:

---

## 1. next.config.ts — ukloni static export

Zameni ceo fajl sa:

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
```

Brisemo: `output: "export"`, `basePath`, `images.unoptimized`

## 2. middleware.ts — vrati nazad

Obrisi `middleware.ts.bak` i napravi novi `middleware.ts`:

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!dashboard|api|_next|_vercel|.*\\..*).*)",
  ],
};
```

## 3. GitHub Actions — obrisi

Obrisi fajl `.github/workflows/deploy.yml` (nije potreban za Vercel).

## 4. sitemap.ts i robots.ts — ukloni force-static

Obrisi liniju `export const dynamic = "force-static";` iz oba fajla:
- `app/sitemap.ts`
- `app/robots.ts`

## 5. Dashboard edit page — spoji nazad (opciono)

Fajl `app/dashboard/blog/[id]/edit/page.tsx` je razdvojen na server + client komponentu zbog static export-a. Za Vercel ovo radi i ovako, ali ako zelis da vratis na originalni oblik, spoji `EditBlogPostClient.tsx` nazad u `page.tsx` sa `"use client"` i obrisi `generateStaticParams`.

## 6. GitHub Pages — ugasi

Na GitHub repo: Settings → Pages → Source → None

## 7. Vercel deploy

1. Importuj repo na Vercel
2. Poveži domen mariclaw.rs
3. Gotovo — SSR, middleware, API routes sve radi

---

## Šta se gubi na GitHub Pages (static export):

- ❌ Server-side rendering (SSR)
- ❌ Middleware (i18n auto-redirect ne radi)
- ❌ API routes (/api/*)
- ❌ Optimizovane slike (next/image)
- ❌ ISR / revalidacija

Šta radi na GitHub Pages:
- ✅ Sve stranice se prikazuju
- ✅ Navigacija radi
- ✅ Three.js animacija
- ✅ Language switcher (client-side)
- ✅ Dashboard mock (localStorage)
