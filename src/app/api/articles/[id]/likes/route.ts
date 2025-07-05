import { likeSchema } from "@/lib/schema/form-schema";
import { db } from "@/lib/service/drizzle";
import { apiResponse, decodeId } from "@/lib/utils";
import { LikeItemResponse } from "@/model/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = likeSchema.parse(body);

    const decodedId = decodeId(parsed.articleId);
    const resultArticleId = Number(decodedId);

    let likedByUser = false;

    if (!resultArticleId) {
      return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
        status: 400,
      });
    }

    const likes = await db.query.articleLikes.findMany();

    const userId = parsed.authorId;

    if (userId) {
      const existing = await db.query.articleLikes.findFirst({
        where: (item, { eq, and }) =>
          and(eq(item.userId, userId), eq(item.articleId, resultArticleId)),
      });

      likedByUser = !!existing;
    }

    const result: LikeItemResponse = {
      likedByUser: likedByUser,
      totalLikes: likes.length,
    };

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    console.error("WADUUUUUHHH ERROR BRE: ", error)
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
