"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      className="rounded-full border-2 dark:bg-white dark:hover:bg-white bg-black hover:bg-black"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full h-full flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-black" />
        ) : (
          <Moon className="h-4 w-4 text-white" />
        )}
      </motion.div>
      <span className="sr-only">Tema</span>
    </Button>
  );
}
