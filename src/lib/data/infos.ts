import { AppWindow, LucideIcon, Newspaper, Palette } from "lucide-react";

interface InfoItem {
  icon: LucideIcon;
  count: number;
  title: string;
}

export const jobs: string[] = [
  "Software Engineer",
  "UIX Designer",
  "Lifetime Learner",
];

export const applications = [
  "Application 1",
  "Application 2",
  "Application 3",
  "Application 4",
  "Application 5",
];
export const designs = ["Design 1", "Design 2", "Design 3"];
export const blogs = [
  "Blog 1",
  "Blog 2",
  "Blog 3",
  "Blog 4",
  "Blog 5",
  "Blog 6",
  "Blog 7",
  "Blog 8",
];

export const infos: InfoItem[] = [
  {
    icon: AppWindow,
    count: applications.length,
    title: "Aplikasi",
  },
  {
    icon: Palette,
    count: designs.length,
    title: "Desain",
  },
  {
    icon: Newspaper,
    count: blogs.length,
    title: "Blog",
  },
];
