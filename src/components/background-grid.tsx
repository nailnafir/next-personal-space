"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function BackgroundGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });
  const gridY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(((e.clientX - centerX) / centerX) * 20);
      mouseY.set(((e.clientY - centerY) / centerY) * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div className="fixed inset-0 z-0">
      <div className="absolute inset-0 dark:bg-black bg-white" />
      <motion.div
        className="absolute inset-0 bg-[length:32px_32px] bg-repeat bg-[linear-gradient(to_right,rgba(55,55,55,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(55,55,55,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
        style={{ x: gridX, y: gridY }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-transparent dark:to-transparent from-white via-transparent to-transparent" />
    </motion.div>
  );
}
