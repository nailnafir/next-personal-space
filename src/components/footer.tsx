import { Code2 } from "lucide-react";
import { SubscribeForm } from "@/components/personal/subscribe-form";
import { menus } from "@/lib/data/menus";
import { fetchAbout } from "@/lib/client";
import { AboutModel } from "@/types/models";
import { setups } from "@/lib/data/setup";
import Link from "next/link";
import useSWR from "swr";

export default function Footer() {
  const getCopyrightYear = () => {
    const projectYear = 2020;
    const currentYear = new Date().getFullYear();

    return projectYear === currentYear
      ? `©${currentYear}.`
      : `©${projectYear} - ${currentYear}.`;
  };

  const { data: about } = useSWR<AboutModel>("about", fetchAbout, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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
            <h3 className="p-1 mb-4 font-semibold">Menu</h3>
            <div className="flex space-x-2">
              <ul className="space-y-2 text-sm">
                {menus.map((menu, index) => (
                  <li key={index}>
                    <Link
                      data-cursor-target
                      href={`#${menu.title.toLowerCase()}`}
                      className="p-1 transition text-muted-foreground/75 hover:text-foreground"
                    >
                      {menu.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {about && (
            <>
              {/* Social Media */}
              <div>
                <h3 className="p-1 mb-4 font-semibold">Sosial Media</h3>
                <ul className="space-y-2 text-sm">
                  {about?.socials.map((social, index) => (
                    <li key={index}>
                      <Link
                        data-cursor-target
                        href={`${social.url}`}
                        className="p-1 transition text-muted-foreground/75 hover:text-foreground"
                      >
                        {social.platform}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interest */}
              <div>
                <h3 className="p-1 mb-4 font-semibold">Minat</h3>
                <ul className="space-y-2 text-sm">
                  {about?.interests?.map((interest, index) => (
                    <li key={index}>
                      <Link
                        data-cursor-target
                        href=""
                        className="p-1 transition text-muted-foreground/75 hover:text-foreground"
                      >
                        {interest.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <SubscribeForm />
        </div>

        {/* Creator */}
        <div className="pt-6 mt-10 text-sm text-center border-t text-muted-foreground/75 border-ring/50">
          <p>Dibuat Dengan</p>
          <div className="flex items-center justify-center gap-2 my-2 text-lg">
            {setups.map((item) => (
              <item.icon
                key={item.title}
                className="transition-all duration-300 hover:text-foreground hover:scale-125"
              />
            ))}
          </div>
          <p>Hak Cipta {getCopyrightYear()} Nailul Firdaus</p>
        </div>
      </div>
    </footer>
  );
}
