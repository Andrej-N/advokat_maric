"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import type { BlogPost } from "@/lib/blog-db";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/blog");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Da li ste sigurni da želite da obrišete ovaj post?")) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  async function toggleStatus(post: BlogPost) {
    const nextStatus = post.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: post.slug,
        status: nextStatus,
        image: post.image,
        category: post.category,
        serviceKey: post.serviceKey,
        translations: post.translations,
        seo: post.seo,
      }),
    });
    if (res.ok) load();
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Blog postovi</h1>
          <Link
            href="/dashboard/blog/new"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dim text-white px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Novi post
          </Link>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">
                  Naslov
                </th>
                <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">
                  Slug
                </th>
                <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">
                  Datum
                </th>
                <th className="text-right px-4 py-3 text-text-muted text-sm font-medium">
                  Akcije
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-text-primary text-sm">
                    {post.translations["sr-Latn"].title}
                  </td>
                  <td className="px-4 py-3 text-text-dim text-sm font-mono">
                    {post.slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-[var(--radius-full)] ${
                        post.status === "published"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {post.status === "published" ? "Objavljeno" : "Nacrt"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-sm">
                    {new Date(post.createdAt).toLocaleDateString("sr-Latn-RS")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(post)}
                        className="cursor-pointer p-2 text-text-muted hover:text-accent rounded-[var(--radius-sm)] hover:bg-accent/10 transition-colors"
                        title={post.status === "published" ? "Vrati u nacrt" : "Objavi"}
                      >
                        {post.status === "published" ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <Link
                        href={`/dashboard/blog/${post.id}/edit`}
                        className="p-2 text-text-muted hover:text-accent rounded-[var(--radius-sm)] hover:bg-accent/10 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="cursor-pointer p-2 text-text-muted hover:text-red-400 rounded-[var(--radius-sm)] hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                    Nema blog postova. Kreirajte prvi post.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                    Učitavanje...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
