import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/database-schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
