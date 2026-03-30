"use client";

import { AuthGuard } from "@/components/dashboard/AuthGuard";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { BlogEditor } from "@/components/dashboard/BlogEditor";

export default function NewBlogPostPage() {
  return (
    <AuthGuard>
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-8">
            Novi blog post
          </h1>
          <BlogEditor />
        </main>
      </div>
    </AuthGuard>
  );
}
