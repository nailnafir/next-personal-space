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

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export default function TableOfContents({
  sections,
}: TableOfContentsProps): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
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
        <CardTitle>Daftar Isi ({sections.length})</CardTitle>
        <CardDescription>
          Panduan cepat ke bagian penting dari artikel ini
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "px-3 rounded-xl py-2 text-sm transition",
                activeSection === section.id
                  ? "text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {section.title}
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
