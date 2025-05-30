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
  url: string;
}

export const skills: SkillItem[] = [
  {
    icon: SiBootstrap,
    title: "Bootstrap",
    url: "https://getbootstrap.com/",
  },
  {
    icon: SiTailwindcss,
    title: "Tailwind",
    url: "https://tailwindcss.com/",
  },
  {
    icon: SiReact,
    title: "React",
    url: "https://react.dev/",
  },
  {
    icon: SiNextdotjs,
    title: "Next",
    url: "https://nextjs.org/",
  },
  {
    icon: SiExpress,
    title: "Express",
    url: "https://expressjs.com/",
  },
  {
    icon: SiDotnet,
    title: ".NET",
    url: "https://dotnet.microsoft.com/id-id/",
  },
  {
    icon: SiLaravel,
    title: "Laravel",
    url: "https://laravel.com/",
  },
  {
    icon: FaJava,
    title: "Java",
    url: "https://www.java.com/",
  },
  {
    icon: SiKotlin,
    title: "Kotlin",
    url: "https://kotlinlang.org/",
  },
  {
    icon: FaFlutter,
    title: "Flutter",
    url: "https://flutter.dev/",
  },
  {
    icon: SiJetpackcompose,
    title: "Jetpack Compose",
    url: "https://developer.android.com/jetpack/compose",
  },
  {
    icon: SiMysql,
    title: "MYSQL",
    url: "https://www.mysql.com/",
  },
  {
    icon: SiPostgresql,
    title: "PostgreSQL",
    url: "https://www.postgresql.org/",
  },
  {
    icon: SiMongodb,
    title: "MongoDB",
    url: "https://www.mongodb.com/",
  },
  {
    icon: SiFirebase,
    title: "Firebase",
    url: "https://firebase.google.com/",
  },
  {
    icon: SiSupabase,
    title: "Supabase",
    url: "https://supabase.com/",
  },
];
