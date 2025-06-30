import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaSteam,
} from "react-icons/fa6";
import { IconType } from "react-icons";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { SuccessResponse, FailedResponse } from "@/model/models";
import Hashids from "hashids";

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
    case "article":
      return "Artikel Blog";
    default:
      return data;
  }
};

export function getSocialIcon(platform: string): IconType {
  switch (platform.toLowerCase()) {
    case "instagram":
      return FaInstagram;
    case "github":
      return FaGithub;
    case "linkedin":
      return FaLinkedin;
    case "steam":
      return FaSteam;
    case "spotify":
      return FaSpotify;
    default:
      throw new Error(`Icon platform "${platform}" belum dibikin`);
  }
}

export function getCopyrightYear() {
  const projectYear = 2020;
  const currentYear = new Date().getFullYear();

  return projectYear === currentYear
    ? `©${currentYear}.`
    : `©${projectYear} - ${currentYear}.`;
}

export function getInitialName(name: string | null | undefined): string {
  const safeName = name?.trim() || "Pengguna Misterius";
  const words = safeName.split(" ");

  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}

export function formatTimeRelativeIndonesia(
  datetime?: string | Date | null
): string {
  if (!datetime) return "Baru Saja";

  const date = typeof datetime === "string" ? new Date(datetime) : datetime;

  return formatDistanceToNow(date, {
    locale: id,
    addSuffix: true,
  });
}

export function formatDateTimeIndonesia(
  datetime?: string | null,
  mode: "full" | "date" | "time" = "full"
): string {
  const date = datetime ? new Date(datetime) : new Date();

  if (mode === "date") {
    return format(date, "d MMMM yyyy", { locale: id });
  }

  if (mode === "time") {
    return format(date, "HH:mm", { locale: id }) + " WIB";
  }

  return format(date, "d MMMM yyyy HH:mm", { locale: id }) + " WIB";
}

export function getSupabaseURL(path: string | undefined | null) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error("Supabase URL tidak ditemukan");
  }

  if (!path) {
    return url;
  }

  return `${url}/${path}`;
}

export function encodeId(id: number) {
  const hashids = new Hashids(process.env.NEXT_PUBLIC_SUPABASE_URL, 12);
  return hashids.encode(id);
}

export function decodeId(hash: string): number | null {
  const hashids = new Hashids(process.env.NEXT_PUBLIC_SUPABASE_URL, 12);
  const [decoded] = hashids.decode(hash);
  return typeof decoded === "number" ? decoded : null;
}
