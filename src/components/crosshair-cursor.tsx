"use client";

import { useMobile } from "@/hooks/use-mobile";
import { useEffect, useRef, useState } from "react";

export function CrosshairCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [hoverTarget, setHoverTarget] = useState<DOMRect | null>(null);

  const isMobile = useMobile();

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      const dot = dotRef.current;

      if (!cursor || !dot) return;

      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      if (hoverTarget) {
        cursor.style.transition = "all 300ms ease";
        cursor.style.left = `${hoverTarget.left}px`;
        cursor.style.top = `${hoverTarget.top}px`;
        cursor.style.width = `${hoverTarget.width}px`;
        cursor.style.height = `${hoverTarget.height}px`;
      } else {
        cursor.style.transition = "none";
        cursor.style.left = `${e.clientX - 20}px`;
        cursor.style.top = `${e.clientY - 20}px`;
        cursor.style.width = `40px`;
        cursor.style.height = `40px`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor-target]");
      if (target) {
        setHoverTarget(target.getBoundingClientRect());
      } else {
        setHoverTarget(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [hoverTarget]);

  if (isMobile) return;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed z-[999] pointer-events-none"
        style={{
          transformOrigin: "center",
          willChange: "transform, width, height",
        }}
      >
        <div className="absolute top-0 left-0 w-2 h-[2px] bg-foreground" />
        <div className="absolute top-0 right-0 w-2 h-[2px] bg-foreground" />
        <div className="absolute bottom-0 left-0 w-2 h-[2px] bg-foreground" />
        <div className="absolute bottom-0 right-0 w-2 h-[2px] bg-foreground" />
        <div className="absolute top-0 left-0 w-[2px] h-2 bg-foreground" />
        <div className="absolute top-0 right-0 w-[2px] h-2 bg-foreground" />
        <div className="absolute bottom-0 left-0 w-[2px] h-2 bg-foreground" />
        <div className="absolute bottom-0 right-0 w-[2px] h-2 bg-foreground" />
      </div>

      <div
        ref={dotRef}
        className="fixed z-[9999] w-[4px] h-[4px] rounded-full bg-foreground pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
