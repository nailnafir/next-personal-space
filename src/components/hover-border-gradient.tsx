"use client";

import { useState, useEffect, useRef, useCallback, ElementType } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255,255,255,0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255,255,255,0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255,255,255,0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255,255,255,0) 100%)",
};

const highlight =
  "radial-gradient(75% 181.16% at 50% 50%, #F8DA32FF 0%, rgba(255,255,255,0) 100%)";

type HoverBorderGradientProps = {
  as?: ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default function HoverBorderGradient({
  children,
  as: Tag = "button",
  containerClassName,
  className,
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<HoverBorderGradientProps>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const rotateDirection = useCallback(
    (current: Direction): Direction => {
      const index = directions.indexOf(current);
      const next = clockwise
        ? (index - 1 + directions.length) % directions.length
        : (index + 1) % directions.length;
      return directions[next];
    },
    [clockwise]
  );

  useEffect(() => {
    if (!hovered) {
      intervalRef.current = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, duration * 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered, duration, rotateDirection]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex w-fit h-min flex-col items-center justify-center gap-10 overflow-visible rounded-full border p-px transition duration-500 content-center bg-black/20 hover:bg-black/10 dark:bg-white/20",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 w-auto rounded-[inherit] bg-black px-4 py-2 text-white",
          className
        )}
      >
        {children}
      </div>

      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{
          filter: "blur(2px)",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />

      <div className="absolute inset-[2px] z-1 flex-none rounded-[100px] bg-black" />
    </Tag>
  );
}