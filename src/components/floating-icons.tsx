"use client";

import { motion, TargetAndTransition } from "motion/react";
import { Code, Database, Globe, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const floatingAnimation: TargetAndTransition = {
  y: [0, -12, 0],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

const icons: LucideIcon[] = [Code, Database, Globe];

const colorVariants = [
  {
    text: "text-red-700 dark:text-red-300",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border border-red-200 dark:border-red-800",
    shadow: "shadow-red-100 dark:shadow-red-900/50",
  },
  {
    text: "text-green-700 dark:text-green-300",
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border border-green-200 dark:border-green-800",
    shadow: "shadow-green-100 dark:shadow-green-900/50",
  },
  {
    text: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border border-blue-200 dark:border-blue-800",
    shadow: "shadow-blue-100 dark:shadow-blue-900/50",
  },
];

const positions = [
  {
    desktopTop: 1,
    desktopLeft: 60,
    delay: 1.5,
    mobileTop: 0.3,
    mobileLeft: 87,
  },
  {
    desktopTop: 5,
    desktopLeft: 23,
    delay: 0.9,
    mobileTop: 1.8,
    mobileLeft: 18,
  },
  {
    desktopTop: 10,
    desktopLeft: 78,
    delay: 0.2,
    mobileTop: 3.2,
    mobileLeft: 78,
  },
];

export default function FloatingIcons() {
  return (
    <>
      {/* Desktop Version */}
      {icons.map((Icon, index) => {
        const { desktopTop, desktopLeft, delay } = positions[index];
        const colorScheme = colorVariants[index % colorVariants.length];

        return (
          <motion.div
            key={`desktop-${index}`}
            animate={{
              ...floatingAnimation,
              transition: {
                ...floatingAnimation.transition,
                delay,
              },
            }}
            style={{ top: `${desktopTop}%`, left: `${desktopLeft}%` }}
            className="absolute z-[-1] hidden sm:block"
          >
            <div
              className={cn(
                "backdrop-blur p-2 rounded-xl opacity-50 shadow transition-all duration-300",
                colorScheme.bg,
                colorScheme.border,
                colorScheme.shadow,
                colorScheme.text
              )}
            >
              <Icon className="w-8 h-8" />
            </div>
          </motion.div>
        );
      })}

      {/* Mobile Version */}
      {icons.map((Icon, index) => {
        const { mobileTop, mobileLeft, delay } = positions[index];
        const colorScheme = colorVariants[index % colorVariants.length];

        return (
          <motion.div
            key={`mobile-${index}`}
            animate={{
              ...floatingAnimation,
              transition: {
                ...floatingAnimation.transition,
                delay,
              },
            }}
            style={{ top: `${mobileTop}%`, left: `${mobileLeft}%` }}
            className="absolute z-[-1] block sm:hidden"
          >
            <div
              className={cn(
                "backdrop-blur-sm p-2 rounded-xl opacity-50 shadow-sm transition-all duration-300",
                colorScheme.bg,
                colorScheme.border,
                colorScheme.shadow,
                colorScheme.text
              )}
            >
              <Icon className="w-4 h-4 sm:w-8 sm:h-8" />
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
