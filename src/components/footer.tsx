import Link from "next/link";
import { Brain, Coffee, Heart, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socials } from "@/lib/social";
import { menus } from "@/lib/menus";

export default function Footer() {
  const getCopyrightyear = () => {
    const projectYear = 2025;
    const currentYear = new Date().getFullYear();

    return projectYear === currentYear
      ? `©${currentYear}.`
      : `©${projectYear} - ${currentYear}.`;
  };

  return (
    <footer className="py-12 z-50 backdrop-blur border-t dark:border-gray-800 dark:text-gray-400 border-gray-200 text-gray-600">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:px-32 px-4">
          {/* Me */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="text-xl font-semibold dark:text-white text-black">
                <span className="px-2 dark:bg-white dark:text-black bg-black text-white">
                  NAILNAFIR
                </span>
              </span>
            </div>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              Sosial Media
            </p>
            <div className="flex space-x-4">
              {socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.href ?? "#"}
                  className="hover:text-purple-500 transition-colors dark:text-gray-400 text-gray-600"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-sm dark:text-gray-400 text-gray-600">
              {menus.map((menu, index) => (
                <li key={index}>
                  <Link
                    href={`#${menu.title.toLowerCase()}`}
                    className="hover:text-purple-500 transition-colors"
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Minat</h3>
            <ul className="space-y-2 text-sm dark:text-gray-400 text-gray-600">
              <li>Design</li>
              <li>Website Development</li>
              <li>Mobile Development</li>
              <li>Big Data</li>
              <li>Blockchain</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Langganan</h3>
            <p className="text-sm mb-4 dark:text-gray-400 text-gray-600">
              Masukin email kamu buat update dan konten kocak setiap minggu.
              Janji gak cuma kirim spam template &quot;Hai kak, kami
              dari...&quot;
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email kamu"
                className="bg-transparent dark:border-gray-700 dark:text-white border-gray-300 text-black"
              />
              <Button
                size="sm"
                className="dark:bg-white dark:text-black dark:hover:bg-white/90 bg-black text-white hover:bg-black/90"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Daftar</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Creator */}
        <div className="mt-10 pt-6 border-t text-center text-sm dark:border-gray-800 dark:text-gray-400 border-gray-200 text-gray-600">
          <p>Dibuat Dengan</p>
          <div className="flex justify-center items-center gap-2 text-lg my-2">
            <Brain /> <Coffee /> <Heart />
          </div>
          <p>Hak Cipta {getCopyrightyear()} Nailul Firdaus</p>
        </div>
      </div>
    </footer>
  );
}
