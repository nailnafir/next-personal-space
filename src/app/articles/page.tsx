"use client";

import { Suspense, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import ArticlesSection from "@/layouts/articles-section";

export default function Page() {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="fixed top-0 left-0 w-full z-[9999]">
          <Progress value={progress} className="h-[3px] bg-transparent" />
        </div>
      }
    >
      <ArticlesSection />
    </Suspense>
  );
}
