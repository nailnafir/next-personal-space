import { articleViews } from "@/lib/schema/database-schema";
import { viewSchema } from "@/lib/schema/form-schema";
import { db } from "@/lib/service/drizzle";
import { apiResponse, decodeId } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = viewSchema.parse(body);

    const decodedId = decodeId(parsed.articleId);
    const resultArticleId = Number(decodedId);

    if (!resultArticleId) {
      return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
        status: 400,
      });
    }

    const userId = parsed.authorId;

    const insertedViews = await db.insert(articleViews).values({
      userId: userId,
      articleId: resultArticleId,
    });

    return NextResponse.json(apiResponse.ok(insertedViews));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
