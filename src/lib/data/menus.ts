import {
  LucideIcon,
  Lightbulb,
  Star,
  HandHeart,
  Network,
  MessageSquare,
} from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  title: string;
  href?: string;
}

export const mainMenus: MenuItem[] = [
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

export const articleMenus: MenuItem[] = [
  {
    icon: Network,
    title: "Tutorial",
    href: "/articles/tutorials",
  },
  {
    icon: MessageSquare,
    title: "Diskusi",
    href: "/articles/discussions",
  },
];
