"use client";

import { motion, type TargetAndTransition } from "motion/react";
import { Code, Database, Globe, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const floatingAnimation: TargetAndTransition = {
  y: [0, -12, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const floatingIcons: Array<{
  icon: LucideIcon;
  delay: number;
  colors: string;
  position: string;
}> = [
  {
    icon: Code,
    delay: 1.5,
    colors:
      "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    position: "top-[1%] left-[60%] max-sm:top-[0.3%] max-sm:left-[87%]",
  },
  {
    icon: Database,
    delay: 0.9,
    colors:
      "text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    position: "top-[5%] left-[18%] max-sm:top-[1.8%] max-sm:left-[18%]",
  },
  {
    icon: Globe,
    delay: 0.2,
    colors:
      "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    position: "top-[9%] left-[72%] max-sm:top-[2.9%] max-sm:left-[78%]",
  },
];

export default function FloatingIcons() {
  return (
    <>
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            animate={{
              ...floatingAnimation,
              transition: {
                ...floatingAnimation.transition,
                delay: item.delay,
              },
            }}
            className={cn(
              "absolute z-[-1] backdrop-blur border rounded-xl shadow transition-all duration-300 p-2 opacity-50",
              item.colors,
              item.position
            )}
          >
            <Icon className="w-4 h-4 sm:w-8 sm:h-8" />
          </motion.div>
        );
      })}
    </>
  );
}
