import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "super-user"]);

export const statusEnum = pgEnum("status", ["pending", "completed"]);

export const levelEnum = pgEnum("level", [
  "beginner",
  "intermediate",
  "expert",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  photoUrl: text("photo_url"),
  role: roleEnum("role").notNull().default("user"),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 25 }).notNull().unique(),
  about: text("about"),
  story: text("story"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const interests = pgTable("interests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userInterests = pgTable(
  "user_interests",
  {
    userId: integer("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    interestId: integer("interest_id")
      .references(() => interests.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.interestId] }),
  })
);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userJobs = pgTable(
  "user_jobs",
  {
    userId: integer("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    jobId: integer("job_id")
      .references(() => jobs.id, { onDelete: "cascade" })
      .notNull(),
    yearsOfExperience: integer("years_of_experience"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.jobId] }),
  })
);

export const socials = pgTable("socials", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(),
  url: text("url").notNull(),
  iconUrl: text("icon_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userSocials = pgTable(
  "user_socials",
  {
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    socialId: integer("social_id")
      .references(() => socials.id, {
        onDelete: "cascade",
      })
      .notNull(),
    username: varchar("username", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.socialId] }),
  })
);

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  url: text("url"),
  iconUrl: text("icon_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userSkills = pgTable(
  "user_skills",
  {
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    toolId: integer("tool_id")
      .references(() => tools.id, {
        onDelete: "cascade",
      })
      .notNull(),
    level: levelEnum("level").notNull().default("beginner"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.toolId] }),
  })
);

export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userWorks = pgTable(
  "user_works",
  {
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    workId: integer("work_id")
      .references(() => works.id, {
        onDelete: "cascade",
      })
      .notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id, {
        onDelete: "cascade",
      })
      .notNull(),
    typeId: integer("type_id")
      .references(() => types.id, {
        onDelete: "cascade",
      })
      .notNull(),
    durationInDays: integer("duration_in_days"),
    status: statusEnum("status").notNull().default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.workId, table.categoryId, table.typeId],
    }),
  })
);

export const workTools = pgTable(
  "work_tools",
  {
    workId: integer("work_id").references(() => works.id, {
      onDelete: "cascade",
    }),
    toolId: integer("tool_id").references(() => tools.id, {
      onDelete: "cascade",
    }),
    version: varchar("version", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.workId, table.toolId] }),
  })
);

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const types = pgTable("types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
