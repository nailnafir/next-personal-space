import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  primaryKey,
  pgEnum,
  boolean,
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
    description: varchar("description", { length: 255 }),
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
  base_url: text("base_url").notNull(),
  urlPrefix: text("url_prefix"),
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
    description: varchar("description", { length: 255 }),
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
  url: text("url"),
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

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const articleTags = pgTable(
  "article_tags",
  {
    articleId: integer("article_id")
      .references(() => articles.id, { onDelete: "cascade" })
      .notNull(),
    tagId: integer("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.articleId, table.tagId] }),
  })
);

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: varchar("subtitle", { length: 300 }).notNull(),
  content: text("content").notNull(),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  thumbnailUrl: text("thumbnail_url"),
  authorId: integer("author_id").references(() => users.id, {
    onDelete: "set null",
  }),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id")
    .references(() => articles.id, { onDelete: "cascade" })
    .notNull(),
  authorId: integer("author_id").references(() => users.id, {
    onDelete: "set null",
  }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  interests: many(userInterests),
  jobs: many(userJobs),
  socials: many(userSocials),
  skills: many(userSkills),
  works: many(userWorks),
  articles: many(articles),
  comments: many(comments),
}));

export const interestsRelations = relations(interests, ({ many }) => ({
  users: many(userInterests),
}));

export const userInterestsRelations = relations(userInterests, ({ one }) => ({
  user: one(users, { fields: [userInterests.userId], references: [users.id] }),
  interest: one(interests, {
    fields: [userInterests.interestId],
    references: [interests.id],
  }),
}));

export const jobsRelations = relations(jobs, ({ many }) => ({
  users: many(userJobs),
}));

export const userJobsRelations = relations(userJobs, ({ one }) => ({
  user: one(users, { fields: [userJobs.userId], references: [users.id] }),
  job: one(jobs, { fields: [userJobs.jobId], references: [jobs.id] }),
}));

export const socialsRelations = relations(socials, ({ many }) => ({
  users: many(userSocials),
}));

export const userSocialsRelations = relations(userSocials, ({ one }) => ({
  user: one(users, { fields: [userSocials.userId], references: [users.id] }),
  social: one(socials, {
    fields: [userSocials.socialId],
    references: [socials.id],
  }),
}));

export const toolsRelations = relations(tools, ({ many }) => ({
  userSkills: many(userSkills),
  workTools: many(workTools),
}));

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, { fields: [userSkills.userId], references: [users.id] }),
  tool: one(tools, { fields: [userSkills.toolId], references: [tools.id] }),
}));

export const worksRelations = relations(works, ({ many }) => ({
  users: many(userWorks),
  tools: many(workTools),
}));

export const userWorksRelations = relations(userWorks, ({ one }) => ({
  user: one(users, { fields: [userWorks.userId], references: [users.id] }),
  work: one(works, { fields: [userWorks.workId], references: [works.id] }),
  type: one(types, { fields: [userWorks.typeId], references: [types.id] }),
  category: one(categories, {
    fields: [userWorks.categoryId],
    references: [categories.id],
  }),
}));

export const workToolsRelations = relations(workTools, ({ one }) => ({
  work: one(works, { fields: [workTools.workId], references: [works.id] }),
  tool: one(tools, { fields: [workTools.toolId], references: [tools.id] }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  userWorks: many(userWorks),
}));

export const typesRelations = relations(types, ({ many }) => ({
  userWorks: many(userWorks),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  articleTags: many(articleTags),
}));

export const articleTagsRelations = relations(articleTags, ({ one }) => ({
  article: one(articles, {
    fields: [articleTags.articleId],
    references: [articles.id],
  }),
  tag: one(tags, {
    fields: [articleTags.tagId],
    references: [tags.id],
  }),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, { fields: [articles.authorId], references: [users.id] }),
  tags: many(articleTags),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  article: one(articles, {
    fields: [comments.articleId],
    references: [articles.id],
  }),
  author: one(users, { fields: [comments.authorId], references: [users.id] }),
}));
