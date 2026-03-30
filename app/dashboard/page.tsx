"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/dashboard/AuthGuard";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { getPosts, type BlogPost } from "@/lib/blog";
import { FileText, Eye, FilePenLine } from "lucide-react";

export default function DashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  const stats = [
    {
      label: "Ukupno postova",
      value: posts.length,
      icon: FileText,
    },
    {
      label: "Objavljeno",
      value: published,
      icon: Eye,
    },
    {
      label: "Nacrti",
      value: drafts,
      icon: FilePenLine,
    },
  ];

  return (
    <AuthGuard>
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-8">Pregled</h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-surface border border-border rounded-[var(--radius-lg)] p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-muted text-sm">{label}</span>
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-3xl font-bold text-text-primary">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Poslednji postovi
          </h2>
          <div className="bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">
                    Naslov
                  </th>
                  <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">
                    Datum
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.slice(0, 5).map((post) => (
                  <tr key={post.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-text-primary text-sm">
                      {post.translations["sr-Latn"].title}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
