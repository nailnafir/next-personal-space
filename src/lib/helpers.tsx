import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaSteam,
} from "react-icons/fa6";
import { IconType } from "react-icons";

export function parseBoldUnderline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const clean = part.slice(1, -1);
      return (
        <span key={index} className="font-semibold underline">
          {clean}
        </span>
      );
    }
    return part;
  });
}

export function getSocialIcon(platform: string): IconType {
  switch (platform.toLowerCase()) {
    case "instagram":
      return FaInstagram;
    case "github":
      return FaGithub;
    case "linkedin":
      return FaLinkedin;
    case "steam":
      return FaSteam;
    case "spotify":
      return FaSpotify;
    default:
      throw new Error(`Icon platform "${platform}" belum dibikin`);
  }
}
