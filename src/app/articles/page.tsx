"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { encodeId } from "@/lib/utils";

type Article = {
  id: number;
  title: string;
  subtitle: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "Belajar React Dasar",
    subtitle: "Panduan lengkap buat pemula yang baru nyemplung ke React",
  },
  {
    id: 2,
    title: "Next.js 14 Update",
    subtitle: "Fitur baru, routing modern, dan App Router explained",
  },
  {
    id: 3,
    title: "Tailwind CSS Tips",
    subtitle: "Styling cepat tanpa pusing mikirin class CSS",
  },
  {
    id: 4,
    title: "Optimasi SEO di Blog Tech",
    subtitle: "Cara naikkin ranking blog lo di Google tanpa jadi tukang spam",
  },
];

export default function ArticlesPage() {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter((article) =>
    (article.title + article.subtitle)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-visible select-none">
      <div className="flex flex-col items-center justify-center px-4 py-4">
        <div className="w-full max-w-full mx-auto space-y-4 text-center sm:max-w-2xl sm:space-y-8">
          <div className="relative w-full mb-6">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-background text-foreground border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {filteredArticles.length === 0 ? (
            <p className="text-muted-foreground">
              Gak nemu artikel yang cocok, nih. Coba cari yang lain
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/articles/${encodeId(article.id)}`}>
                  <Card className="transition cursor-pointer hover:shadow-md">
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>{article.subtitle}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
