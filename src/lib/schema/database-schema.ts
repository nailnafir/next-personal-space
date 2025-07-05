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
  jsonb,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "super-user"]);

export const workStatusEnum = pgEnum("work_status", [
  "pending",
  "completed",
  "draft",
  "published",
  "archived",
  "scheduled",
]);

export const skillLevelEnum = pgEnum("skill_level", [
  "beginner",
  "intermediate",
  "expert",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  photoUrl: text("photo_url"),
  role: userRoleEnum("role").notNull().default("user"),
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
  baseUrl: text("base_url").notNull(),
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
    level: skillLevelEnum("level").notNull().default("beginner"),
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
    categoryId: integer("category_id").references(() => categories.id, {
      onDelete: "cascade",
    }),
    typeId: integer("type_id").references(() => types.id, {
      onDelete: "cascade",
    }),
    durationInDays: integer("duration_in_days"),
    status: workStatusEnum("status").notNull().default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.workId],
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
  content: jsonb("content").notNull(),
  workId: integer("work_id")
    .references(() => works.id, { onDelete: "cascade" })
    .notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const articleComments = pgTable("article_comments", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id")
    .references(() => articles.id, { onDelete: "cascade" })
    .notNull(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const articleLikes = pgTable("article_likes", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id")
    .references(() => articles.id, { onDelete: "cascade" })
    .notNull(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const articleViews = pgTable("article_views", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id")
    .references(() => articles.id, { onDelete: "cascade" })
    .notNull(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "set null",
  }),
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
  articleComments: many(articleComments),
  articleLikes: many(articleLikes),
  articleViews: many(articleViews),
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

export const worksRelations = relations(works, ({ many, one }) => ({
  users: many(userWorks),
  tools: many(workTools),
  article: one(articles, {
    fields: [works.id],
    references: [articles.workId],
  }),
}));

export const userWorksRelations = relations(userWorks, ({ one }) => ({
  user: one(users, {
    fields: [userWorks.userId],
    references: [users.id],
  }),
  work: one(works, {
    fields: [userWorks.workId],
    references: [works.id],
  }),
  type: one(types, {
    fields: [userWorks.typeId],
    references: [types.id],
  }),
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
  work: one(works, {
    fields: [articles.workId],
    references: [works.id],
  }),
  tags: many(articleTags),
  comments: many(articleComments),
  views: many(articleViews),
  likes: many(articleLikes),
}));

export const articleCommentsRelations = relations(
  articleComments,
  ({ one }) => ({
    user: one(users, {
      fields: [articleComments.userId],
      references: [users.id],
    }),
    article: one(articles, {
      fields: [articleComments.articleId],
      references: [articles.id],
    }),
  })
);

export const articleLikesRelations = relations(articleLikes, ({ one }) => ({
  user: one(users, {
    fields: [articleLikes.userId],
    references: [users.id],
  }),
  article: one(articles, {
    fields: [articleLikes.articleId],
    references: [articles.id],
  }),
}));

export const articleViewsRelations = relations(articleViews, ({ one }) => ({
  user: one(users, { fields: [articleViews.userId], references: [users.id] }),
  article: one(articles, {
    fields: [articleViews.articleId],
    references: [articles.id],
  }),
}));
