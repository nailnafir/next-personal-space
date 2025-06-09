"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function PreLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.documentElement.classList.add("overflow-hidden");
      window.scrollTo(0, 0);
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5 }}
      onAnimationComplete={() => setIsLoading(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background sm:p-6 lg:p-8"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-1 sm:gap-2"
          >
            <span className="px-3 text-4xl font-semibold text-background sm:text-5xl lg:text-6xl bg-foreground sm:px-4">
              NAILNAFIR
            </span>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-1 rounded-full bg-gradient-to-r from-purple-500 via-yellow-500 to-purple-500"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
