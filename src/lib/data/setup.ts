import { LucideIcon, Coffee, Brain, Heart } from "lucide-react";

interface SetupItem {
  icon: LucideIcon;
  title: string;
}

export const setups: SetupItem[] = [
  {
    icon: Brain,
    title: "Pikiran",
  },
  {
    icon: Coffee,
    title: "Kopi Susu",
  },
  {
    icon: Heart,
    title: "Cinta",
  },
];
