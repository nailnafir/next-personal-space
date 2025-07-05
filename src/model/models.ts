import { ParamValue } from "next/dist/server/request/params";

export type ArticleContentModel = {
  title: string;
  content: Array<
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
    | { type: "code"; language: string; code: string }
    | { type: "image"; url: string; alt?: string }
  >;
}[];

export type ApiResult<T> = SuccessResponse<T> | FailedResponse;

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

export interface JobItemModel {
  name: string;
}

export interface InterestItemModel {
  name: string;
}

export interface WorkCategoryItemModel {
  name: string;
}

export interface WorkTypeItemModel {
  name: string;
  total?: number | null;
}

export interface TagItemModel {
  name: string;
}

export interface PaginationItemModel {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ArticlesRequest {
  page: number;
  limit: number;
  status?:
    | "pending"
    | "completed"
    | "draft"
    | "published"
    | "archived"
    | "scheduled";
  search?: string | null;
  sortBy?:
    | "title"
    | "views"
    | "likes"
    | "publishedAt"
    | "updatedAt"
    | "createdAt"
    | "author";
  sortOrder?: "asc" | "desc";
}

export interface ArticlesResponse {
  articles: ArticleItemResponse[];
  pagination: PaginationItemModel;
}

export interface SendCommentRequest {
  articleId: ParamValue;
  content: string;
  authorId?: number | null;
}

export interface CommentsResponse {
  comments: CommentItemResponse[];
  totalComments: number;
}

export interface CommentItemResponse {
  content: string;
  createdAt?: string | null;
  author?: AuthorItemModel | null;
}

export interface LikeItemResponse {
  totalLikes: number;
  likedByUser: boolean;
}

export interface ViewItemResponse {
  totalViews: number;
  viewedByUser: boolean;
}

export interface AuthorItemModel {
  id?: number | null;
  name?: string | null;
  photoUrl?: string | null;
}

export interface ArticleItemResponse {
  id: number;
  title?: string | null;
  subtitle?: string | null;
  content: ArticleContentModel;
  thumbnailUrl?: string | null;
  status?:
    | "pending"
    | "completed"
    | "draft"
    | "published"
    | "archived"
    | "scheduled";
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  author?: AuthorItemModel | null;
  tags?: TagItemModel[] | null;
  comments?: CommentItemResponse[] | null;
}

export interface UserItemModel {
  name?: string | null;
  photoUrl?: string | null;
  about?: string | null;
  story?: string | null;
}

export interface SocialItemModel {
  platform: string;
  baseUrl?: string | null;
  urlPrefix?: string | null;
  iconUrl?: string | null;
  username: string;
}

export interface ToolItemModel {
  name: string;
  url?: string | null;
  iconUrl?: string | null;
}

export interface WorkItemModel {
  title: string;
  description: string;
  imageUrl: string;
  url?: string | null;
}

export interface WorksResponse {
  works: WorkItemModel;
  category?: WorkCategoryItemModel | null;
  type?: WorkTypeItemModel | null;
  tools?: ToolItemModel[] | null;
}

export interface SkillsResponse {
  user: UserItemModel;
  tools: ToolItemModel[];
}

export interface AboutResponse {
  user: UserItemModel;
  socials: SocialItemModel[];
  interests?: InterestItemModel[] | null;
}

export interface InfoResponse {
  user: UserItemModel;
  types: WorkTypeItemModel[];
  jobs: JobItemModel[];
}
