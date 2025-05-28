import { IconType } from "react-icons";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaSteam,
} from "react-icons/fa6";

interface SocialItem {
  icon: IconType;
  title: string;
  href?: string;
}

export const socials: SocialItem[] = [
  {
    icon: FaInstagram,
    title: "Instagram",
    href: "https://instagram.com/firdaus.nailul",
  },
  {
    icon: FaGithub,
    title: "Github",
    href: "https://github.com/nailnafir",
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    href: "https://linkedin.com/nailnafir",
  },
  {
    icon: FaSteam,
    title: "Steam",
    href: "https://steamcommunity.com/id/nailnafir",
  },
  {
    icon: FaSpotify,
    title: "Spotify",
    href: "https://open.spotify.com/user/10969nailnafir",
  },
];
