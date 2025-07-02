import { articles } from "@/lib/schema/database-schema";
import { db } from "@/lib/service/drizzle";
import { apiResponse, decodeId } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 8gwKVKBkdOpQ
  const { id } = await params;

  const decodedId = decodeId(id);
  const resultId = Number(decodedId);

  if (!resultId) {
    return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
      status: 400,
    });
  }

  try {
    const updateResult = await db
      .update(articles)
      .set({
        views: sql`${articles.views} + 1`,
      })
      .where(eq(articles.id, resultId))
      .returning({ updated: articles.id });

    if (updateResult.length === 0) {
      return NextResponse.json(apiResponse.error("Artikel tidak ditemukan"), {
        status: 404,
      });
    }

    return NextResponse.json(apiResponse.ok("Total dibaca diperbarui"));
  } catch (error) {
    console.error("Gagal update views:", error);
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
