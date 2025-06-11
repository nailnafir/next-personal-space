import Link from "next/link";
import { Brain, Code2, Coffee, Heart, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socials } from "@/lib/data/socials";
import { menus } from "@/lib/data/menus";
import { interests } from "@/lib/data/interests";

export default function Footer() {
  const getCopyrightYear = () => {
    const projectYear = 2020;
    const currentYear = new Date().getFullYear();

    return projectYear === currentYear
      ? `©${currentYear}.`
      : `©${projectYear} - ${currentYear}.`;
  };

  return (
    <footer className="z-50 py-12 transition duration-300 border-t text-foreground border-ring/50 backdrop-blur bg-background/50">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 gap-10 px-4 md:grid-cols-4 sm:px-32">
          {/* Me */}
          <div className="space-y-4">
            <Link href="/">
              <span className="flex flex-row items-center gap-1 p-1 text-foreground">
                <Code2 className="w-8 h-8" />
                <span className="text-xl font-bold">NAILNAFIR</span>
              </span>
            </Link>
            <p className="p-1 text-sm text-foreground">Sosial Media</p>
            <div className="flex space-x-2">
              {socials.map((social, index) => (
                <Link
                  data-cursor-target
                  key={index}
                  href={social.url || "#"}
                  className="p-1 transition-colors text-muted-foreground/75 hover:text-foreground"
                >
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="p-1 mb-4 font-semibold">Menu</h3>
            <ul className="space-y-2 text-sm">
              {menus.map((menu, index) => (
                <li key={index}>
                  <Link
                    data-cursor-target
                    href={`#${menu.title.toLowerCase()}`}
                    className="p-1 transition-colors text-muted-foreground/75 hover:text-foreground"
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Interest */}
          <div>
            <h3 className="p-1 mb-4 font-semibold">Minat</h3>
            <ul className="space-y-2 text-sm">
              {interests.map((interest, index) => (
                <li key={index}>
                  <Link
                    data-cursor-target
                    href=""
                    className="p-1 transition-colors text-muted-foreground/75 hover:text-foreground"
                  >
                    {interest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Langganan</h3>
            <p className="mb-4 text-sm text-muted-foreground/75">
              Masukin email kamu buat baca konten baru setiap minggu
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email kamu"
                className="border-ring/50 text-muted-foreground/75 hover:text-foreground"
              />
              <Button
                size="sm"
                className="transition duration-300 bg-foreground text-background hover:bg-foreground/75"
              >
                <Send className="text-background" />
                <span className="sr-only">Daftar</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Creator */}
        <div className="pt-6 mt-10 text-sm text-center border-t text-muted-foreground/75 border-ring/50">
          <p>Dibuat Dengan</p>
          <div className="flex items-center justify-center gap-2 my-2 text-lg">
            <Brain className="hover:text-foreground" />{" "}
            <Coffee className="hover:text-foreground" />{" "}
            <Heart className="hover:text-foreground" />
          </div>
          <p>Hak Cipta {getCopyrightYear()} Nailul Firdaus</p>
        </div>
      </div>
    </footer>
  );
}
