"use client";

import { useState } from "react";
import {
  encodeId,
  formatTimeRelativeIndonesia,
  getInitialName,
  getSupabaseURL,
} from "@/lib/utils";
import { ArticlesResponse } from "@/model/models";
import { readArticles } from "@/lib/service/endpoints";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowUp,
  Eye,
  Heart,
  RefreshCcw,
  Search,
  Tag,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ArticlesPage() {
  const [search, setSearch] = useState<string>("");

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const query = `page=${page}&limit=${limit}`;

  const { data, mutate, isLoading, error } = useSWR<ArticlesResponse>(
    `/api/articles/`,
    () => readArticles(query),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const filteredArticles = data?.articles.filter((article) => {
    if (!article) return false;

    const title = article.title?.toLowerCase() || "";
    const subtitle = article.subtitle?.toLowerCase() || "";
    const author = article.author?.name?.toLowerCase() || "";

    return (title + subtitle + author).includes(search.toLowerCase());
  });

  const handleRetry = async () => {
    toast.promise(() => mutate(), {
      loading: "Menghubungkan...",
      success: "Berhasil terhubung ke server!",
      error: (err) =>
        `Server gak bisa diakses: ${
          err instanceof Error ? err.message : "Masalah tidak diketahui"
        }`,
    });
  };

  return (
    <div className="relative min-h-screen overflow-visible select-none">
      <div className="flex flex-col items-center justify-center px-4 py-4">
        <div className="w-full max-w-full mx-auto my-8 space-y-4 text-center sm:max-w-6xl sm:space-y-8">
          <div className="relative w-full mb-6">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari artikel atau penulis...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-10 py-2 text-sm border rounded-lg bg-background text-foreground border-ring focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {isLoading ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full sm:w-[23rem] h-96 rounded-xl"
                />
              ))}
            </div>
          ) : error ? (
            <Alert
              variant="destructive"
              className="flex flex-col items-center justify-center p-6 border bg-background/50 rounded-xl backdrop-blur border-ring/50"
            >
              <AlertCircle className="!size-24 mb-8 animate-pulse" />
              <AlertTitle className="text-3xl font-bold">
                Terjadi Kesalahan
              </AlertTitle>
              <AlertDescription className="text-base">
                Tidak bisa konek ke server. Cek internet lo dulu ya
                <Button
                  variant="destructive"
                  className="mt-8 w-52"
                  onClick={handleRetry}
                  disabled={isLoading}
                >
                  <RefreshCcw className="mr-2" />
                  Coba Lagi
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <AnimatePresence mode="wait">
              {filteredArticles?.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <DotLottieReact
                      src="/assets/illustrations/empty.lottie"
                      loop
                      autoplay
                      className="items-center h-52 w-96"
                    />
                    <p className="text-3xl font-bold text-foreground">
                      Yah! Belum ada artikel nih
                    </p>
                    <p className="text-base text-muted-foreground">
                      Hasil pencarian kosong. Coba cari kata lain ya bre.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <AnimatePresence>
                    {filteredArticles?.map((article) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="transition duration-300 hover:scale-105 w-full sm:w-[23rem]">
                          <CardHeader className="flex-1 p-4 space-y-2">
                            <CardTitle className="text-lg line-clamp-2">
                              {article.title}
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-3">
                              {article.subtitle}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-4 pb-4 text-xs text-muted-foreground">
                            <div className="flex flex-wrap justify-center gap-2">
                              {article.tags?.map((tag, indexBadge) => (
                                <Badge key={indexBadge}>
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                            {article.thumbnailUrl && (
                              <Image
                                src={getSupabaseURL(article.thumbnailUrl)}
                                alt={article.title || "Artikel"}
                                width={280}
                                height={48}
                                className="object-cover w-full h-48 rounded-xl"
                              />
                            )}
                            <div className="flex justify-between">
                              <div className="flex flex-row gap-2">
                                <Avatar>
                                  <AvatarImage
                                    src={getSupabaseURL(
                                      article.author?.photoUrl
                                    )}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {getInitialName(article.author?.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start">
                                  <h4 className="text-sm font-medium text-foreground">
                                    {article.author?.name ||
                                      "Pengguna Misterius"}
                                  </h4>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimeRelativeIndonesia(
                                      article.publishedAt
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {article.likes} Suka
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {article.views} Dibaca
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              asChild
                              className="w-full gap-2 rounded-full"
                            >
                              <Link href={`/articles/${encodeId(article.id)}`}>
                                <ArrowUp className="w-4 h-4" />
                                Kunjungi
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
