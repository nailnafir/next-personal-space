import { db } from "@/lib/service/drizzle";
import { apiResponse } from "@/lib/utils";
import { tools, users, userSkills } from "@/lib/schema/database-schema";
import { SkillsResponse } from "@/model/models";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [superUser] = await db
      .select({
        userId: users.id,
      })
      .from(users)
      .where(eq(users.role, "super-user"));

    const [user] = await db
      .select({ story: users.story })
      .from(users)
      .where(eq(users.id, superUser.userId));

    if (!user) {
      return NextResponse.json(apiResponse.error("Pengguna tidak ditemukan"), {
        status: 404,
      });
    }

    const toolsData = await db
      .select({
        name: tools.name,
        iconUrl: tools.iconUrl,
        url: tools.url,
      })
      .from(userSkills)
      .innerJoin(tools, eq(userSkills.toolId, tools.id))
      .where(eq(userSkills.userId, superUser.userId));

    const result: SkillsResponse = {
      user: {
        story: user.story,
      },
      tools: toolsData,
    };

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
