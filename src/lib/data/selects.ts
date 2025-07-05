import {
  LucideIcon,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Clock,
  Eye,
  MessageCircle,
  Quote,
  Heart,
} from "lucide-react";

interface SelectItem {
  icon: LucideIcon;
  title: string;
  value: string;
}

export const orderBySelects: SelectItem[] = [
  {
    icon: ArrowDownWideNarrow,
    title: "Terlama",
    value: "asc",
  },
  {
    icon: ArrowUpNarrowWide,
    title: "Terbaru",
    value: "desc",
  },
];

export const sortBySelects: SelectItem[] = [
  {
    icon: Clock,
    title: "Tanggal Publikasi",
    value: "createdAt",
  },
  {
    icon: Quote,
    title: "Judul Artikel",
    value: "title",
  },
  {
    icon: Eye,
    title: "Jumlah Dilihat",
    value: "views",
  },
  {
    icon: Heart,
    title: "Jumlah Suka",
    value: "likes",
  },
  {
    icon: MessageCircle,
    title: "Jumlah Komentar",
    value: "comments",
  },
];