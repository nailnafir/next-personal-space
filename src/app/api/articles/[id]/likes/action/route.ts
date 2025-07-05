import { articleLikes } from "@/lib/schema/database-schema";
import { likeSchema } from "@/lib/schema/form-schema";
import { db } from "@/lib/service/drizzle";
import { apiResponse, decodeId } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = likeSchema.parse(body);

    const decodedId = decodeId(parsed.articleId);
    const resultArticleId = Number(decodedId);

    if (!resultArticleId) {
      return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
        status: 400,
      });
    }

    const userId = parsed.authorId;

    if (userId) {
      const existingLike = await db.query.articleLikes.findFirst({
        where: (likes, { and, eq }) =>
          and(eq(likes.userId, userId), eq(likes.articleId, resultArticleId)),
      });

      if (existingLike) {
        const deletedLike = await db
          .delete(articleLikes)
          .where(
            and(
              eq(articleLikes.userId, userId),
              eq(articleLikes.articleId, resultArticleId)
            )
          );

        return NextResponse.json(apiResponse.ok(deletedLike));
      }
    }

    const insertedLike = await db.insert(articleLikes).values({
      userId: userId,
      articleId: resultArticleId,
    });

    return NextResponse.json(apiResponse.ok(insertedLike));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
