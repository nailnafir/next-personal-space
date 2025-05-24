"use client";

import { motion, TargetAndTransition } from "framer-motion";
import { LucideIcon } from "lucide-react";

type FloatingIconProps = {
  Icon: LucideIcon;
  className: string;
  color: string;
  delay: number;
};

const floatingAnimation: TargetAndTransition = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

export default function FloatingIcon({
  Icon,
  className,
  color,
  delay,
}: FloatingIconProps) {
  return (
    <motion.div
      animate={{
        ...floatingAnimation,
        transition: { ...floatingAnimation.transition, delay },
      }}
      className={`absolute z-[-1] ${className}`}
    >
      <Icon className={`w-12 h-12 opacity-20 ${color}`} />
    </motion.div>
  );
}
