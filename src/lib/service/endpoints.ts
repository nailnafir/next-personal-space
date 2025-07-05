import {
  AboutResponse,
  ArticleItemResponse,
  ArticlesResponse,
  CommentItemResponse,
  CommentsResponse,
  InfoResponse,
  LikeItemResponse,
  SendCommentRequest,
  SkillsResponse,
  ViewItemResponse,
  WorksResponse,
} from "@/model/models";
import { ParamValue } from "next/dist/server/request/params";
import { services } from "@/lib/service/services";

export const readSkills = async (): Promise<SkillsResponse> => {
  return services("/api/skills");
};

export const readWorks = async (): Promise<WorksResponse[]> => {
  return services("/api/works");
};

export const readAbout = async (): Promise<AboutResponse> => {
  return services("/api/about");
};

export const readInfo = async (): Promise<InfoResponse> => {
  return services("/api/info");
};

export const readArticles = async (
  query: string
): Promise<ArticlesResponse> => {
  return services(`/api/articles?${query}`);
};

export const readArticleId = async (
  articleId: ParamValue
): Promise<ArticleItemResponse> => {
  return services(`/api/articles/${articleId}`);
};

export const readArticleViews = async (
  articleId: ParamValue,
  authorId?: number | null
): Promise<ViewItemResponse> => {
  return services(`/api/articles/${articleId}/views`, {
    method: "POST",
    body: JSON.stringify({
      articleId,
      authorId,
    }),
  });
};

export const readArticleLikes = async (
  articleId: ParamValue,
  authorId?: number | null
): Promise<LikeItemResponse> => {
  return services(`/api/articles/${articleId}/likes`, {
    method: "POST",
    body: JSON.stringify({
      articleId,
      authorId,
    }),
  });
};

export const readArticleComments = async (
  articleId: ParamValue
): Promise<CommentsResponse> => {
  return services(`/api/articles/${articleId}/comments`);
};

export const createArticleViews = async (
  articleId: ParamValue,
  authorId?: number | null
): Promise<ViewItemResponse> => {
  return services(`/api/articles/${articleId}/views/create`, {
    method: "POST",
    body: JSON.stringify({
      articleId,
      authorId,
    }),
  });
};

export const createArticleLikes = async (
  articleId: ParamValue,
  authorId?: number | null
): Promise<LikeItemResponse> => {
  return services(`/api/articles/${articleId}/likes/action`, {
    method: "POST",
    body: JSON.stringify({
      articleId,
      authorId,
    }),
  });
};

export const createArticleComment = async (
  articleId: ParamValue,
  payload: SendCommentRequest
) => {
  return services<CommentItemResponse>(
    `/api/articles/${articleId}/comments/create`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
};
