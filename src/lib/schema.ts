import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  job: varchar("job", { length: 255 }).notNull(),
  about: varchar("about", { length: 255 }).notNull(),
  story: varchar("story", { length: 255 }).notNull(),
  interest: varchar("interest", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const socials = pgTable("socials", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  platform: varchar("platform", { length: 50 }).notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  iconUrl: text("icon_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workTools = pgTable("work_tools", {
  id: serial("id").primaryKey(),
  workId: integer("work_id").references(() => works.id, {
    onDelete: "cascade",
  }),
  toolId: integer("tool_id").references(() => tools.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 255 }).notNull(),
  iconUrl: text("icon_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skillTools = pgTable("skill_tools", {
  id: serial("id").primaryKey(),
  skillId: integer("skill_id").references(() => skills.id, {
    onDelete: "cascade",
  }),
  toolId: integer("tool_id").references(() => tools.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
