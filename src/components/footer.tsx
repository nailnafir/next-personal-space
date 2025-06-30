"use client";

import { articleMenus, mainMenus } from "@/lib/data/menus";
import { readAbout } from "@/lib/service/endpoints";
import { AboutResponse } from "@/model/models";
import { setups } from "@/lib/data/setup";
import { SubscribeForm } from "@/components/subscribe-form";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { getCopyrightYear } from "@/lib/utils";
import Logo from "@/components/logo";
import Link from "next/link";
import useSWR from "swr";

export default function Footer() {
  const path = usePathname();

  const { data: about, isLoading } = useSWR<AboutResponse>("about", readAbout, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <footer className="z-50 py-12 transition duration-300 border-t text-foreground border-ring/50 backdrop-blur bg-background/50">
      <div className="max-w-full mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-10 px-4 md:grid-cols-4 sm:px-32">
            {/* Me Loading */}
            <div className="space-y-4">
              <Skeleton className="w-32 h-10" />
              <Skeleton className="w-20 h-5" />
              <div className="space-y-2">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-24 h-4" />
                ))}
              </div>
            </div>

            {/* Social Media Loading */}
            <div>
              <Skeleton className="w-32 h-5 mb-4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="w-24 h-4" />
                ))}
              </div>
            </div>

            {/* Interests Loading */}
            <div>
              <Skeleton className="w-24 h-5 mb-4" />
              <div className="space-y-2">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-20 h-4" />
                ))}
              </div>
            </div>

            {/* Subscribe Form Loading */}
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="w-full h-10" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 px-4 md:grid-cols-4 sm:px-32">
            {/* Me */}
            <div className="space-y-4">
              <div className="mb-6">
                <Logo />
              </div>
              <h3 className="p-1 mb-4 font-semibold">Menu</h3>
              <div className="flex space-x-2">
                <ul className="space-y-2 text-sm">
                  {path.includes("articles")
                    ? articleMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            data-cursor-target
                            href={`#${menu.title.toLowerCase()}`}
                            className="p-1 transition text-muted-foreground/75 hover:text-foreground"
                          >
                            {menu.title}
                          </Link>
                        </li>
                      ))
                    : mainMenus.map((menu, index) => (
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

            {/* Social Media */}
            <div>
              <h3 className="p-1 mb-4 font-semibold">Sosial Media</h3>
              <ul className="space-y-2 text-sm">
                {about?.socials.map((social, index) => (
                  <li key={index}>
                    <Link
                      data-cursor-target
                      href={`${social.baseUrl}${social.urlPrefix}${social.username}`}
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

            <SubscribeForm />
          </div>
        )}

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
