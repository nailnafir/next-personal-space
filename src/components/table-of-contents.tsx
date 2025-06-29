"use client";

import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TableOfContentsProps {
  sections: string[] | undefined;
}

export default function TableOfContents({
  sections,
}: TableOfContentsProps): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (!sections || sections.length === 0) {
        setActiveSection("");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);
  return (
    <Card className="transition-all duration-300 border rounded-xl bg-background">
      <CardHeader>
        <CardTitle>Daftar Isi ({sections?.length})</CardTitle>
        <CardDescription>
          Panduan cepat ke bagian penting dari artikel ini
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {sections?.map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className={cn(
                "px-3 rounded-xl py-2 text-sm transition",
                activeSection === section
                  ? "text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {section}
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        Otomatis aktif kalo scroll atau klik ke bagian itu
      </CardFooter>
    </Card>
  );
}
