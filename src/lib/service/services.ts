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

  let json: ApiResult<T>;

  try {
    json = await res.json();
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `${error.message}`
        : "Tidak dapat menerima response dari server"
    );
  }

  if (!res.ok || json.status === "failed") {
    throw new Error(json.message || "Server bermasalah");
  }

  return json.data;
};
