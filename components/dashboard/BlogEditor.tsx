"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { slugify, SERVICE_KEYS, type BlogPost } from "@/lib/blog-db";
import srLatnMessages from "@/messages/sr-Latn.json";
import srMessages from "@/messages/sr.json";
import enMessages from "@/messages/en.json";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Link as LinkIcon,
  Save,
  Eye,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";

const CATEGORIES = [
  "Krivično pravo",
  "Građansko pravo",
  "Porodično pravo",
  "Nasledno pravo",
  "Radno pravo",
  "Privredno pravo",
  "Upravno pravo",
  "Prekršajno pravo",
  "Obligaciono pravo",
  "Ugovori i nekretnine",
  "Ljudska prava",
  "Dijaspora",
  "Aktuelnosti",
] as const;

const SERVICE_LABELS: Record<string, string> = {
  civil: "Građansko pravo",
  familyAndInheritance: "Porodično i nasledno pravo",
  divorce: "Razvod braka",
  contractsAndRealEstate: "Ugovori i nekretnine",
  criminal: "Krivično pravo",
  commercial: "Privredno pravo",
  diaspora: "Dijaspora",
  administrative: "Upravno pravo",
  labor: "Radno pravo",
  misdemeanor: "Prekršajno pravo",
  humanRights: "Ljudska prava",
};

type ServiceMessages = Record<string, { title?: string; slug?: string }>;
const MESSAGES_BY_LOCALE: Record<string, ServiceMessages> = {
  "sr-Latn": (srLatnMessages as { services: ServiceMessages }).services,
  sr: (srMessages as { services: ServiceMessages }).services,
  en: (enMessages as { services: ServiceMessages }).services,
};

