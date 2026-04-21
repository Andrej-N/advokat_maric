import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createPost, getAllPosts, getPublishedPosts, type UpsertPostInput } from "@/lib/blog-db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  if (status === "published") {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  }

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as UpsertPostInput;
  const userId = (session.user as { id: string }).id;
  const post = await createPost(userId, body);

  revalidatePath("/blog");
  revalidatePath("/sr/blog");
  revalidatePath("/en/blog");
  if (post.status === "published") {
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath(`/sr/blog/${post.slug}`);
    revalidatePath(`/en/blog/${post.slug}`);
  }

  return NextResponse.json(post);
}
