import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SuccessResponse, FailedResponse } from "@/types/models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiResponse = {
  ok<T>(data: T, message?: string): SuccessResponse<T> {
    return {
      status: "success",
      message,
      data,
    };
  },

  error(message: string, error?: unknown): FailedResponse {
    return {
      status: "failed",
      message,
      error,
    };
  },
};

export const translateCategory = (data: string) => {
  switch (data.toLowerCase()) {
    case "all":
      return "Semua";
    case "application":
      return "Aplikasi";
    case "website":
      return "Situs Web";
    case "backend service":
      return "Layanan Backend";
    default:
      return data;
  }
};

export const translateType = (data: string) => {
  switch (data.toLowerCase()) {
    case "all":
      return "Semua";
    case "software":
      return "Perangkat Lunak";
    case "design":
      return "Desain";
    case "blog":
      return "Artikel Blog";
    default:
      return data;
  }
};