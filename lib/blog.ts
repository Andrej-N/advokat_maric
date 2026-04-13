export interface BlogPost {
  id: string;
  slug: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  image?: string;
  category?: string;
  serviceKey?: string;
  translations: {
    "sr-Latn": { title: string; excerpt: string; content: string };
    sr: { title: string; excerpt: string; content: string };
    en: { title: string; excerpt: string; content: string };
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export const SERVICE_KEYS = [
  "civil",
  "familyAndInheritance",
  "divorce",
  "contractsAndRealEstate",
  "criminal",
  "commercial",
  "diaspora",
  "administrative",
  "labor",
  "misdemeanor",
  "humanRights",
] as const;

const STORAGE_KEY = "maric_blog_posts";
const STORAGE_VERSION_KEY = "maric_blog_posts_version";
const CURRENT_VERSION = "2";

// Seed data
const seedPosts: BlogPost[] = [
  {
    id: "1",
    slug: "zastita-prava-zaposlenih",
    status: "published",
    createdAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-03-15T10:00:00Z",
    publishedAt: "2026-03-15T10:00:00Z",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    category: "Radno pravo",
    serviceKey: "labor",
    translations: {
      "sr-Latn": {
        title: "Zaštita prava zaposlenih u Srbiji",
        excerpt:
          "Pregled osnovnih prava zaposlenih i mehanizama za njihovu zaštitu prema važećem Zakonu o radu.",
        content:
          "<p>Zakon o radu Republike Srbije pruža niz zaštitnih mehanizama za zaposlene. Svaki zaposleni ima pravo na zaštitu od nezakonitog otkaza, pravo na zaradu, pravo na bezbednost i zdravlje na radu, kao i pravo na sindikalno organizovanje.</p><p>U praksi, najčešći sporovi se odnose na nezakonite otkaze ugovora o radu, neisplaćene zarade i naknade, zlostavljanje na radu (mobbing) i povrede prava iz radnog odnosa.</p>",
      },
      sr: {
        title: "Заштита права запослених у Србији",
        excerpt:
          "Преглед основних права запослених и механизама за њихову заштиту према важећем Закону о раду.",
        content:
          "<p>Закон о раду Републике Србије пружа низ заштитних механизама за запослене.</p>",
      },
      en: {
        title: "Employee Rights Protection in Serbia",
        excerpt:
          "An overview of basic employee rights and protection mechanisms under the current Labor Law.",
        content:
          "<p>The Labor Law of the Republic of Serbia provides a number of protective mechanisms for employees.</p>",
      },
    },
    seo: {
      metaTitle: "Zaštita prava zaposlenih u Srbiji | Marić Advokatura",
      metaDescription:
        "Pregled osnovnih prava zaposlenih i mehanizama za njihovu zaštitu prema važećem Zakonu o radu.",
      keywords: "prava zaposlenih, radno pravo, zakon o radu, Srbija",
    },
  },
  {
    id: "2",
    slug: "nasledno-pravo-srbija",
    status: "published",
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
    publishedAt: "2026-03-01T10:00:00Z",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=1200",
    category: "Nasledno pravo",
    serviceKey: "familyAndInheritance",
    translations: {
      "sr-Latn": {
        title: "Nasledno pravo — osnove koje treba znati",
        excerpt:
          "Šta je zakonsko nasleđivanje, kako funkcioniše ostavinski postupak i koja su vaša prava kao naslednika.",
        content:
          "<p>Nasledno pravo u Srbiji regulisano je Zakonom o nasleđivanju. Nasleđivanje može biti zakonsko (po sili zakona) i testamentarno (po osnovu testamenta).</p>",
      },
      sr: {
        title: "Наследно право — основе које треба знати",
        excerpt:
          "Шта је законско наслеђивање, како функционише оставински поступак и која су ваша права као наследника.",
        content:
          "<p>Наследно право у Србији регулисано је Законом о наслеђивању.</p>",
      },
      en: {
        title: "Inheritance Law — Basics You Need to Know",
        excerpt:
          "What is statutory inheritance, how the probate process works, and what your rights as an heir are.",
        content:
          "<p>Inheritance law in Serbia is regulated by the Law on Inheritance.</p>",
      },
    },
    seo: {
      metaTitle: "Nasledno pravo — osnove | Marić Advokatura",
      metaDescription:
        "Šta je zakonsko nasleđivanje, kako funkcioniše ostavinski postupak i koja su vaša prava.",
      keywords: "nasledno pravo, nasleđivanje, ostavinski postupak, testament",
    },
  },
  {
    id: "3",
    slug: "ustavna-zalba-postupak",
    status: "published",
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-02-15T10:00:00Z",
    publishedAt: "2026-02-15T10:00:00Z",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=80&w=1200",
    category: "Ljudska prava",
    serviceKey: "humanRights",
    translations: {
      "sr-Latn": {
        title: "Ustavna žalba — kad i kako je podneti",
        excerpt:
          "Vodič kroz postupak podnošenja ustavne žalbe pred Ustavnim sudom Republike Srbije.",
        content:
          "<p>Ustavna žalba je pravno sredstvo kojim se štite ustavom garantovana ljudska i manjinska prava i slobode.</p>",
      },
      sr: {
        title: "Уставна жалба — кад и како је поднети",
        excerpt:
          "Водич кроз поступак подношења уставне жалбе пред Уставним судом Републике Србије.",
        content:
          "<p>Уставна жалба је правно средство којим се штите уставом гарантована људска и мањинска права и слободе.</p>",
      },
      en: {
        title: "Constitutional Appeal — When and How to File",
        excerpt:
          "A guide through the process of filing a constitutional appeal before the Constitutional Court.",
        content:
          "<p>A constitutional appeal is a legal remedy that protects constitutionally guaranteed human and minority rights and freedoms.</p>",
      },
    },
    seo: {
      metaTitle: "Ustavna žalba — vodič | Marić Advokatura",
      metaDescription:
        "Vodič kroz postupak podnošenja ustavne žalbe pred Ustavnim sudom.",
      keywords: "ustavna žalba, ustavni sud, ljudska prava, Strazbur",
    },
  },
];

export function getPosts(): BlogPost[] {
  if (typeof window === "undefined") return seedPosts;

  const version = localStorage.getItem(STORAGE_VERSION_KEY);
  if (version !== CURRENT_VERSION) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
    return seedPosts;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }
  return JSON.parse(stored);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getPublishedPosts(): BlogPost[] {
  return getPosts().filter((p) => p.status === "published");
}

export function getPost(id: string): BlogPost | undefined {
  return getPosts().find((p) => p.id === id);
}

export function savePost(post: BlogPost): void {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  if (index >= 0) {
    posts[index] = { ...post, updatedAt: new Date().toISOString() };
  } else {
    posts.unshift(post);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function deletePost(id: string): void {
  const posts = getPosts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[čć]/g, "c")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/[đ]/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
