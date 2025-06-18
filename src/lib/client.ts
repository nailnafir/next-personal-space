import {
  AboutModel,
  ApiResult,
  InfoModel,
  SkillsModel,
  WorksModel,
} from "@/types/models";
import { Database } from "@/types/database";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ada masalah saat ambil data");
  }

  const json: ApiResult<T> = await res.json();

  if (json.status === "failed") {
    throw new Error(json.message);
  }

  return json.data;
};

export const fetchSkills = async (): Promise<SkillsModel> => {
  return fetcher("/api/skills");
};

export const fetchWorks = async (): Promise<WorksModel[]> => {
  return fetcher("/api/works");
};

export const fetchAbout = async (): Promise<AboutModel> => {
  return fetcher("/api/about");
};

export const fetchInfo = async (): Promise<InfoModel> => {
  return fetcher("/api/info");
};
