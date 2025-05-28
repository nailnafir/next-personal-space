import { IconType } from "react-icons";
import { FaFlutter, FaJava } from "react-icons/fa6";
import {
  SiBootstrap,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiJetpackcompose,
  SiKotlin,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
} from "react-icons/si";

interface SkillItem {
  icon: IconType;
  title: string;
}

export const skills: SkillItem[] = [
  {
    icon: SiBootstrap,
    title: "Bootstrap",
  },
  {
    icon: SiTailwindcss,
    title: "Tailwind",
  },
  {
    icon: SiReact,
    title: "React",
  },
  {
    icon: SiNextdotjs,
    title: "Next",
  },
  {
    icon: SiExpress,
    title: "Express",
  },
  {
    icon: SiDotnet,
    title: ".NET",
  },
  {
    icon: SiLaravel,
    title: "Laravel",
  },
  {
    icon: FaJava,
    title: "Java",
  },
  {
    icon: SiKotlin,
    title: "Kotlin",
  },
  {
    icon: FaFlutter,
    title: "Kotlin",
  },
  {
    icon: SiJetpackcompose,
    title: "Jetpack Compose",
  },
  {
    icon: SiMysql,
    title: "MYSQL",
  },
  {
    icon: SiPostgresql,
    title: "Postgresql",
  },
  {
    icon: SiMongodb,
    title: "Mongodb",
  },
  {
    icon: SiFirebase,
    title: "Firebase",
  },
  {
    icon: SiSupabase,
    title: "Supabase",
  },
];
