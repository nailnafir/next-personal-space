import { db } from "@/lib/service/drizzle";
import { apiResponse, decodeId } from "@/lib/utils";
import { NextResponse } from "next/server";
import {
  ArticleContentModel,
  ArticleItemResponse,
} from "@/model/models";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 8gwKVKBkdOpQ
    const { id } = await params;
    const resultId = decodeId(id);

    if (!resultId) {
      return NextResponse.json(apiResponse.error("Kode artikel tidak valid"), {
        status: 400,
      });
    }

    const article = await db.query.articles.findFirst({
      where: (article, { eq }) => eq(article.id, resultId),
      with: {
        work: {
          columns: {
            title: true,
            description: true,
            imageUrl: true,
          },
          with: {
            users: {
              columns: {
                status: true,
              },
              with: {
                user: {
                  columns: {
                    name: true,
                    photoUrl: true,
                  },
                },
              },
            },
          },
        },
        tags: {
          with: {
            tag: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(apiResponse.error("Artikel tidak ditemukan"), {
        status: 404,
      });
    }

    const result: ArticleItemResponse = {
      title: article?.work?.title,
      subtitle: article?.work?.description,
      thumbnailUrl: article?.work?.imageUrl,
      content: article?.content as ArticleContentModel,
      views: article?.views,
      likes: article?.likes,
      status: article?.work?.users?.[0]?.status,
      publishedAt: article?.publishedAt?.toISOString(),
      createdAt: article?.createdAt?.toISOString(),
      updatedAt: article?.updatedAt?.toISOString(),
      author: {
        name: article?.work?.users?.[0]?.user?.name,
        photoUrl: article?.work?.users?.[0]?.user?.photoUrl,
      },
      tags:
        article?.tags.map((tagEntry) => ({
          name: tagEntry.tag.name,
        })) || null,
    };

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
