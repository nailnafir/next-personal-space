"use client";

import { useState, useEffect } from "react";
import { menus } from "@/lib/data/menus";

export function useMenu() {
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = menus.map((menu) => ({
        id: menu.title.toLowerCase(),
        element: document.getElementById(menu.title.toLowerCase()),
      }));

      let activeId = "";

      for (const section of sections) {
        if (!section.element) continue;

        const rect = section.element.getBoundingClientRect();

        if (rect.top <= 0 && rect.bottom > 0) {
          activeId = section.id;
          break;
        }
      }

      const infoSection = document.getElementById("info");
      const infoRect = infoSection?.getBoundingClientRect();

      if (infoRect && infoRect.top < window.innerHeight && infoRect.top > 0) {
        activeId = "";
      }

      setActiveMenu(activeId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (menuTitle: string) => {
    const element = document.getElementById(menuTitle.toLowerCase());
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return {
    activeMenu,
    handleMenuClick,
  };
}
