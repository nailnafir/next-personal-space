"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { menus } from "@/lib/menus";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { MessageSquare, Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 items-center w-full backdrop-blur border-b border-gray-800/20 bg-white/70 dark:bg-black/30">
      <div className="max-w-full mx-auto sm:px-32 px-4">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Link href="/">
              <span className="text-xl font-semibold flex items-center gap-1 dark:text-white text-black">
                <span className="px-2 dark:bg-white dark:text-black bg-black text-white">
                  NAILNAFIR
                </span>
              </span>
            </Link>
          </motion.div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-4">
            {menus.map((menu, index) => (
              <Link
                key={index}
                href={`#${menu.title.toLowerCase()}`}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700/20 dark:text-white text-black"
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
            <div className="hidden md:flex">
              <Button
                variant="default"
                size="sm"
                onClick={() => window.open("https://t.me/nailnafir", "_blank")}
                className="gap-2 rounded-full border-2 dark:bg-white dark:hover:bg-white bg-black hover:bg-black px-4 py-2"
              >
                <MessageSquare className="h-4 w-4 text-white dark:text-black" />
                <span className="text-sm text-white dark:text-black font-semibold">
                  Ngobrol, Yuk!
                </span>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <Button
              variant="default"
              size="icon"
              onClick={() => setOpen(!open)}
              className="rounded-full border-2 dark:bg-white dark:hover:bg-white bg-black hover:bg-black md:hidden p-2 text-black dark:text-white"
            >
              <motion.div
                initial={{ rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full h-full flex items-center justify-center"
              >
                {open ? (
                  <X className="h-4 w-4 text-white dark:text-black" />
                ) : (
                  <Menu className="h-4 w-4 text-white dark:text-black" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/85 dark:bg-black/85 backdrop-blur border-b border-gray-800/20 z-40 flex flex-col space-y-2 px-4 py-4"
          >
            {menus.map((menu, index) => (
              <Link
                key={index}
                href={cn("#", menu.title.toLowerCase())}
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700/20 dark:text-white text-black"
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
