import { toast } from "sonner";
import { WorksResponse } from "@/model/models";
import { readWorks } from "@/lib/service/endpoints";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AlertCircle, ArrowUp, RefreshCcw, X } from "lucide-react";
import { getSupabaseURL } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/aceternity/three-dimension-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function WorksSection() {
  const {
    data: works,
    error,
    isLoading,
    mutate,
  } = useSWR<WorksResponse[]>("/api/works", readWorks, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [category, setCategory] = useState<"all" | string>("all");
  const [type, setType] = useState<"all" | string>("all");

  const categories = [
    ...new Set(works?.map((work) => work.category?.name) || []),
  ];

  const types = [...new Set(works?.map((work) => work.type?.name) || [])];

  useEffect(() => {
    if (category === "all" && type === "all") {
      return;
    }

    const showFilterToast = () => {
      if (category === "all" && type === "all") {
        toast.info("Menampilkan semua karya");
      } else if (category !== "all" && type === "all") {
        toast.info(`Menampilkan kategori: ${category}`);
      } else if (category === "all" && type !== "all") {
        toast.info(`Menampilkan tipe: ${type}`);
      } else {
        toast.info(`Menampilkan kategori: ${category} dan tipe: ${type}`);
      }
    };

    showFilterToast();
  }, [category, type]);

  const filteredWorks = works?.filter((work) => {
    const matchCategory =
      category === "all" || work.category?.name === category;
    const matchType = type === "all" || work.type?.name === type;

    return matchCategory && matchType;
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
    <section
      id="karya"
      className="flex flex-col items-center justify-center px-4 py-4"
    >
      <div className="w-full max-w-full mx-auto mt-8 space-y-4 text-center sm:max-w-6xl sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="flex flex-col justify-center"
        >
          <h3 className="my-8 text-3xl font-bold">
            &quot;Yang Muda, Yang Berkarya&quot;
          </h3>

          {isLoading ? (
            <div className="flex flex-row justify-center gap-4 mb-6 overflow-auto">
              {Array.from({ length: 2 }).map((_, indexElement) => (
                <Skeleton
                  key={indexElement}
                  className="w-56 h-10 rounded-full"
                />
              ))}
            </div>
          ) : (
            !error && (
              <div className="flex flex-row justify-center gap-4 mb-6 overflow-auto">
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="!bg-foreground !text-muted data-[placeholder]:!text-muted [&_svg:not([class*='text-'])]:!text-muted font-semibold rounded-full">
                    <SelectValue>
                      {category === "all" ? "Semua Kategori" : category}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-background/75 backdrop-blur">
                    <SelectGroup>
                      <SelectLabel>Kategori</SelectLabel>
                      {categories.map((category) => {
                        if (!category) return null;

                        return (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select value={type} onValueChange={(value) => setType(value)}>
                  <SelectTrigger className="!bg-foreground !text-muted data-[placeholder]:!text-muted [&_svg:not([class*='text-'])]:!text-muted font-semibold rounded-full">
                    <SelectValue>
                      {type === "all" ? "Semua Tipe" : type}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-background/75 backdrop-blur">
                    <SelectGroup>
                      <SelectLabel>Tipe</SelectLabel>
                      {types.map((type) => {
                        if (!type) return null;

                        return (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {(category !== "all" || type !== "all") && (
                  <Button
                    className="relative transition duration-300 rounded-full bg-primary-foreground hover:bg-primary-foreground/75"
                    onClick={() => {
                      setCategory("all");
                      setType("all");

                      toast.info("Pilihan dihapus. Menampilkan semua karya");
                    }}
                  >
                    <ShineBorder
                      shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    />
                    <X className="w-4 h-4 text-primary" />
                    <span className="hidden sm:inline text-primary">Hapus</span>
                  </Button>
                )}
              </div>
            )
          )}

          <div className="flex flex-wrap justify-center w-full gap-4">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="contents"
                >
                  {Array.from({ length: 6 }).map((_, indexElement) => (
                    <div
                      key={indexElement}
                      className="w-full sm:w-full md:w-[48.6%] lg:w-[32.3%] animate-none rounded-xl border-1 hover:shadow-xl shadow-foreground/25 bg-background/50 border-ring/50 backdrop-blur p-6 h-[30rem] flex flex-col gap-4 relative"
                    >
                      <Skeleton className="w-3/4 h-6 mx-auto" />
                      <Skeleton className="w-5/6 h-4 mx-auto" />
                      <Skeleton className="w-full mt-4 h-36 rounded-xl" />

                      <div className="flex justify-center gap-2 my-6">
                        {Array.from({ length: 4 }).map((_, indexIcon) => (
                          <Skeleton
                            key={indexIcon}
                            className="w-8 h-8 rounded-full"
                          />
                        ))}
                      </div>

                      <div className="absolute left-0 w-full px-4 bottom-6">
                        <Skeleton className="w-full h-8 rounded-xl" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="contents"
                >
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
                        <span className="font-bold">&apos;karya&apos;</span>{" "}
                        karena gagal menghubungkan ke{" "}
                        <span className="italic">server</span>. Periksa koneksi
                        internet dan pastikan sudah terhubung
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
                </motion.div>
              ) : filteredWorks?.length === 0 ? (
                <motion.div
                  key="empty"
                  className="w-full mt-10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center justify-center w-full p-8 transition-all duration-300 shadow-xl bg-background/50 text-foreground border-ring/50 shadow-background/5 rounded-xl border-1 backdrop-blur">
                    <DotLottieReact
                      src="/assets/illustrations/empty.lottie"
                      loop
                      autoplay
                      className="items-center h-52 w-96"
                    />
                    <p className="text-3xl font-bold text-foreground">
                      Yah! Belum ada karya nih
                    </p>
                    <p className="text-base text-muted-foreground">
                      Hasil pencarian kategori &apos;
                      {category}&apos; dan tipe &apos;
                      {type}&apos; kosong. Cari kategori dan tipe yang lain dulu
                      ya
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="works"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="contents"
                >
                  {filteredWorks?.map((filteredWork, indexWork) => (
                    <motion.div
                      key={`${indexWork}-${filteredWork.works.title}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-full sm:w-full md:w-[48.6%] lg:w-[32.3%]"
                    >
                      <CardContainer containerClassName="p-0 inter-var">
                        <CardBody className="transition duration-300 bg-background/50 relative group/card hover:shadow-xl shadow-foreground/25 border-ring/50 w-full rounded-xl p-6 h-[32rem] border-1 backdrop-blur">
                          <CardItem
                            translateZ="50"
                            className="w-full text-center"
                          >
                            <h1 className="w-full text-xl font-bold text-foreground">
                              {filteredWork.works.title}
                            </h1>
                            <p className="w-full max-w-sm mt-2 text-sm text-muted-foreground">
                              {filteredWork.works.description}
                            </p>
                          </CardItem>
                          <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                              src={getSupabaseURL(filteredWork.works.imageUrl)}
                              alt={filteredWork.works.title}
                              height="300"
                              width="300"
                              className="object-fill w-full h-48 rounded-xl group-hover/card:shadow-xl"
                            />
                            <div className="flex flex-wrap justify-center gap-2 my-6">
                              {filteredWork.tools?.map((tools, indexTool) => (
                                <div
                                  key={`${indexTool}-${tools.name}`}
                                  className="px-4 py-2 rounded-full bg-foreground/10"
                                >
                                  <Image
                                    src={`${getSupabaseURL(tools.iconUrl)}`}
                                    alt={tools.name}
                                    height="50"
                                    width="50"
                                    className="h-6"
                                  />
                                </div>
                              ))}
                            </div>
                          </CardItem>
                          <CardItem
                            translateZ="20"
                            className="absolute left-0 w-full px-6 bottom-6"
                          >
                            <Button
                              asChild
                              className="w-full gap-2 transition duration-300 rounded-full bg-primary text-background"
                            >
                              <Link
                                href={filteredWork.works.url || "#"}
                                className="w-full"
                              >
                                <ArrowUp className="text-background" />
                                <span className="text-sm font-semibold text-background">
                                  Kunjungi
                                </span>
                              </Link>
                            </Button>
                          </CardItem>
                        </CardBody>
                      </CardContainer>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