function getServiceLinkOptions(locale: string) {
  const m = MESSAGES_BY_LOCALE[locale];
  if (!m) return [];
  return SERVICE_KEYS.map((key) => ({
    key,
    title: m[key]?.title ?? key,
    slug: m[key]?.slug ?? "",
  })).filter((s) => s.slug);
}

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
  const [status, setStatus] = useState<"draft" | "published">(post?.status || "draft");
  const [image, setImage] = useState(post?.image || "");
  const [category, setCategory] = useState(post?.category || "");
  const [serviceKey, setServiceKey] = useState(post?.serviceKey || "");
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkMode, setLinkMode] = useState<"service" | "url">("service");
  const [linkServiceKey, setLinkServiceKey] = useState("");
  const [linkCustomUrl, setLinkCustomUrl] = useState("");
  const [linkSelection, setLinkSelection] = useState<{
    start: number;
    end: number;
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

  async function handleFile(file: File) {
    setImageError(null);
    if (!file.type.startsWith("image/")) {
      setImageError("Fajl mora biti slika.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError(
        `Slika je prevelika (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimum je 5MB.`,
      );
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Upload failed" }));
        setImageError(err.error || "Greška pri uploadu.");
        return;
      }
      const { url } = await res.json();
      setImage(url);
    } catch {
      setImageError("Greška pri uploadu.");
    } finally {
      setUploading(false);
    }
  }

  const [translations, setTranslations] = useState(
    post?.translations || {
      "sr-Latn": { title: "", excerpt: "", content: "" },
      sr: { title: "", excerpt: "", content: "" },
      en: { title: "", excerpt: "", content: "" },
    },
  );

  const [seo, setSeo] = useState(
    post?.seo || { metaTitle: "", metaDescription: "", keywords: "" },
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

  function openLinkModal() {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const content = currentTranslation?.content || "";
    setLinkSelection({ start, end, text: content.substring(start, end) });
    setLinkMode("service");
    setLinkServiceKey("");
    setLinkCustomUrl("");
    setLinkOpen(true);
  }

  function confirmLink() {
    if (!linkSelection) return;
    let href = "";
    if (linkMode === "service") {
      const opts = getServiceLinkOptions(activeLocale);
      const opt = opts.find((s) => s.key === linkServiceKey);
      if (!opt) return;
      href = `/${activeLocale}/pravna-pomoc/${opt.slug}`;
    } else {
      href = linkCustomUrl.trim();
      if (!href) return;
    }
    const { start, end } = linkSelection;
    const content = currentTranslation?.content || "";
    const selected = content.substring(start, end) || href;
    const openTag = `<a href="${href}">`;
    const closeTag = "</a>";
    const newContent =
      content.substring(0, start) +
      openTag +
      selected +
      closeTag +
      content.substring(end);
    updateField("content", newContent);
    setLinkOpen(false);
    setTimeout(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.focus();
      ta.selectionStart = start + openTag.length;
      ta.selectionEnd = start + openTag.length + selected.length;
    }, 0);
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      const body = {
        slug,
        status,
        image: image || null,
        category: category || null,
        serviceKey: serviceKey || null,
        translations,
        seo,
      };
      const url = isEdit ? `/api/blog/${post!.id}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Save failed" }));
        setSaveError(err.error || "Greška pri čuvanju.");
        return;
      }
      router.push("/dashboard/blog");
      router.refresh();
    } catch {
      setSaveError("Greška pri čuvanju.");
    } finally {
      setSaving(false);
    }
  }

  const currentTranslation = translations[activeLocale as keyof typeof translations];

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

      {/* Hero image */}
      <div>
        <label className="block text-text-muted text-sm mb-1.5">
          <span className="inline-flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            Hero slika
          </span>
        </label>

        {image ? (
          <div className="relative w-full max-w-md aspect-[16/9] rounded-[var(--radius-md)] overflow-hidden border border-border bg-primary-light group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setImage("");
                setImageError(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="cursor-pointer absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 transition-colors"
              title="Ukloni sliku"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer w-full max-w-md aspect-[16/9] rounded-[var(--radius-md)] border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
              isDragging
                ? "border-accent bg-accent/10"
                : "border-border bg-primary hover:border-accent/60 hover:bg-primary-light"
            }`}
          >
            <Upload className="w-8 h-8 text-text-muted" />
            <p className="text-text-primary text-sm font-medium">
              {uploading ? "Upload u toku..." : "Prevuci sliku ovde"}
            </p>
            <p className="text-text-dim text-xs">
              ili klikni da izabereš · max 5MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {imageError && <p className="text-red-400 text-xs mt-2">{imageError}</p>}

        <details className="mt-2">
          <summary className="text-text-dim text-xs cursor-pointer hover:text-text-muted">
            Ili unesi URL slike
          </summary>
          <input
            type="text"
            value={image.startsWith("data:") ? "" : image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-2 w-full max-w-md bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2 text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
            placeholder="https://..."
          />
        </details>
      </div>

      {/* Category + Service */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-text-muted text-sm mb-1.5">Kategorija</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
          >
            <option value="">— izaberi kategoriju —</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-text-muted text-sm mb-1.5">
            Link ka usluzi (CTA na kraju bloga)
          </label>
          <select
            value={serviceKey}
            onChange={(e) => setServiceKey(e.target.value)}
            className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
          >
            <option value="">— bez linka —</option>
            {SERVICE_KEYS.map((k) => (
              <option key={k} value={k}>
                {SERVICE_LABELS[k] || k}
              </option>
            ))}
          </select>
        </div>
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

      {/* Content editor */}
      <div>
        <label className="block text-text-muted text-sm mb-1.5">Sadržaj</label>
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <div className="flex items-center gap-1 px-2 py-2 bg-primary-light border-b border-border flex-wrap">
            <ToolbarBtn onClick={() => insertTag("<strong>", "</strong>")} title="Bold">
              <Bold className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => insertTag("<em>", "</em>")} title="Italic">
              <Italic className="w-4 h-4" />
            </ToolbarBtn>
            <div className="w-px h-5 bg-border mx-1" />
            <ToolbarBtn onClick={() => insertTag("<h2>", "</h2>\n")} title="Heading">
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
            <ToolbarBtn onClick={openLinkModal} title="Link">
              <LinkIcon className="w-4 h-4" />
            </ToolbarBtn>
          </div>

          <textarea
            ref={textareaRef}
            value={currentTranslation?.content || ""}
            onChange={(e) => updateField("content", e.target.value)}
            rows={15}
            className="w-full bg-primary px-4 py-3 text-text-primary placeholder:text-text-dim focus:outline-none resize-y min-h-[300px] font-mono text-sm leading-relaxed"
            placeholder="Pišite sadržaj ovde... Podrzava HTML tagove."
          />
        </div>
      </div>

      {/* SEO */}
      <details className="bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden">
        <summary className="px-4 py-3 text-text-primary text-sm font-medium cursor-pointer hover:bg-primary-light transition-colors">
          SEO podešavanja
        </summary>
        <div className="p-4 space-y-4 border-t border-border">
          <div>
            <label className="block text-text-muted text-sm mb-1.5">Meta naslov</label>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) => setSeo((prev) => ({ ...prev, metaTitle: e.target.value }))}
              className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
              placeholder="SEO naslov (ostavi prazno za automatski)"
            />
          </div>
          <div>
            <label className="block text-text-muted text-sm mb-1.5">Meta opis</label>
            <textarea
              value={seo.metaDescription}
              onChange={(e) =>
                setSeo((prev) => ({ ...prev, metaDescription: e.target.value }))
              }
              rows={2}
              className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Meta opis za Google rezultate (max 160 karaktera)"
            />
          </div>
          <div>
            <label className="block text-text-muted text-sm mb-1.5">Ključne reči</label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) => setSeo((prev) => ({ ...prev, keywords: e.target.value }))}
              className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
              placeholder="radno pravo, zaposleni, srbija (razdvojeno zarezom)"
            />
          </div>
        </div>
      </details>

      {saveError && (
        <div className="text-red-400 text-sm bg-red-400/10 rounded-[var(--radius-md)] px-4 py-3">
          {saveError}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="cursor-pointer inline-flex items-center gap-2 bg-accent hover:bg-accent-dim text-white px-6 py-2.5 rounded-[var(--radius-md)] font-medium transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Čuva se..." : "Sačuvaj"}
        </button>
        <button
          onClick={() => setStatus(status === "published" ? "draft" : "published")}
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

      {linkOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setLinkOpen(false)}
        >
          <div
            className="bg-surface border border-border rounded-[var(--radius-lg)] max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-text-primary text-lg font-medium">Ubaci link</h3>
              <button
                onClick={() => setLinkOpen(false)}
                className="cursor-pointer text-text-muted hover:text-text-primary"
                title="Zatvori"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {linkSelection?.text ? (
              <div className="text-text-muted text-sm mb-4">
                Linkovaće se tekst:{" "}
                <span className="text-text-primary font-medium">
                  „{linkSelection.text}"
                </span>
              </div>
            ) : (
              <div className="text-text-dim text-sm mb-4 italic">
                Nema izabranog teksta — link će prikazati sam URL.
              </div>
            )}

            <div className="space-y-3 mb-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={linkMode === "service"}
                  onChange={() => setLinkMode("service")}
                  className="mt-1.5 cursor-pointer accent-accent"
                />
                <div className="flex-1">
                  <div className="text-text-primary text-sm mb-1.5">Link ka usluzi</div>
                  <select
                    value={linkServiceKey}
                    onChange={(e) => {
                      setLinkServiceKey(e.target.value);
                      setLinkMode("service");
                    }}
                    className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">— izaberi uslugu —</option>
                    {getServiceLinkOptions(activeLocale).map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {linkServiceKey && (
                    <div className="text-text-dim text-xs mt-1.5 font-mono break-all">
                      /{activeLocale}/pravna-pomoc/
                      {
                        getServiceLinkOptions(activeLocale).find(
                          (s) => s.key === linkServiceKey,
                        )?.slug
                      }
                    </div>
                  )}
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={linkMode === "url"}
                  onChange={() => setLinkMode("url")}
                  className="mt-1.5 cursor-pointer accent-accent"
                />
                <div className="flex-1">
                  <div className="text-text-primary text-sm mb-1.5">Prilagođeni URL</div>
                  <input
                    type="text"
                    value={linkCustomUrl}
                    onChange={(e) => {
                      setLinkCustomUrl(e.target.value);
                      setLinkMode("url");
                    }}
                    placeholder="https://..."
                    className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-3 py-2 text-text-primary text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setLinkOpen(false)}
                className="cursor-pointer px-4 py-2 text-text-muted text-sm hover:text-text-primary transition-colors"
              >
                Otkaži
              </button>
              <button
                onClick={confirmLink}
                disabled={
                  linkMode === "service" ? !linkServiceKey : !linkCustomUrl.trim()
                }
                className="cursor-pointer bg-accent hover:bg-accent-dim text-white text-sm px-4 py-2 rounded-[var(--radius-md)] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ubaci link
              </button>
            </div>
          </div>
        </div>
      )}
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
