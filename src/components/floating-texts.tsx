"use client";

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
  "while(true) { sleep() }",
  "if (mood === 'malas') sleep();",
  'console.log("malas");',
  'throw new Error("malas");',
];

const colors = [
  "text-red-500 dark:text-red-400",
  "text-green-500 dark:text-green-400",
  "text-blue-500 dark:text-blue-400",
];

const positions = [
  { top: 1, left: 17, delay: 1.5 },
  { top: 3, left: 66, delay: 0.6 },
  { top: 7, left: 74, delay: 1.3 },
  { top: 5, left: 23, delay: 0.9 },
  { top: 9, left: 4, delay: 0.2 },
];

export default function FloatingTexts() {
  return (
    <>
      {texts.map((text, index) => {
        const { top, left, delay } = positions[index];
        const randomColor = colors[index % colors.length];

        return (
          <motion.div
            key={index}
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay },
            }}
            style={{ top: `${top}%`, left: `${left}%` }}
            className="absolute z-[-1]"
          >
            <span
              className={`${randomColor} ${jetbrainsMono.className} text-sm font-mono opacity-10`}
            >
              {text}
            </span>
          </motion.div>
        );
      })}
    </>
  );
}
