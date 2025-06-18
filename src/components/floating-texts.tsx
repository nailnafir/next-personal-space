"use client";

import { cn } from "@/lib/utils";
import { motion, type TargetAndTransition } from "motion/react";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

const floatingAnimation: TargetAndTransition = {
  y: [0, -12, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const floatingItems = [
  {
    text: "try { work(); } catch { sleep(); }",
    delay: 1.5,
    colors:
      "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    position: "top-[1%] left-[16%] max-sm:top-[0.3%] max-sm:left-[5%]",
  },
  {
    text: 'console.log("malas");',
    delay: 0.9,
    colors:
      "text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    position: "top-[5%] left-[78%] max-sm:top-[1.8%] max-sm:left-[52%]",
  },
  {
    text: "if (mood === 'malas') sleep();",
    delay: 0.2,
    colors:
      "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    position: "top-[9%] left-[5%] max-sm:top-[3.2%] max-sm:left-[12%]",
  },
];

export default function FloatingTexts() {
  return (
    <>
      {floatingItems.map((item, index) => (
        <motion.span
          key={index}
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: item.delay },
          }}
          className={cn(
            "absolute z-[-1] font-mono backdrop-blur border rounded-xl shadow transition-all duration-300 p-2 opacity-50",
            "text-xs sm:text-sm",
            item.colors,
            item.position,
            jetbrainsMono.className
          )}
        >
          {item.text}
        </motion.span>
      ))}
    </>
  );
}
