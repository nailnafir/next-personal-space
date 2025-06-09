"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { menus } from "@/lib/data/menus";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { MessageSquare, Menu, X, Code2 } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

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
            <Link href="/">
              <span className="flex flex-row items-center gap-1 text-foreground">
                <Code2 className="w-8 h-8" />
                <span className="text-xl font-bold">NAILNAFIR</span>
              </span>
            </Link>
          </motion.div>

          {/* DESKTOP MENU */}
          <div className="absolute items-center hidden space-x-4 -translate-x-1/2 -translate-y-1/2 md:flex left-1/2 top-1/2">
            {menus.map((menu, index) => (
              <Link
                data-cursor-target
                key={index}
                href={`#${menu.title.toLowerCase()}`}
                className="px-3 py-2 text-sm font-medium transition duration-300 rounded-md text-foreground hover:bg-foreground/10"
              >
                <span className="flex items-center gap-1">
                  <menu.icon className="w-4 h-4" />
                  {menu.title}
                </span>
              </Link>
            ))}
          </div>

          {/* Action */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden lg:flex">
              <Button
                variant="default"
                onClick={() => window.open("https://t.me/nailnafir", "_blank")}
                className="py-2 transition duration-300 rounded-full bg-foreground hover:bg-foreground/75"
              >
                <MessageSquare className="text-background" />
                <span className="text-sm font-semibold text-background">
                  Ngobrol, Yuk!
                </span>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <Button
              variant="default"
              size="icon"
              onClick={() => setOpen(!open)}
              className="p-2 transition duration-300 border-2 rounded-full bg-foreground hover:bg-background md:hidden text-foreground"
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
            {menus.map((menu, index) => (
              <Link
                key={index}
                href={`#${menu.title.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium rounded-md text-foreground"
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
