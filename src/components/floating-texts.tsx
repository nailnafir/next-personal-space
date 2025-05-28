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
  "while(true) { sleep() }",
  "const life = undefined;",
  "if (mood === 'malas') sleep();",
  'console.log("malas sekali");',
  'throw new Error("Kopi Habis");',
  "404: 'Motivasi' Not Found",
  "void function sleep() {}",
  "error: life.exe stopped working",
  "try { work(); } catch { sleep(); }",
  "export default laziness;",
];

const colors = [
  "text-purple-700 dark:text-purple-500",
  "text-pink-600 dark:text-pink-400",
  "text-yellow-500 dark:text-yellow-400",
  "text-green-600 dark:text-green-400",
  "text-blue-600 dark:text-blue-400",
  "text-red-600 dark:text-red-400",
];

const positions = [
  { top: 13, left: 11, delay: 0.2 },
  { top: 26, left: 47, delay: 0.6 },
  { top: 32, left: 71, delay: 1.5 },
  { top: 39, left: 29, delay: 1.3 },
  { top: 44, left: 57, delay: 0.9 },
  { top: 57, left: 18, delay: 1.7 },
  { top: 61, left: 83, delay: 1.1 },
  { top: 66, left: 43, delay: 2.2 },
  { top: 72, left: 61, delay: 2.3 },
  { top: 78, left: 13, delay: 2.7 },
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
              className={`${randomColor} ${jetbrainsMono.className} text-sm font-mono opacity-25`}
            >
              {text}
            </span>
          </motion.div>
        );
      })}
    </>
  );
}
