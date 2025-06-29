import {
  AboutModel,
  ArticleItemModel,
  CommentItemModel,
  InfoModel,
  SendCommentPayload,
  SkillsModel,
  WorksModel,
} from "@/types/models";
import { ParamValue } from "next/dist/server/request/params";
import { service } from "@/lib/network/service";

export const readSkills = async (): Promise<SkillsModel> => {
  return service("/api/skills");
};

export const readWorks = async (): Promise<WorksModel[]> => {
  return service("/api/works");
};

export const readAbout = async (): Promise<AboutModel> => {
  return service("/api/about");
};

export const readInfo = async (): Promise<InfoModel> => {
  return service("/api/info");
};

export const readArticleId = async (
  articleId: ParamValue
): Promise<ArticleItemModel> => {
  return service(`/api/articles/${articleId}`);
};

export const updateArticleViews = async (
  articleId: ParamValue
): Promise<ArticleItemModel> => {
  return service(`/api/articles/${articleId}/view`, { method: "PATCH" });
};

export const readComments = async (
  articleId: ParamValue
): Promise<CommentItemModel> => {
  return service(`/api/articles/${articleId}/comments`);
};

export const createComment = async (payload: SendCommentPayload) => {
  return service<CommentItemModel>(`/api/articles/comments`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
