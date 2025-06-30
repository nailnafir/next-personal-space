import { ApiResult } from "@/model/models";

export const services = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!res.ok) throw new Error("Ada masalah saat ambil data");

  const json: ApiResult<T> = await res.json();

  if (json.status === "failed") throw new Error(json.message);

  return json.data;
};
