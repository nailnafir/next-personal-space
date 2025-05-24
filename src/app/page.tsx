"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  motion,
  Variants,
} from "motion/react";
import {
  Bug,
  Cloud,
  Code,
  Cpu,
  Database,
  Globe,
  Hammer,
  MessageSquare,
  Palette,
  PenLine,
  Server,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundGrid } from "@/components/background-grid";
import InfoCard from "@/components/info-card";
import Image from "next/image";
import { BackgroundGradient } from "@/components/background-gradient";
import { TypeWriter } from "@/components/type-writer";
import FloatingIcon from "@/components/floating-icon";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const jobs: string[] = [
    "Software Engineer",
    "UIX Designer",
    "Lifetime Learner",
  ];

  const applications = [
    "Application 1",
    "Application 2",
    "Application 3",
    "Application 4",
    "Application 5",
  ];
  const designs = ["Design 1", "Design 2", "Design 3"];
  const blogs = [
    "Blog 1",
    "Blog 2",
    "Blog 3",
    "Blog 4",
    "Blog 5",
    "Blog 6",
    "Blog 7",
    "Blog 8",
  ];

  return (
    <div className="min-h-screen bg-transparent dark:text-white text-black overflow-visible select-none">
      <BackgroundGrid />

      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <motion.section className="h-[96vh] flex flex-col items-center justify-center px-4 py-6 sm:py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-full sm:max-w-4xl mx-auto space-y-8 sm:space-y-12"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <BackgroundGradient className="rounded-3xl max-w-sm p-2 bg-white dark:bg-black">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/nailnafir-personal-space.appspot.com/o/images%2Fme.png?alt=media&token=73c44a5d-424c-4318-99ad-5a5ad6055811"
                  width={150}
                  height={250}
                  className="rounded-xl object-cover"
                  alt="thumbnail"
                />
              </BackgroundGradient>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="block my-2 bg-gradient-to-r from-sky-500 via-yellow-500 to-sky-500 text-transparent bg-clip-text animate-shimmer bg-[length:200%_100%]">
                Nailul Firdaus
              </span>
              <span className="block font-light sm:text-xl lg:text-2xl max-w-2xl mx-auto px-4 text-gray-600 dark:text-gray-400">
                <TypeWriter sentences={jobs} />
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <InfoCard
                count={applications.length}
                icon={Hammer}
                iconColor="text-blue-700 dark:text-blue-500"
                label="Aplikasi"
              />
              <InfoCard
                count={designs.length}
                icon={Palette}
                iconColor="text-red-700 dark:text-red-500"
                label="Desain"
              />
              <InfoCard
                count={blogs.length}
                icon={PenLine}
                iconColor="text-green-700 dark:text-green-500"
                label="Blog"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col lg:hidden sm:flex-row gap-4 justify-center px-4 mt-8"
            >
              <Button
                size="lg"
                className="w-full rounded-full sm:w-auto mt-4 sm:mt-8 border-2 text-base p-4 h-auto group relative overflow-hidden border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black bg-transparent"
                onClick={() => window.open("https://t.me/nailnafir", "_blank")}
              >
                <span className="relative z-10 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Ngobrol, Yuk!
                </span>
                <span className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 bg-black dark:bg-white" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingIcon
              Icon={Code}
              className="top-[20%] left-[10%]"
              color="text-purple-700 dark:text-purple-500"
              delay={0}
            />
            <FloatingIcon
              Icon={Terminal}
              className="top-[30%] right-[15%]"
              color="text-blue-700 dark:text-blue-500"
              delay={0.5}
            />
            <FloatingIcon
              Icon={Database}
              className="bottom-[25%] left-[20%]"
              color="text-green-700 dark:text-green-500"
              delay={1}
            />
            <FloatingIcon
              Icon={Globe}
              className="bottom-[15%] right-[10%]"
              color="text-pink-700 dark:text-pink-500"
              delay={1.5}
            />
            <FloatingIcon
              Icon={Bug}
              className="top-[10%] right-[30%]"
              color="text-red-700 dark:text-red-500"
              delay={2}
            />
            <FloatingIcon
              Icon={Server}
              className="bottom-[10%] left-[5%]"
              color="text-yellow-700 dark:text-yellow-500"
              delay={2.5}
            />
            <FloatingIcon
              Icon={Cpu}
              className="top-[40%] left-[30%]"
              color="text-orange-700 dark:text-orange-500"
              delay={3}
            />
            <FloatingIcon
              Icon={Cloud}
              className="bottom-[35%] right-[25%]"
              color="text-cyan-700 dark:text-cyan-500"
              delay={3.5}
            />
          </div>
        </motion.section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
