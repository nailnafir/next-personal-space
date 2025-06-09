"use client";

import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUp, CheckCircle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/api/fetch-projects";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/aceternity/three-dimension-card";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import Link from "next/link";

export default function ProjectSection() {
  const {
    data: projects,
    error,
    isLoading,
  } = useSWR("projects", getProjects, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [filter, setFilter] = useState<"all" | string>("all");

  const isFirstRender = useRef(true);

  const projectTypes = Array.from(
    new Set(projects?.map((project) => project.type))
  );

  const filteredProjects = projects?.filter((project) =>
    filter === "all" ? true : project.type === filter
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (filter === "all") {
      toast.info("Menampilkan semuanya");
    } else {
      toast.info(
        `Hanya menampilkan: ${
          filter
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))[0]
        }`
      );
    }
  }, [filter]);

  const handleRetry = async () => {
    try {
      toast.loading("Tunggu Sebentar", {
        id: "retry-toast",
        description: "Lagi coba hubungin ke server dulu",
      });

      await mutate("projects", getProjects());

      toast.success("Berhasil", {
        id: "retry-toast",
        description: "Udah terhubung ke server, data udah tampil!",
      });
    } catch (error) {
      toast.error("Kesalahan", {
        id: "retry-toast",
        description: `Servernya gak mau terhubung: ${error}`,
      });
    }
  };

  return (
    <section
      id="karya"
      className="flex flex-col items-center justify-center px-8 py-8"
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
              {Array.from({ length: 3 }).map((_, indexElement) => (
                <Skeleton
                  key={indexElement}
                  className="h-10 rounded-full w-52"
                />
              ))}
            </div>
          ) : (
            !error && (
              <div className="flex flex-row justify-center gap-4 mb-6 overflow-auto">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  onClick={() => setFilter("all")}
                  className="text-sm font-bold transition duration-300 rounded-full border-1 border-ring/50 backdrop-blur"
                >
                  <CheckCircle
                    className={cn("w-5 h-5", filter === "all" ? "" : "hidden")}
                  />
                  <span>Semua</span>
                </Button>
                {projectTypes.map((type, index) => (
                  <Button
                    variant={filter === type ? "default" : "outline"}
                    key={`${index}-${type}`}
                    onClick={() => setFilter(type)}
                    className="text-sm font-bold transition duration-300 rounded-full border-1 border-ring/50 backdrop-blur"
                  >
                    <CheckCircle
                      className={cn("w-5 h-5", filter === type ? "" : "hidden")}
                    />
                    <span>
                      {
                        type
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )[0]
                      }
                    </span>
                  </Button>
                ))}
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
                      className="w-full sm:w-full md:w-[48.6%] lg:w-[32.3%] animate-none rounded-xl border-1 hover:shadow-xl shadow-foreground/25 bg-transparent border-ring/50 backdrop-blur p-6 h-[30rem] flex flex-col gap-4 relative"
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
                    className="flex flex-col items-center justify-center p-6 bg-transparent border rounded-xl backdrop-blur border-ring/50"
                  >
                    <AlertCircle className="!size-24 mb-8 animate-pulse" />
                    <AlertTitle className="w-full text-3xl font-bold">
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
              ) : (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="contents"
                >
                  {filteredProjects?.map((project) => (
                    <motion.div
                      key={`${project.id}-${project.title}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-full sm:w-full md:w-[48.6%] lg:w-[32.3%]"
                    >
                      <CardContainer containerClassName="p-0 inter-var">
                        <CardBody className="transition duration-300 relative group/card hover:shadow-xl shadow-foreground/25 border-ring/50 w-full rounded-xl p-6 h-[30rem] border-1 backdrop-blur">
                          <CardItem
                            translateZ="50"
                            className="w-full text-center"
                          >
                            <h1 className="w-full text-xl font-bold text-neutral-600 dark:text-white">
                              {project.title}
                            </h1>
                            <p className="w-full max-w-sm mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                              {project.description}
                            </p>
                          </CardItem>
                          <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                              src={project.imagePath}
                              alt={project.title}
                              height="300"
                              width="300"
                              className="object-fill h-48 w-dvw rounded-xl group-hover/card:shadow-xl"
                            />
                            <div className="flex flex-wrap justify-center my-6">
                              {project.tools.map((tools) => (
                                <Image
                                  key={`${project.id}-${tools.name}`}
                                  src={tools.iconPath}
                                  alt={tools.name}
                                  height="50"
                                  width="50"
                                  className="h-8"
                                />
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
                              <Link href={project.url} className="w-full">
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
