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
  url: string;
}

export const socials: SocialItem[] = [
  {
    icon: FaInstagram,
    title: "Instagram",
    url: "https://instagram.com/firdaus.nailul",
  },
  {
    icon: FaGithub,
    title: "Github",
    url: "https://github.com/nailnafir",
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    url: "https://linkedin.com/in/nailul-firdaus/",
  },
  {
    icon: FaSteam,
    title: "Steam",
    url: "https://steamcommunity.com/id/nailnafir",
  },
  {
    icon: FaSpotify,
    title: "Spotify",
    url: "https://open.spotify.com/user/10969nailnafir",
  },
];
