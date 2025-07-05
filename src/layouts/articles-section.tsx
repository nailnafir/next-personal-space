"use client";

import { useState } from "react";
import { ArticlesResponse } from "@/model/models";
import { readArticles } from "@/lib/service/endpoints";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, RefreshCcw, Search } from "lucide-react";
import { orderBySelects, sortBySelects } from "@/lib/data/selects";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ArticleItemCard from "@/components/article-item-card";
import useSWR from "swr";

export default function ArticlesSection() {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>(sortBySelects[0].value);
  const [orderBy, setOrderBy] = useState<string>(orderBySelects[0].value);

  const selectedSort = sortBySelects.find((item) => item.value === sortBy);
  const selectedOrder = orderBySelects.find((item) => item.value === orderBy);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const query = `page=${page}&limit=${limit}`;

  const userId = null;

  const {
    data: articles,
    mutate,
    isLoading,
    error,
  } = useSWR<ArticlesResponse>(`/api/articles`, () => readArticles(query), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const filteredArticles = articles?.articles.filter((article) => {
    if (!article) return false;

    const title = article.title?.toLowerCase() || "";
    const subtitle = article.subtitle?.toLowerCase() || "";
    const author = article.author?.name?.toLowerCase() || "";

    return (title + subtitle + author).includes(search.toLowerCase());
  });

  const handleRetry = async () => {
    const retryPromise = (async () => {
      const data = await mutate();

      if (!data) {
        throw new Error(error);
      }

      return data;
    })();

    toast.promise(retryPromise, {
      loading: "Menghubungkan...",
      success: () => {
        return `Berhasil terhubung ke server, data ditampilin!`;
      },
      error: (error) => {
        return `Servernya gak mau terhubung, ada masalah: ${
          error instanceof Error ? error.message : "Masalah tidak diketahui"
        }`;
      },
    });
  };

  return (
    <div
      id="artikel"
      className="relative min-h-screen overflow-visible select-none"
    >
      <div className="flex flex-col items-center justify-center px-4 py-4">
        <div className="w-full max-w-full mx-auto my-8 space-y-4 text-center sm:max-w-6xl sm:space-y-8">
          <div className="flex flex-row items-center justify-between w-full overflow-auto">
            <div className="relative w-1/3">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari artikel atau penulis...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-10 py-2 text-sm border rounded-lg bg-background text-foreground border-ring focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="relative flex flex-row items-center justify-end w-full gap-4">
              <span className="text-xl font-semibold">
                Urutkan:{" "}
              </span>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger className="!bg-foreground !text-muted data-[placeholder]:!text-muted [&_svg:not([class*='text-'])]:!text-muted font-semibold rounded-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {selectedSort?.icon && (
                        <selectedSort.icon className="w-4 h-4" />
                      )}
                      <span>{selectedSort?.title}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-background/75 backdrop-blur">
                  <SelectGroup>
                    {sortBySelects.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={orderBy}
                onValueChange={(value) => setOrderBy(value)}
              >
                <SelectTrigger className="!bg-foreground !text-muted data-[placeholder]:!text-muted [&_svg:not([class*='text-'])]:!text-muted font-semibold rounded-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {selectedOrder?.icon && (
                        <selectedOrder.icon className="w-4 h-4" />
                      )}
                      <span>{selectedOrder?.title}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-background/75 backdrop-blur">
                  <SelectGroup>
                    {orderBySelects.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-wrap items-center justify-center gap-4 py-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
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
              <AlertDescription className="flex flex-col items-center justify-center text-base">
                <div className="w-full">
                  Tidak dapat menampilkan data{" "}
                  <span className="font-bold">&apos;artikel&apos;</span> karena
                  gagal menghubungkan ke <span className="italic">server</span>.
                  Periksa koneksi internet dan pastikan sudah terhubung
                </div>
                <Button
                  variant="destructive"
                  className="mt-8 w-52"
                  onClick={handleRetry}
                  disabled={isLoading}
                >
                  <RefreshCcw />
                  <span>Coba Lagi</span>
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
                <div className="flex flex-wrap items-center justify-center gap-4 py-6">
                  <AnimatePresence>
                    {filteredArticles?.map((article) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArticleItemCard article={article} userId={userId} />
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
