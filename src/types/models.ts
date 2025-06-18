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

export type UserItemModel = {
  name?: string | null;
  photoUrl?: string | null;
  about?: string | null;
  story?: string | null;
};

export type SocialItemModel = {
  platform: string;
  url?: string;
  iconUrl?: string | null;
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
  url: string;
};

export interface WorksModel {
  works: WorkItemModel;
  category: WorkCategoryItemModel;
  type: WorkTypeItemModel;
  tools: ToolItemModel[];
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
