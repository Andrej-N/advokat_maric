"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AuthGuard } from "@/components/dashboard/AuthGuard";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { BlogEditor } from "@/components/dashboard/BlogEditor";
import { getPost, type BlogPost } from "@/lib/blog";

export default function EditBlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getPost(params.id as string);
    setPost(found);
    setLoading(false);
  }, [params.id]);

  return (
    <AuthGuard>
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-8">
            Izmeni post
          </h1>
          {loading ? (
            <div className="text-text-muted">Učitavanje...</div>
          ) : post ? (
            <BlogEditor post={post} />
          ) : (
            <div className="text-text-muted">Post nije pronađen.</div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
