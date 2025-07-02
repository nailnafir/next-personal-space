import { db } from "@/lib/service/drizzle";
import { apiResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import {
  ArticleItemResponse,
  ArticleContentModel,
  ArticlesResponse,
  PaginationItemModel,
} from "@/model/models";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const offset = (page - 1) * limit;

    const [totalCountResult, articlesData] = await Promise.all([
      db.query.articles.findMany(),
      db.query.articles.findMany({
        limit,
        offset,
        orderBy: (articles, { desc }) => [desc(articles.publishedAt)],
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
              tag: {
                columns: {
                  name: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const totalCount = totalCountResult.length;

    const transformedArticles: ArticleItemResponse[] = articlesData.map(
      (article) => ({
        id: article?.id,
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
      })
    );

    const totalPages = Math.ceil(totalCount / limit);
    const pagination: PaginationItemModel = {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    const response: ArticlesResponse = {
      articles: transformedArticles,
      pagination,
    };

    return NextResponse.json(apiResponse.ok(response));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah", error), {
      status: 500,
    });
  }
}
