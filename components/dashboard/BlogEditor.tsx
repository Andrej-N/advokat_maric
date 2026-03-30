"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  savePost,
  generateId,
  slugify,
  type BlogPost,
} from "@/lib/blog";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Link as LinkIcon,
  Save,
  Eye,
} from "lucide-react";

const localeLabels: Record<string, string> = {
  "sr-Latn": "Latinica",
  sr: "Ћирилица",
  en: "English",
};

interface Props {
  post?: BlogPost;
}

export function BlogEditor({ post }: Props) {
  const router = useRouter();
  const isEdit = !!post;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [activeLocale, setActiveLocale] = useState<string>("sr-Latn");
  const [slug, setSlug] = useState(post?.slug || "");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status || "draft"
  );

  const [translations, setTranslations] = useState(
    post?.translations || {
      "sr-Latn": { title: "", excerpt: "", content: "" },
      sr: { title: "", excerpt: "", content: "" },
      en: { title: "", excerpt: "", content: "" },
    }
  );

  const [seo, setSeo] = useState(
    post?.seo || { metaTitle: "", metaDescription: "", keywords: "" }
  );

  function switchLocale(locale: string) {
    setActiveLocale(locale);
  }

  function updateField(field: "title" | "excerpt" | "content", value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLocale]: {
        ...prev[activeLocale as keyof typeof prev],
        [field]: value,
      },
    }));

    if (field === "title" && activeLocale === "sr-Latn" && !isEdit) {
      setSlug(slugify(value));
    }
  }

  function insertTag(openTag: string, closeTag: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const content = currentTranslation?.content || "";
    const selected = content.substring(start, end);

    const newContent =
      content.substring(0, start) +
      openTag +
      selected +
      closeTag +
      content.substring(end);

    updateField("content", newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + openTag.length;
      textarea.selectionEnd = start + openTag.length + selected.length;
    }, 0);
  }

  function handleSave() {
    const now = new Date().toISOString();
    const blogPost: BlogPost = {
      id: post?.id || generateId(),
      slug,
      status,
      createdAt: post?.createdAt || now,
      updatedAt: now,
      publishedAt: status === "published" ? now : post?.publishedAt || null,
      translations: translations as BlogPost["translations"],
      seo,
    };

    savePost(blogPost);
    router.push("/dashboard/blog");
  }

  const currentTranslation =
    translations[activeLocale as keyof typeof translations];

  return (
    <div className="space-y-6">
      {/* Locale tabs */}
      <div className="flex gap-1 bg-primary rounded-[var(--radius-md)] p-1 w-fit">
        {Object.entries(localeLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => switchLocale(key)}
            className={`cursor-pointer px-4 py-2 text-sm rounded-[var(--radius-sm)] transition-colors ${
              activeLocale === key
                ? "bg-accent text-white"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Title */}
      <div>
        <label className="block text-text-muted text-sm mb-1.5">Naslov</label>
        <input
          type="text"
          value={currentTranslation?.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-lg placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
          placeholder="Naslov blog posta"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-text-muted text-sm mb-1.5">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary font-mono text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
          placeholder="url-slug-posta"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-text-muted text-sm mb-1.5">
          Kratak opis (excerpt)
        </label>
        <textarea
          value={currentTranslation?.excerpt || ""}
          onChange={(e) => updateField("excerpt", e.target.value)}
          rows={2}
          className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Kratak opis za pregled i SEO"
        />
      </div>

      {/* Content editor with toolbar */}
      <div>
        <label className="block text-text-muted text-sm mb-1.5">Sadržaj</label>
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-1 px-2 py-2 bg-primary-light border-b border-border flex-wrap">
            <ToolbarBtn
              onClick={() => insertTag("<strong>", "</strong>")}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => insertTag("<em>", "</em>")}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </ToolbarBtn>
            <div className="w-px h-5 bg-border mx-1" />
            <ToolbarBtn
              onClick={() => insertTag("<h2>", "</h2>\n")}
              title="Heading"
            >
              <Heading2 className="w-4 h-4" />
            </ToolbarBtn>
            <div className="w-px h-5 bg-border mx-1" />
            <ToolbarBtn
              onClick={() => insertTag("<ul>\n<li>", "</li>\n</ul>\n")}
              title="Lista"
            >
              <List className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => insertTag("<ol>\n<li>", "</li>\n</ol>\n")}
              title="Numerisana lista"
            >
              <ListOrdered className="w-4 h-4" />
            </ToolbarBtn>
            <div className="w-px h-5 bg-border mx-1" />
            <ToolbarBtn
              onClick={() => {
                const url = prompt("URL linka:");
                if (url) insertTag(`<a href="${url}">`, "</a>");
              }}
              title="Link"
            >
              <LinkIcon className="w-4 h-4" />
            </ToolbarBtn>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={currentTranslation?.content || ""}
            onChange={(e) => updateField("content", e.target.value)}
            rows={15}
            className="w-full bg-primary px-4 py-3 text-text-primary placeholder:text-text-dim focus:outline-none resize-y min-h-[300px] font-mono text-sm leading-relaxed"
            placeholder="Pišite sadržaj ovde... Možete koristiti HTML tagove ili će se u produkciji zameniti WYSIWYG editorom."
          />
        </div>
        <p className="text-text-dim text-xs mt-2">
          Podržava HTML formatiranje. U produkciji će biti zamenjen vizuelnim editorom (TipTap WYSIWYG).
        </p>
      </div>

      {/* SEO */}
      <details className="bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden">
        <summary className="px-4 py-3 text-text-primary text-sm font-medium cursor-pointer hover:bg-primary-light transition-colors">
          SEO podešavanja
        </summary>
        <div className="p-4 space-y-4 border-t border-border">
          <div>
            <label className="block text-text-muted text-sm mb-1.5">
              Meta naslov
            </label>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) =>
                setSeo((prev) => ({ ...prev, metaTitle: e.target.value }))
              }
              className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
              placeholder="SEO naslov (ostavi prazno za automatski)"
            />
          </div>
          <div>
            <label className="block text-text-muted text-sm mb-1.5">
              Meta opis
            </label>
            <textarea
              value={seo.metaDescription}
              onChange={(e) =>
                setSeo((prev) => ({
                  ...prev,
                  metaDescription: e.target.value,
                }))
              }
              rows={2}
              className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Meta opis za Google rezultate (max 160 karaktera)"
            />
          </div>
          <div>
            <label className="block text-text-muted text-sm mb-1.5">
              Ključne reči
            </label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) =>
                setSeo((prev) => ({ ...prev, keywords: e.target.value }))
              }
              className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
              placeholder="radno pravo, zaposleni, srbija (razdvojeno zarezom)"
            />
          </div>
        </div>
      </details>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="cursor-pointer inline-flex items-center gap-2 bg-accent hover:bg-accent-dim text-white px-6 py-2.5 rounded-[var(--radius-md)] font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Sačuvaj
        </button>
        <button
          onClick={() => {
            setStatus(status === "published" ? "draft" : "published");
          }}
          className={`cursor-pointer inline-flex items-center gap-2 border px-6 py-2.5 rounded-[var(--radius-md)] font-medium transition-colors ${
            status === "published"
              ? "border-green-500/40 text-green-400 hover:bg-green-500/10"
              : "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
          }`}
        >
          <Eye className="w-4 h-4" />
          {status === "published" ? "Objavljeno" : "Nacrt"}
        </button>
      </div>
    </div>
  );
}

function ToolbarBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="cursor-pointer p-2 rounded-[var(--radius-sm)] text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
    >
      {children}
    </button>
  );
}
