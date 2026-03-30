# Blog Dashboard - Od Mock do Produkcije

Ovaj dokument opisuje korake za pretvaranje mock blog dashboard-a u production-ready sistem.

---

## Trenutno stanje (Mock)

- **Auth:** NextAuth CredentialsProvider sa hardkodovanim kredencijalima
- **Storage:** localStorage (blog postovi se cuvaju u browseru)
- **Editor:** TipTap WYSIWYG
- **API:** Next.js API routes sa in-memory/localStorage CRUD

---

## Korak 1: Baza podataka

### Instalacija

```bash
npm install prisma @prisma/client
npx prisma init
```

### Schema (prisma/schema.prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String   // bcrypt hash
  role      String   @default("admin")
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  status      String   @default("draft") // draft | published
  publishedAt DateTime?
  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  translations PostTranslation[]
  seo          PostSeo?
}

model PostTranslation {
  id       String @id @default(cuid())
  post     Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId   String
  locale   String // sr-Latn | sr | en
  title    String
  excerpt  String?
  content  String @db.Text // TipTap JSON ili HTML

  @@unique([postId, locale])
}

model PostSeo {
  id          String  @id @default(cuid())
  post        Post    @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId      String  @unique
  metaTitle   String?
  metaDesc    String?
  ogImage     String?
  keywords    String?
}
```

### Migracija

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Preporuka za bazu

- **Vercel Postgres** (besplatno do 256MB) - najlaksa integracija
- **Supabase** (besplatno do 500MB) - alternativa sa vise features
- **PlanetScale** - ako ocekujes rast

---

## Korak 2: Auth upgrade

### Zameni CredentialsProvider pravim

```typescript
// lib/auth.ts - PRODUKCIJA
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/dashboard/login",
  }
}
```

### Kreiranje admin korisnika

```bash
# Napravi script: scripts/create-admin.ts
npx tsx scripts/create-admin.ts
```

```typescript
// scripts/create-admin.ts
import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
  const hashedPassword = await bcrypt.hash("PRAVI_PASSWORD_OVDE", 12)

  await prisma.user.create({
    data: {
      email: "kancelarija.maric@gmail.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin"
    }
  })

  console.log("Admin kreiran!")
}

main()
```

---

## Korak 3: API routes upgrade

### Zameni localStorage sa Prisma

```typescript
// app/api/blog/route.ts - PRODUKCIJA
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")
  const locale = searchParams.get("locale") || "sr-Latn"

  const posts = await prisma.post.findMany({
    where: status ? { status } : undefined,
    include: {
      translations: { where: { locale } },
      seo: true,
      author: { select: { name: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  return Response.json(posts)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  const post = await prisma.post.create({
    data: {
      slug: body.slug,
      status: body.status || "draft",
      authorId: session.user.id,
      publishedAt: body.status === "published" ? new Date() : null,
      translations: {
        create: body.translations // [{locale, title, excerpt, content}]
      },
      seo: body.seo ? { create: body.seo } : undefined
    },
    include: { translations: true, seo: true }
  })

  return Response.json(post)
}
```

---

## Korak 4: Upload slika

### Opcija A: Vercel Blob (najlakse)

```bash
npm install @vercel/blob
```

```typescript
// app/api/upload/route.ts
import { put } from "@vercel/blob"

export async function POST(req: Request) {
  const form = await req.formData()
  const file = form.get("file") as File

  const blob = await put(file.name, file, {
    access: "public",
  })

  return Response.json({ url: blob.url })
}
```

### Opcija B: Cloudinary (vise kontrole)

```bash
npm install cloudinary
```

---

## Korak 5: Revalidacija (ISR)

Kad se post objavi, revalidiraj stranicu:

```typescript
// app/api/blog/publish/route.ts
import { revalidatePath } from "next/cache"

export async function POST(req: Request) {
  // ... objavi post u bazi ...

  // Revalidiraj blog stranice za sve jezike
  revalidatePath("/blog")
  revalidatePath("/sr/blog")
  revalidatePath("/en/blog")
  revalidatePath(`/blog/${post.slug}`)

  return Response.json({ success: true })
}
```

---

## Korak 6: Environment variables

```env
# .env.local (PRODUKCIJA)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generisi-random-string-32-karaktera"
NEXTAUTH_URL="https://mariclaw.rs"
BLOB_READ_WRITE_TOKEN="vercel-blob-token"  # ako koristis Vercel Blob
```

---

## Checklist za produkciju

- [ ] Postavi PostgreSQL bazu (Vercel Postgres / Supabase)
- [ ] Pokreni Prisma migracije
- [ ] Kreiraj admin korisnika sa pravim kredencijalima
- [ ] Zameni mock API routes sa Prisma verzijama
- [ ] Zameni localStorage sa API pozivima u dashboard komponentama
- [ ] Podesi upload slika (Vercel Blob ili Cloudinary)
- [ ] Podesi NEXTAUTH_SECRET i NEXTAUTH_URL
- [ ] Dodaj revalidaciju stranica nakon objave posta
- [ ] Testiraj CRUD operacije
- [ ] Testiraj auth flow (login/logout/session expiry)
- [ ] Testiraj SEO metadata za blog postove

---

## Procena vremena za produkciju

| Zadatak | Vreme |
|---|---|
| Setup baze + Prisma | 1-2h |
| Auth upgrade | 1h |
| API routes zamena | 2-3h |
| Upload slika | 1h |
| Testiranje | 2h |
| **Ukupno** | **~8h** |

Mock je dizajniran tako da su interfejsi (API routes, komponente) vec na mestu.
Zamena storage layer-a je jedina prava promena.
