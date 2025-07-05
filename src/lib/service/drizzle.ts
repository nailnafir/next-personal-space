import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../schema/database-schema";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL || "", { ssl: "require" });
export const db = drizzle(client, { schema });
