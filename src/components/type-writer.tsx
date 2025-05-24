"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  sentences: string[];
};

export function TypeWriter({ sentences }: TypewriterProps) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!hasStarted) {
      timeout = setTimeout(() => {
        setHasStarted(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const currentSentence = sentences[index];

    if (!isDeleting && charIndex <= currentSentence.length) {
      setText(currentSentence.substring(0, charIndex));
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 120);
    } else if (isDeleting && charIndex >= 0) {
      setText(currentSentence.substring(0, charIndex));
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 30);
    }

    if (!isDeleting && charIndex === currentSentence.length + 1) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % sentences.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, sentences, index, hasStarted]);

  return (
    <>
      {text}
      <span className="animate-pulse font-extrabold text-yellow-500">|</span>
    </>
  );
}
