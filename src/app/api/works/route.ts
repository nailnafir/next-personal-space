import { db } from "@/lib/drizzle";
import {
  categories,
  tools,
  types,
  userWorks,
  works,
  workTools,
} from "@/lib/database-schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { WorksModel, ToolItemModel } from "@/types/models";
import { apiResponse } from "@/lib/utils";

export async function GET() {
  try {
    const worksDetailsData = await db
      .select({
        workId: userWorks.workId,
        title: works.title,
        description: works.description,
        imageUrl: works.imageUrl,
        url: works.url,
        categoryName: categories.name,
        typeName: types.name,
      })
      .from(userWorks)
      .innerJoin(works, eq(userWorks.workId, works.id))
      .innerJoin(categories, eq(userWorks.categoryId, categories.id))
      .innerJoin(types, eq(userWorks.typeId, types.id));

    const workToolsData = await db
      .select({
        workId: workTools.workId,
        name: tools.name,
        url: tools.url,
        iconUrl: tools.iconUrl,
      })
      .from(workTools)
      .innerJoin(tools, eq(workTools.toolId, tools.id));

    const groupedTools = workToolsData.reduce<Record<number, ToolItemModel[]>>(
      (acc, tool) => {
        if (tool.workId === null) return acc;

        if (!acc[tool.workId]) acc[tool.workId] = [];
        acc[tool.workId].push({
          name: tool.name,
          url: tool.url,
          iconUrl: tool.iconUrl,
        });
        return acc;
      },
      {}
    );

    const result: WorksModel[] = worksDetailsData.map((work) => ({
      works: {
        title: work.title,
        description: work.description,
        imageUrl: work.imageUrl,
        url: work.url,
      },
      category: {
        name: work.categoryName,
      },
      type: {
        name: work.typeName,
      },
      tools: groupedTools[work.workId] || [],
    }));

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
