import { viewSchema } from "@/lib/schema/form-schema";
import { db } from "@/lib/service/drizzle";
import { apiResponse, decodeId } from "@/lib/utils";
import { ViewItemResponse } from "@/model/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = viewSchema.parse(body);

    const decodedId = decodeId(parsed.articleId);
    const resultArticleId = Number(decodedId);

    let viewedByUser = false;

    if (!resultArticleId) {
      return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
        status: 400,
      });
    }

    const views = await db.query.articleViews.findMany();

    const userId = parsed.authorId;

    if (userId) {
      const existing = await db.query.articleViews.findFirst({
        where: (item, { eq, and }) =>
          and(eq(item.userId, userId), eq(item.articleId, resultArticleId)),
      });

      viewedByUser = !!existing;
    }

    const result: ViewItemResponse = {
      viewedByUser: viewedByUser,
      totalViews: views.length,
    };

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
