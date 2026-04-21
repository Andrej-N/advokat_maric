import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = [
  {
    slug: "zastita-prava-zaposlenih",
    status: "published",
    publishedAt: new Date("2026-03-15T10:00:00Z"),
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    category: "Radno pravo",
    serviceKey: "labor",
    translations: [
      {
        locale: "sr-Latn",
        title: "Zaštita prava zaposlenih u Srbiji",
        excerpt: "Pregled osnovnih prava zaposlenih i mehanizama za njihovu zaštitu prema važećem Zakonu o radu.",
        content:
          "<p>Zakon o radu Republike Srbije pruža niz zaštitnih mehanizama za zaposlene. Svaki zaposleni ima pravo na zaštitu od nezakonitog otkaza, pravo na zaradu, pravo na bezbednost i zdravlje na radu, kao i pravo na sindikalno organizovanje.</p><p>U praksi, najčešći sporovi se odnose na nezakonite otkaze ugovora o radu, neisplaćene zarade i naknade, zlostavljanje na radu (mobbing) i povrede prava iz radnog odnosa.</p>",
      },
      {
        locale: "sr",
        title: "Заштита права запослених у Србији",
        excerpt: "Преглед основних права запослених и механизама за њихову заштиту према важећем Закону о раду.",
        content: "<p>Закон о раду Републике Србије пружа низ заштитних механизама за запослене.</p>",
      },
      {
        locale: "en",
        title: "Employee Rights Protection in Serbia",
        excerpt: "An overview of basic employee rights and protection mechanisms under the current Labor Law.",
        content:
          "<p>The Labor Law of the Republic of Serbia provides a number of protective mechanisms for employees.</p>",
      },
    ],
    seo: {
      metaTitle: "Zaštita prava zaposlenih u Srbiji | Marić Advokatura",
      metaDescription: "Pregled osnovnih prava zaposlenih i mehanizama za njihovu zaštitu prema važećem Zakonu o radu.",
      keywords: "prava zaposlenih, radno pravo, zakon o radu, Srbija",
    },
  },
  {
    slug: "nasledno-pravo-srbija",
    status: "published",
    publishedAt: new Date("2026-03-01T10:00:00Z"),
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=1200",
    category: "Nasledno pravo",
    serviceKey: "familyAndInheritance",
    translations: [
      {
        locale: "sr-Latn",
        title: "Nasledno pravo — osnove koje treba znati",
        excerpt: "Šta je zakonsko nasleđivanje, kako funkcioniše ostavinski postupak i koja su vaša prava kao naslednika.",
        content:
          "<p>Nasledno pravo u Srbiji regulisano je Zakonom o nasleđivanju. Nasleđivanje može biti zakonsko (po sili zakona) i testamentarno (po osnovu testamenta).</p>",
      },
      {
        locale: "sr",
        title: "Наследно право — основе које треба знати",
        excerpt: "Шта је законско наслеђивање, како функционише оставински поступак и која су ваша права као наследника.",
        content: "<p>Наследно право у Србији регулисано је Законом о наслеђивању.</p>",
      },
      {
        locale: "en",
        title: "Inheritance Law — Basics You Need to Know",
        excerpt: "What is statutory inheritance, how the probate process works, and what your rights as an heir are.",
        content: "<p>Inheritance law in Serbia is regulated by the Law on Inheritance.</p>",
      },
    ],
    seo: {
      metaTitle: "Nasledno pravo — osnove | Marić Advokatura",
      metaDescription: "Šta je zakonsko nasleđivanje, kako funkcioniše ostavinski postupak i koja su vaša prava.",
      keywords: "nasledno pravo, nasleđivanje, ostavinski postupak, testament",
    },
  },
  {
    slug: "ustavna-zalba-postupak",
    status: "published",
    publishedAt: new Date("2026-02-15T10:00:00Z"),
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=80&w=1200",
    category: "Ljudska prava",
    serviceKey: "humanRights",
    translations: [
      {
        locale: "sr-Latn",
        title: "Ustavna žalba — kad i kako je podneti",
        excerpt: "Vodič kroz postupak podnošenja ustavne žalbe pred Ustavnim sudom Republike Srbije.",
        content:
          "<p>Ustavna žalba je pravno sredstvo kojim se štite ustavom garantovana ljudska i manjinska prava i slobode.</p>",
      },
      {
        locale: "sr",
        title: "Уставна жалба — кад и како је поднети",
        excerpt: "Водич кроз поступак подношења уставне жалбе пред Уставним судом Републике Србије.",
        content:
          "<p>Уставна жалба је правно средство којим се штите уставом гарантована људска и мањинска права и слободе.</p>",
      },
      {
        locale: "en",
        title: "Constitutional Appeal — When and How to File",
        excerpt: "A guide through the process of filing a constitutional appeal before the Constitutional Court.",
        content:
          "<p>A constitutional appeal is a legal remedy that protects constitutionally guaranteed human and minority rights and freedoms.</p>",
      },
    ],
    seo: {
      metaTitle: "Ustavna žalba — vodič | Marić Advokatura",
      metaDescription: "Vodič kroz postupak podnošenja ustavne žalbe pred Ustavnim sudom.",
      keywords: "ustavna žalba, ustavni sud, ljudska prava, Strazbur",
    },
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) throw new Error("ADMIN_EMAIL env var required (owner of seed posts)");

  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) throw new Error(`No user with email ${adminEmail}. Run create-admin first.`);

  for (const post of seed) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`skip (exists): ${post.slug}`);
      continue;
    }
    await prisma.post.create({
      data: {
        slug: post.slug,
        status: post.status,
        publishedAt: post.publishedAt,
        image: post.image,
        category: post.category,
        serviceKey: post.serviceKey,
        authorId: admin.id,
        translations: { create: post.translations },
        seo: { create: post.seo },
      },
    });
    console.log(`created: ${post.slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
