"use client";

import { motion, TargetAndTransition } from "motion/react";
import {
  Code,
  Terminal,
  Database,
  Globe,
  Bug,
  Server,
  Cpu,
  Cloud,
  Fingerprint,
  Shield,
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
  Terminal,
  Database,
  Globe,
  Bug,
  Server,
  Cpu,
  Cloud,
  Fingerprint,
  Shield,
];
const colors = [
  "text-red-500 dark:text-red-400",
  "text-orange-500 dark:text-orange-400",
  "text-yellow-400 dark:text-yellow-300",
  "text-green-500 dark:text-green-400",
  "text-blue-500 dark:text-blue-400",
  "text-indigo-500 dark:text-indigo-400",
  "text-purple-500 dark:text-purple-400",
  "text-pink-500 dark:text-pink-400",
  "text-teal-500 dark:text-teal-400",
  "text-cyan-500 dark:text-cyan-400",
];

const positions = [
  { top: 11, left: 84, delay: 0.3 },
  { top: 24, left: 65, delay: 0.7 },
  { top: 31, left: 42, delay: 1.2 },
  { top: 37, left: 28, delay: 1.6 },
  { top: 43, left: 37, delay: 0.9 },
  { top: 54, left: 52, delay: 1.8 },
  { top: 63, left: 26, delay: 2.1 },
  { top: 66, left: 57, delay: 2.1 },
  { top: 77, left: 88, delay: 2.5 },
  { top: 72, left: 42, delay: 2.9 },
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
            <Icon className={`w-12 h-12 opacity-25 ${randomColor}`} />
          </motion.div>
        );
      })}
    </>
  );
}