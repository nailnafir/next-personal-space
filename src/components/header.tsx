"use client";

import Logo from "@/components/logo";
import { useState } from "react";
import { motion } from "motion/react";
import { articleMenus, mainMenus } from "@/lib/data/menus";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useMenu } from "@/hooks/use-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

type HeaderProps = {
  variant?: "main" | "articles" | "wedding";
};

export default function Header({ variant = "main" }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const { activeMenu, handleMenuClick } = useMenu();

  return (
    <header className="sticky top-0 z-50 items-center w-full transition duration-300 border-b shadow-xl border-ring/50 shadow-background/5 backdrop-blur bg-background/50">
      <div className="max-w-full px-4 mx-auto sm:px-32">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Logo />
          </motion.div>

          {/* DESKTOP MENU */}
          <div className="absolute items-center hidden space-x-4 -translate-x-1/2 -translate-y-1/2 md:flex left-1/2 top-1/2">
            {variant === "main" &&
              mainMenus.map((menu, index) => (
                <Button
                  variant="ghost"
                  data-cursor-target
                  key={index}
                  onClick={() => handleMenuClick(menu.title)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition duration-300 rounded-xl relative",
                    activeMenu === menu.title.toLowerCase()
                      ? "text-foreground bg-foreground/15"
                      : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  <span className="flex items-center gap-1 text-foreground">
                    <menu.icon className="w-4 h-4" />
                    {menu.title}
                  </span>

                  {activeMenu === menu.title.toLowerCase() && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Button>
              ))}

            {variant === "articles" &&
              articleMenus.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.href || "#"}
                  onClick={() => handleMenuClick(menu.title)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition duration-300 rounded-xl relative",
                    activeMenu === menu.title.toLowerCase()
                      ? "text-foreground bg-foreground/15"
                      : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  <span className="flex items-center gap-1 text-foreground">
                    <menu.icon className="w-4 h-4" />
                    {menu.title}
                  </span>

                  {activeMenu === menu.title.toLowerCase() && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
          </div>

          {/* Action */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Trigger */}
            <Button
              variant="default"
              size="icon"
              onClick={() => setOpen(!open)}
              className="transition duration-300 border-2 rounded-full bg-foreground hover:bg-foreground/75 sm:hidden"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: open ? 0 : 180 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex items-center justify-center w-full h-full"
              >
                {open ? (
                  <X className="w-4 h-4 text-background" />
                ) : (
                  <Menu className="w-4 h-4 text-background" />
                )}
              </motion.div>
              <span className="sr-only">Menu Mobile</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 flex flex-col w-full px-4 py-4 space-y-2 transition duration-300 border-b border-ring/50 md:hidden bg-background/85 backdrop-blur"
          >
            {variant === "main" &&
              mainMenus.map((menu, index) => (
                <Button
                  variant="ghost"
                  key={index}
                  onClick={() => {
                    handleMenuClick(menu.title);
                    setOpen(!open);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md text-left",
                    activeMenu === menu.title.toLowerCase()
                      ? "text-foreground bg-foreground/15"
                      : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <menu.icon className="w-4 h-4" />
                    {menu.title}
                  </span>
                </Button>
              ))}

            {variant === "articles" &&
              articleMenus.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.href || "#"}
                  onClick={() => {
                    handleMenuClick(menu.title);
                    setOpen(!open);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md text-left",
                    activeMenu === menu.title.toLowerCase()
                      ? "text-foreground bg-foreground/15"
                      : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <menu.icon className="w-4 h-4" />
                    {menu.title}
                  </span>
                </Link>
              ))}
          </motion.div>
        )}
      </div>
    </header>
  );
}
