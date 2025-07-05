import { db } from "@/lib/service/drizzle";
import { apiResponse, decodeId } from "@/lib/utils";
import { CommentsResponse } from "@/model/models";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resultId = decodeId(id);

    if (!resultId) {
      return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
        status: 400,
      });
    }

    const comments = await db.query.articleComments.findMany({
      where: (comment, { eq }) => eq(comment.articleId, resultId),
      with: {
        user: {
          columns: {
            name: true,
            photoUrl: true,
          },
        },
      },
      orderBy: (comment, { desc }) => [desc(comment.createdAt)],
    });

    const result: CommentsResponse = {
      comments: comments.map((comment) => ({
        content: comment.content,
        createdAt: comment.createdAt?.toISOString(),
        author: {
          name: comment.user?.name || null,
          photoUrl: comment.user?.photoUrl || null,
        },
      })),
      totalComments: comments.length,
    };

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
