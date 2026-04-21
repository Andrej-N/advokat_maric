import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { deletePostById, getPostById, updatePost, type UpsertPostInput } from "@/lib/blog-db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (post.status !== "published") {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json()) as UpsertPostInput;
  const post = await updatePost(id, body);

  revalidatePath("/blog");
  revalidatePath("/sr/blog");
  revalidatePath("/en/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath(`/sr/blog/${post.slug}`);
  revalidatePath(`/en/blog/${post.slug}`);

  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getPostById(id);
  await deletePostById(id);

  revalidatePath("/blog");
  revalidatePath("/sr/blog");
  revalidatePath("/en/blog");
  if (existing) {
    revalidatePath(`/blog/${existing.slug}`);
    revalidatePath(`/sr/blog/${existing.slug}`);
    revalidatePath(`/en/blog/${existing.slug}`);
  }

  return NextResponse.json({ ok: true });
}
