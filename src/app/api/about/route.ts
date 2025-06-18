import { db } from "@/lib/drizzle";
import { apiResponse } from "@/lib/utils";
import {
  interests,
  socials,
  userInterests,
  userSocials,
  users,
} from "@/lib/database-schema";
import { AboutModel } from "@/types/models";
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
      .select({ about: users.about })
      .from(users)
      .where(eq(users.id, superUser.userId));

    if (!user) {
      return NextResponse.json(apiResponse.error("Pengguna tidak ditemukan"), {
        status: 404,
      });
    }

    const socialsData = await db
      .select({
        platform: socials.platform,
        url: socials.url,
        iconUrl: socials.iconUrl,
        username: userSocials.username,
      })
      .from(userSocials)
      .innerJoin(socials, eq(userSocials.socialId, socials.id))
      .where(eq(userSocials.userId, superUser.userId));

    const interestsData = await db
      .select({
        name: interests.name,
      })
      .from(userInterests)
      .innerJoin(interests, eq(userInterests.interestId, interests.id))
      .where(eq(userInterests.userId, superUser.userId));

    const result: AboutModel = {
      user: {
        about: user.about,
      },
      socials: socialsData,
      interests: interestsData,
    };

    return NextResponse.json(apiResponse.ok(result));
  } catch (error) {
    return NextResponse.json(apiResponse.error("Server ada masalah: ", error), {
      status: 500,
    });
  }
}
