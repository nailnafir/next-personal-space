import { ProjectInterface } from "@/types/project";
import { fetcher } from "@/lib/api/client";

export const getProjects = async () => {
  const data = await fetcher<Record<string, ProjectInterface>>("projects");

  return Object.values(data);
};
