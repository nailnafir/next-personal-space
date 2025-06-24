import Link from "next/link";
import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";

const audioWide = Audiowide({
  weight: "400",
});

export default function Logo() {
  return (
    <Link href="/">
      <span
        className={cn(
          "flex flex-row items-center justify-center w-fit gap-1 text-xl text-center font-bold text-foreground",
          audioWide.className
        )}
      >
        <span>{`</>`}</span>
        <span>nailnafir</span>
      </span>
    </Link>
  );
}
