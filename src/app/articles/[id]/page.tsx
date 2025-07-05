"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import TableOfContents from "@/components/table-of-contents";
import LikesComments from "@/components/likes-comments";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ArticleItemResponse, ViewItemResponse } from "@/model/models";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ClipboardCopy, RefreshCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateTimeIndonesia } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createArticleViews,
  readArticleId,
  readArticleViews,
} from "@/lib/service/endpoints";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ArticleDetailsPage() {
  const userId = null;

  const { id } = useParams();

  const { data: views } = useSWR<ViewItemResponse>(
    `/api/articles/${id}/views`,
    () => readArticleViews(id, userId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { trigger: createViews } = useSWRMutation(
    `/api/articles/${id}/views/create`,
    async () => await createArticleViews(id, userId)
  );

  const {
    data: article,
    error,
    isLoading,
    mutate,
  } = useSWR<ArticleItemResponse>(
    `/api/articles/${id}`,
    () => readArticleId(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const sections = article?.content.map((section) => section.title);

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
      success: (data) => {
        return `Berhasil terhubung ke server, data '${data?.title}' ditampilin!`;
      },
      error: (error) => {
        return `Servernya gak mau terhubung, ada masalah: ${
          error instanceof Error ? error.message : "Masalah tidak diketahui"
        }`;
      },
    });
  };

  useEffect(() => {
    createViews();
  }, [createViews]);

  return (
    <div className="transition-all duration-300 bg-background">
      <div className="px-4 mx-auto max-w-7xl">
        {isLoading ? (
          <div className="grid grid-cols-12 gap-8 py-6">
            {/* Left Table Of Contents */}
            <aside className="hidden space-y-4 lg:block lg:col-span-3">
              <Skeleton className="w-full h-12 rounded-xl" />
              <Skeleton className="w-full h-96 rounded-xl" />
            </aside>

            {/* Main Content */}
            <main className="col-span-12 space-y-6 lg:col-span-6">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-3/4 h-10" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-3/4 h-6" />
              <div className="flex py-6 my-6 space-x-4 border-t border-b">
                <div className="flex flex-wrap items-center justify-center w-full gap-4 sm:justify-between">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className="w-1/5 h-6 sm:w-1/7" />
                  ))}
                </div>
              </div>

              {/* Sections */}
              {[...Array(4)].map((_, index) => (
                <div key={index} className="pt-6 space-y-3">
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-5/6 h-4" />
                </div>
              ))}
            </main>

            {/* Right Comments */}
            <aside className="hidden space-y-4 lg:block lg:col-span-3">
              <Skeleton className="w-full h-96 rounded-xl" />
            </aside>
          </div>
        ) : error ? (
          <Alert
            variant="destructive"
            className="flex flex-col items-center justify-center p-6 border bg-background/50 rounded-xl backdrop-blur border-ring/50"
          >
            <AlertCircle className="!size-24 mb-8 animate-pulse" />
            <AlertTitle className="flex flex-col items-center justify-center w-full text-3xl font-bold">
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
          <div className="grid grid-cols-12 gap-8 py-6">
            {/* Table of contents on the left */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <Card className="mb-6 transition-all duration-300 border rounded-xl bg-background">
                  <CardContent>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href="/articles">Artikel</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{id}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </CardContent>
                </Card>

                <TableOfContents sections={sections} />
              </div>
            </aside>

            {/* Main content in the center */}
            <main className="col-span-12 mb-8 lg:col-span-6">
              <h1 className="mb-4 text-4xl font-bold">{article?.title}</h1>
              <p className="text-xl leading-relaxed text-muted-foreground">
                {article?.subtitle}
              </p>
              <div className="flex items-center py-6 my-6 border-t border-b">
                <div className="flex flex-wrap items-center justify-center w-full text-sm font-light sm:justify-between text-muted-foreground">
                  <div className="flex items-center space-x-4 text-center">
                    <span>
                      {article?.author?.name || "Penulis tidak dikenal"}
                    </span>
                    <span>•</span>
                    <span>
                      {formatDateTimeIndonesia(article?.publishedAt, "date")}
                    </span>
                    <span>•</span>
                    <span>
                      {formatDateTimeIndonesia(article?.publishedAt, "time")}
                    </span>
                    <span>•</span>
                    <span>{views?.totalViews || 0} Dibaca</span>
                  </div>
                  <div className="flex items-center space-x-4 max-sm:mt-4">
                    <Button
                      size="sm"
                      className="transition duration-300 rounded-full bg-primary hover:bg-primary/75"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Tautan artikel berhasil disalin!");
                      }}
                    >
                      <ClipboardCopy className="w-4 h-4 text-primary-foreground" />
                      <span className="text-primary-foreground">Salin</span>
                    </Button>

                    <Button
                      size="sm"
                      className="transition duration-300 rounded-full bg-primary hover:bg-primary/75"
                      onClick={() => {
                        if (navigator.share) {
                          navigator
                            .share({
                              title: article?.title || "Artikel",
                              url: window.location.href,
                            })
                            .catch(() => toast.error("Gagal membagikan link"));
                        } else {
                          toast.warning(
                            "Fitur bagikan tidak didukung di browser ini"
                          );
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4 text-primary-foreground" />
                      <span className="text-primary-foreground">Bagikan</span>
                    </Button>
                  </div>
                </div>
              </div>

              {Array.isArray(article?.content) ? (
                article.content.map((section) => (
                  <section
                    key={section.title}
                    id={section.title}
                    className="mb-12"
                  >
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      {section.title}
                    </h2>

                    {Array.isArray(section.content) &&
                      section.content.map((block, indexContent) => {
                        if (block.type === "paragraph") {
                          return (
                            <p
                              key={indexContent}
                              className={`${
                                indexContent === section.content.length - 1
                                  ? "leading-relaxed text-muted-foreground"
                                  : "mb-4 leading-relaxed text-muted-foreground"
                              }`}
                            >
                              {block.text}
                            </p>
                          );
                        }

                        if (block.type === "list") {
                          return (
                            <ul
                              key={indexContent}
                              className="mb-4 leading-relaxed list-disc list-inside text-muted-foreground"
                            >
                              {block.items.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          );
                        }

                        if (block.type === "code") {
                          return (
                            <pre
                              key={indexContent}
                              className="p-4 mb-4 overflow-x-auto text-sm rounded-md bg-muted text-foreground"
                            >
                              <code>{block.code}</code>
                            </pre>
                          );
                        }

                        if (block.type === "image") {
                          return (
                            <div key={indexContent} className="mb-4">
                              <Image
                                src={block.url}
                                alt={block.alt || ""}
                                className="h-auto max-w-full rounded-md"
                              />
                            </div>
                          );
                        }

                        return null;
                      })}
                  </section>
                ))
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  Konten artikel tidak tersedia atau rusak
                </p>
              )}
            </main>

            {/* Comments section on the right */}
            <aside className="block col-span-12 sm:col-span-3">
              <LikesComments articleId={id} authorId={article?.author?.id} />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
