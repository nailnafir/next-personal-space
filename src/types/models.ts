import { ParamValue } from "next/dist/server/request/params";

export enum WorkStatusEnum {
  Pending = "pending",
  Completed = "completed",
  Draft = "draft",
  Published = "published",
  Archived = "archived",
  Scheduled = "scheduled",
}

export type SuccessResponse<T> = {
  status: "success";
  message?: string;
  data: T;
};

export type FailedResponse = {
  status: "failed";
  message: string;
  error?: unknown;
};

export type ApiResult<T> = SuccessResponse<T> | FailedResponse;

export type JobItemModel = {
  name: string;
};

export type InterestItemModel = {
  name: string;
};

export type WorkCategoryItemModel = {
  name: string;
};

export type WorkTypeItemModel = {
  name: string;
  total?: number | null;
};

export type TagItemModel = {
  name: string;
};

export interface SendCommentPayload {
  articleId: ParamValue;
  content: string;
  authorId?: number | null;
}

export type CommentItemModel = {
  content: string;
  createdAt?: string | null;
  author?: AuthorItemModel | null;
};

export type AuthorItemModel = {
  id?: number | null;
  name?: string | null;
  photoUrl?: string | null;
};

export type ArticleContentModel = {
  title: string;
  content: Array<
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
    | { type: "code"; language: string; code: string }
    | { type: "image"; url: string; alt?: string }
  >;
}[];

export type ArticleItemModel = {
  title?: string | null;
  subtitle?: string | null;
  content: ArticleContentModel;
  views?: number | null;
  likes?: number | null;
  thumbnailUrl?: string | null;
  status?: WorkStatusEnum | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  author?: AuthorItemModel | null;
  tags?: TagItemModel[] | null;
  comments?: CommentItemModel[] | null;
};

export interface ArticlesModel {
  articles: ArticleItemModel[];
}

export type UserItemModel = {
  name?: string | null;
  photoUrl?: string | null;
  about?: string | null;
  story?: string | null;
};

export type SocialItemModel = {
  platform: string;
  baseUrl?: string | null;
  urlPrefix?: string | null;
  iconUrl?: string | null;
  username: string;
};

export type ToolItemModel = {
  name: string;
  url?: string | null;
  iconUrl?: string | null;
};

export type WorkItemModel = {
  title: string;
  description: string;
  imageUrl: string;
  url?: string | null;
};

export interface WorksModel {
  works: WorkItemModel;
  category?: WorkCategoryItemModel | null;
  type?: WorkTypeItemModel | null;
  tools?: ToolItemModel[] | null;
}

export interface SkillsModel {
  user: UserItemModel;
  tools: ToolItemModel[];
}

export interface AboutModel {
  user: UserItemModel;
  socials: SocialItemModel[];
  interests?: InterestItemModel[] | null;
}

export interface InfoModel {
  user: UserItemModel;
  types: WorkTypeItemModel[];
  jobs: JobItemModel[];
}
