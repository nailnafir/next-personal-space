import { db } from "@/lib/network/drizzle";
import { comments } from "@/lib/schema/database-schema";
import { NextResponse } from "next/server";
import { commentSchema } from "@/lib/schema/form-schema";
import { apiResponse, decodeId } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = commentSchema.parse(body);

    const decodedId = decodeId(parsed.articleId);
    const resultId = Number(decodedId);

    const inserted = await db
      .insert(comments)
      .values({
        articleId: resultId,
        content: parsed.content,
        authorId: parsed.authorId,
      })
      .returning();

    return NextResponse.json(apiResponse.ok(inserted[0]));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
