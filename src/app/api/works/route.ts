import { db } from "@/lib/service/drizzle";
import {
  categories,
  tools,
  types,
  users,
  userWorks,
  works,
  workTools,
} from "@/lib/schema/database-schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { WorksResponse, ToolItemModel } from "@/model/models";
import { apiResponse } from "@/lib/utils";

export async function GET() {
  try {
    const [superUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.role, "super-user"));

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
      .leftJoin(categories, eq(userWorks.categoryId, categories.id))
      .leftJoin(types, eq(userWorks.typeId, types.id))
      .where(eq(userWorks.userId, superUser.id));

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

    const result: WorksResponse[] = worksDetailsData.map((work) => ({
      works: {
        title: work.title,
        description: work.description,
        imageUrl: work.imageUrl,
        url: work.url,
      },
      category: work.categoryName ? { name: work.categoryName } : null,
      type: work.typeName ? { name: work.typeName } : null,
      tools: groupedTools[work.workId] ? groupedTools[work.workId] : null,
    }));

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
