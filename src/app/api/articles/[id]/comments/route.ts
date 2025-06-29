import { db } from "@/lib/network/drizzle";
import { apiResponse, decodeId } from "@/lib/utils";
import { CommentItemModel } from "@/types/models";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const resultId = decodeId(id);

    if (!resultId) {
      return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
        status: 400,
      });
    }

    const comments = await db.query.comments.findMany({
      where: (comment, { eq }) => eq(comment.articleId, resultId),
      with: {
        author: {
          columns: {
            name: true,
            photoUrl: true,
          },
        },
      },
      orderBy: (comment, { desc }) => [desc(comment.createdAt)],
    });

    const result: CommentItemModel[] = comments.map((comment) => ({
      content: comment.content,
      createdAt: comment.createdAt?.toISOString(),
      author: {
        name: comment.author?.name || null,
        photoUrl: comment.author?.photoUrl || null,
      },
    }));

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
