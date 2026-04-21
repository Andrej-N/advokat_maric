"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { BlogEditor } from "@/components/dashboard/BlogEditor";
import type { BlogPost } from "@/lib/blog-db";

export function EditBlogPostClient() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${params.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setPost(data))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Izmeni post</h1>
        {loading ? (
          <div className="text-text-muted">Učitavanje...</div>
        ) : post ? (
          <BlogEditor post={post} />
        ) : (
          <div className="text-text-muted">Post nije pronađen.</div>
        )}
      </main>
    </div>
  );
}
