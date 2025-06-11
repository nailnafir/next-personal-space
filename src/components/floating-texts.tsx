"use client";

import { cn } from "@/lib/utils";
import { motion, TargetAndTransition } from "motion/react";
import { JetBrains_Mono } from "next/font/google";

const floatingAnimation: TargetAndTransition = {
  y: [0, -12, 0],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

const texts = [
  "try { work(); } catch { sleep(); }",
  'console.log("malas");',
  "if (mood === 'malas') sleep();",
];

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
    desktopLeft: 16,
    delay: 1.5,
    mobileTop: 0.3,
    mobileLeft: 5,
  },
  {
    desktopTop: 5,
    desktopLeft: 75,
    delay: 0.9,
    mobileTop: 1.8,
    mobileLeft: 52,
  },
  {
    desktopTop: 10,
    desktopLeft: 5,
    delay: 0.2,
    mobileTop: 3.2,
    mobileLeft: 12,
  },
];

export default function FloatingTexts() {
  return (
    <>
      {/* Desktop Version */}
      {texts.map((text, index) => {
        const { desktopTop, desktopLeft, delay } = positions[index];
        const colorScheme = colorVariants[index % colorVariants.length];

        return (
          <motion.div
            key={`desktop-${index}`}
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay },
            }}
            style={{ top: `${desktopTop}%`, left: `${desktopLeft}%` }}
            className="absolute z-[-1] hidden sm:block"
          >
            <span
              className={cn(
                "text-sm font-mono backdrop-blur p-2 opacity-50 rounded-xl shadow transition-all duration-300",
                colorScheme.text,
                colorScheme.bg,
                colorScheme.border,
                colorScheme.shadow,
                jetbrainsMono.className
              )}
            >
              {text}
            </span>
          </motion.div>
        );
      })}

      {/* Mobile Version */}
      {texts.map((text, index) => {
        const { delay, mobileTop, mobileLeft } = positions[index];
        const colorScheme = colorVariants[index % colorVariants.length];

        return (
          <motion.div
            key={`mobile-${index}`}
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay },
            }}
            style={{ top: `${mobileTop}%`, left: `${mobileLeft}%` }}
            className="absolute z-[-1] block sm:hidden"
          >
            <span
              className={cn(
                "text-xs font-mono backdrop-blur-sm p-2 opacity-50 rounded-xl shadow-sm transition-all duration-300",
                colorScheme.text,
                colorScheme.bg,
                colorScheme.border,
                colorScheme.shadow,
                jetbrainsMono.className
              )}
            >
              {text}
            </span>
          </motion.div>
        );
      })}
    </>
  );
}
