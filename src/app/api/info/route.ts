import { db } from "@/lib/drizzle";
import { apiResponse } from "@/lib/utils";
import {
  jobs,
  users,
  userJobs,
  types,
  userWorks,
} from "@/lib/database-schema";
import { InfoModel } from "@/types/models";
import { count, eq, desc } from "drizzle-orm";
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
      .select({ photoUrl: users.photoUrl, name: users.name })
      .from(users)
      .where(eq(users.id, superUser.userId));

    if (!user) {
      return NextResponse.json(apiResponse.error("Pengguna tidak ditemukan"), {
        status: 404,
      });
    }

    const jobsData = await db
      .select({
        name: jobs.name,
        yearsOfExperience: userJobs.yearsOfExperience,
      })
      .from(userJobs)
      .innerJoin(jobs, eq(userJobs.jobId, jobs.id))
      .where(eq(userJobs.userId, superUser.userId));

    const workTypesData = await db
      .select({
        name: types.name,
        total: count(userWorks.workId),
      })
      .from(types)
      .leftJoin(userWorks, eq(userWorks.typeId, types.id))
      .groupBy(types.name)
      .orderBy(desc(count(userWorks.workId)));

    const result: InfoModel = {
      user: {
        name: user.name,
        photoUrl: user.photoUrl,
      },
      types: workTypesData,
      jobs: jobsData,
    };

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
