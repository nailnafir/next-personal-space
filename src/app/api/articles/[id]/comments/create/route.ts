import { db } from "@/lib/service/drizzle";
import { articleComments } from "@/lib/schema/database-schema";
import { NextResponse } from "next/server";
import { commentSchema } from "@/lib/schema/form-schema";
import { apiResponse, decodeId } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = commentSchema.parse(body);

    const decodedId = decodeId(parsed.articleId);
    const resultArticleId = Number(decodedId);

    if (!resultArticleId) {
      return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
        status: 400,
      });
    }

    const insertedComment = await db
      .insert(articleComments)
      .values({
        articleId: resultArticleId,
        content: parsed.content,
        userId: parsed.authorId,
      })

    return NextResponse.json(apiResponse.ok(insertedComment));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
