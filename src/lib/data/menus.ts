import { LucideIcon, Lightbulb, Star, HandHeart } from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  title: string;
}

export const menus: MenuItem[] = [
  {
    icon: Lightbulb,
    title: "Tentang",
  },
  {
    icon: HandHeart,
    title: "Karya",
  },
  {
    icon: Star,
    title: "Keahlian",
  },
];
