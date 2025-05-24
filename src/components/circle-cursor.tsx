"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CircleCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseDown = () => setCursorVariant("click");
    const mouseUp = () => setCursorVariant("default");
    const mouseEnterLink = () => setCursorVariant("hover");
    const mouseLeaveLink = () => setCursorVariant("default");

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((link) => {
      link.addEventListener("mouseenter", mouseEnterLink);
      link.addEventListener("mouseleave", mouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", mouseEnterLink);
        link.removeEventListener("mouseleave", mouseLeaveLink);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(138, 43, 226, 0.2)",
      border: "1px solid rgba(138, 43, 226, 0.5)",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(138, 43, 226, 0.4)",
      border: "1px solid rgba(138, 43, 226, 0.8)",
      transition: {
        type: "spring",
        mass: 0.6,
        duration: 0.1,
      },
    },
  };

  return (
    <>
      <motion.div
        className="custom-cursor-outer fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="custom-cursor-inner fixed top-0 left-0 rounded-full pointer-events-none z-50 bg-white hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          mass: 0.2,
        }}
        style={{ width: 8, height: 8 }}
      />
    </>
  );
}
