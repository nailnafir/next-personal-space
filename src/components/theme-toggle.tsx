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
      className="transition duration-300 border-2 rounded-full bg-foreground hover:bg-foreground/75"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex items-center justify-center w-full h-full"
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-background" />
        ) : (
          <Moon className="w-4 h-4 text-background" />
        )}
      </motion.div>
      <span className="sr-only">Tema</span>
    </Button>
  );
}
