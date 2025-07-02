import {
  AboutResponse,
  ArticleItemResponse,
  ArticlesResponse,
  CommentItemResponse,
  InfoResponse,
  SendCommentRequest,
  SkillsResponse,
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

export const updateArticleViews = async (
  articleId: ParamValue
): Promise<ArticleItemResponse> => {
  return services(`/api/articles/${articleId}/views`, { method: "PATCH" });
};

export const readComments = async (
  articleId: ParamValue
): Promise<CommentItemResponse[]> => {
  return services(`/api/articles/${articleId}/comments`);
};

export const createComment = async (
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
