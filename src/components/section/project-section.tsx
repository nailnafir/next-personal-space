"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getProjects } from "@/lib/api/fetch-projects";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/aceternity/three-dimension-card";
import Image from "next/image";
import useSWR from "swr";

export default function ProjectSection() {
  const { data: projects, error, isLoading } = useSWR("projects", getProjects);

  const [alert, setAlert] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | string>("all");

  const projectTypes = Array.from(
    new Set(projects?.map((project) => project.type))
  );

  const filteredProjects = projects?.filter((project) =>
    filter === "all" ? true : project.type === filter
  );

  useEffect(() => {
    if (error) {
      setAlert(error.message);
    } else if (projects && projects.length > 0) {
      setAlert(null);
    }
  }, [error, projects]);

  return (
    <section
      id="karya"
      className="flex flex-col items-center justify-center sm:px-32 px-4 py-4 sm:py-8"
    >
      <div className="text-center max-w-full sm:max-w-6xl w-full mx-auto space-y-4 sm:space-y-8 mt-8">
        {alert && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Terjadi Kesalahan</AlertTitle>
            <AlertDescription>{alert}</AlertDescription>
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-3xl font-bold my-8">
            &quot;Yang Muda, Yang Berkarya&quot;
          </h3>
          <div className="flex flex-row gap-4 sm:justify-center mb-6 overflow-auto">
            <Button
              onClick={() => setFilter("all")}
              className={`transition duration-300 font-bold text-sm ${
                filter === "all"
                  ? "bg-yellow-200 text-yellow-800"
                  : "dark:bg-white bg-black"
              }`}
            >
              <CheckCircle
                className={cn("w-5 h-5", filter === "all" ? "" : "hidden")}
              />
              <span>Semua</span>
            </Button>
            {projectTypes.map((type, index) => (
              <Button
                key={`${index}-${type}`}
                onClick={() => setFilter(type)}
                className={`transition duration-300 font-bold text-sm ${
                  filter === type
                    ? "bg-yellow-200 text-yellow-800"
                    : "dark:bg-white bg-black"
                }`}
              >
                <CheckCircle
                  className={cn("w-5 h-5", filter === type ? "" : "hidden")}
                />
                <span>
                  {type
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 w-full">
            <AnimatePresence mode="wait">
              {isLoading
                ? Array.from({ length: 6 }).map((_, indexElement) => (
                    <div
                      key={indexElement}
                      className="w-full sm:w-[32%] animate-none rounded-xl border hover:shadow-xl hover:shadow-black/25 dark:hover:shadow-white/25 bg-white/70 dark:bg-black/30 border-gray-200 dark:border-gray-800 backdrop-blur p-6 h-[30rem] flex flex-col gap-4 relative"
                    >
                      <Skeleton className="h-6 w-3/4 mx-auto" />
                      <Skeleton className="h-4 w-5/6 mx-auto" />
                      <Skeleton className="h-36 w-full rounded-xl mt-4" />

                      <div className="flex justify-center gap-2 my-6">
                        {Array.from({ length: 4 }).map((_, indexIcon) => (
                          <Skeleton
                            key={indexIcon}
                            className="h-8 w-8 rounded-full"
                          />
                        ))}
                      </div>

                      <div className="absolute bottom-6 left-0 w-full px-4">
                        <Skeleton className="h-8 w-full rounded-xl" />
                      </div>
                    </div>
                  ))
                : filteredProjects?.map((project) => (
                    <motion.div
                      key={`${project.id}-${project.title}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-full sm:w-[32%]"
                    >
                      <CardContainer containerClassName="p-0 inter-var">
                        <CardBody className="transition duration-300 relative group/card hover:shadow-xl hover:shadow-black/25 dark:hover:shadow-white/25 bg-white/70 dark:bg-black/30 border-gray-200 dark:border-gray-800 w-full rounded-xl p-6 h-[30rem] border backdrop-blur">
                          <CardItem
                            translateZ="50"
                            className="text-center w-full"
                          >
                            <h1 className="text-xl w-full font-bold text-neutral-600 dark:text-white">
                              {project.title}
                            </h1>
                            <p className="text-neutral-500 w-full text-sm max-w-sm mt-2 dark:text-neutral-300">
                              {project.description}
                            </p>
                          </CardItem>
                          <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                              src={project.imagePath}
                              alt={project.title}
                              height="300"
                              width="300"
                              className="h-48 w-dvw object-fill rounded-xl group-hover/card:shadow-xl"
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
                            className="w-full absolute bottom-6 left-0 px-6"
                          >
                            <Button
                              className="rounded-full gap-2 w-full bg-black transition duration-300 dark:bg-white dark:text-black"
                              onClick={() => window.open(project.url, "_blank")}
                            >
                              <ArrowUp className="text-white dark:text-black" />
                              <span className="text-sm text-white dark:text-black font-semibold">
                                Kunjungi
                              </span>
                            </Button>
                          </CardItem>
                        </CardBody>
                      </CardContainer>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
