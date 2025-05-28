"use client";

import { useEffect, useState } from "react";
import { animate } from "motion/react";

export function useCount(end: number, duration = 1.5) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, end, {
      duration,
      onUpdate: (value) => setValue(Math.floor(value)),
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [end, duration]);

  return value;
}
