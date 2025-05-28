"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

export function CircleCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hover" | "click"
  >("default");

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDown = useCallback(() => setCursorVariant("click"), []);
  const handleMouseUp = useCallback(() => setCursorVariant("default"), []);
  const handleMouseEnter = useCallback(() => setCursorVariant("hover"), []);
  const handleMouseLeave = useCallback(() => setCursorVariant("default"), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button']"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
  ]);

  const outerClass = (() => {
    switch (cursorVariant) {
      case "hover":
        return "w-12 h-12 border border-violet-500 bg-violet-200/20";
      case "click":
        return "w-8 h-8 border border-yellow-700 bg-yellow-400/40";
      default:
        return "w-8 h-8 border dark:border-white/30 dark:bg-white/10 border-black/30 bg-black/10";
    }
  })();

  const position = {
    x: mousePosition.x - (cursorVariant === "hover" ? 24 : 16),
    y: mousePosition.y - (cursorVariant === "hover" ? 24 : 16),
  };

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 z-50 hidden pointer-events-none md:block rounded-full ${outerClass}`}
        style={{ translateX: position.x, translateY: position.y }}
        transition={{
          type: "spring",
          mass: 0.6,
          duration: cursorVariant === "click" ? 0.1 : undefined,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 z-50 hidden pointer-events-none md:block rounded-full w-2 h-2 bg-black dark:bg-white"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "spring", mass: 0.2 }}
      />
    </>
  );
}
