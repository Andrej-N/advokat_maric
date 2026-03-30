import { EditBlogPostClient } from "./EditBlogPostClient";

// Static export: pre-render pages for seed posts
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function EditBlogPostPage() {
  return <EditBlogPostClient />;
}
