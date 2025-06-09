"use client";

import { motion, TargetAndTransition } from "motion/react";
import {
  Code,
  Database,
  Globe,
  Cpu,
  Cloud,
  LucideIcon,
} from "lucide-react";

const floatingAnimation: TargetAndTransition = {
  y: [0, -12, 0],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

const icons: LucideIcon[] = [
  Code,
  Database,
  Globe,
  Cpu,
  Cloud,
];
const colors = [
  "text-red-500 dark:text-red-400",
  "text-green-500 dark:text-green-400",
  "text-blue-500 dark:text-blue-400",
];

const positions = [
  { top: 1, left: 92, delay: 0.3 },
  { top: 3, left: 8, delay: 1.6 },
  { top: 7, left: 16, delay: 0.7 },
  { top: 5, left: 60, delay: 0.9 },
  { top: 9, left: 78, delay: 1.2 },
];

export default function FloatingIcons() {
  return (
    <>
      {icons.map((Icon, index) => {
        const { top, left, delay } = positions[index];
        const randomColor = colors[index % colors.length];

        return (
          <motion.div
            key={index}
            animate={{
              ...floatingAnimation,
              transition: {
                ...floatingAnimation.transition,
                delay,
              },
            }}
            style={{ top: `${top}%`, left: `${left}%` }}
            className="absolute z-[-1]"
          >
            <Icon className={`w-12 h-12 opacity-10 ${randomColor}`} />
          </motion.div>
        );
      })}
    </>
  );
}
