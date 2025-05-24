import {
  IconType,
  SiGithub,
  SiInstagram,
  SiSpotify,
  SiSteam,
} from "@icons-pack/react-simple-icons";

interface SocialItem {
  icon: IconType;
  title: string;
  href?: string;
}

export const socials: SocialItem[] = [
  {
    icon: SiInstagram,
    title: "Instagram",
    href: "https://instagram.com/firdaus.nailul",
  },
  {
    icon: SiGithub,
    title: "Github",
    href: "https://github.com/nailnafir",
  },
  {
    icon: SiSteam,
    title: "Steam",
    href: "https://steamcommunity.com/id/nailnafir",
  },
  {
    icon: SiSpotify,
    title: "Spotify",
    href: "https://open.spotify.com/user/10969nailnafir",
  },
];
