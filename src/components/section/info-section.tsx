import { motion } from "motion/react";
import { Hammer, Palette, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import InfoCard from "@/components/info-card";
import Image from "next/image";
import BackgroundGradient from "@/components/background-gradient";
import TypeWriter from "@/components/type-writer";

export default function InfoSection() {
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
    <section className="h-[calc(100dvh-64px)] flex flex-col items-center justify-center sm:px-32 px-4 py-4 sm:py-8">
      <div className="text-center max-w-full sm:max-w-6xl w-full mx-auto space-y-4 sm:space-y-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="flex justify-center"
        >
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="block font-bold my-2">
            <AnimatedGradientText>Nailul Firdaus</AnimatedGradientText>
          </span>
          <span className="block font-light sm:text-xl lg:text-2xl max-w-2xl mx-auto px-4 text-gray-600 dark:text-gray-400">
            <TypeWriter sentences={jobs} />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="justify-center items-center flex flex-wrap gap-4 sm:mt-2 mt-12"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="flex flex-col lg:hidden sm:flex-row gap-4 justify-center sm:mt-8 mt-12"
        >
          <Button
            variant="default"
            onClick={() => window.open("https://t.me/nailnafir", "_blank")}
            className="animate-pulse  gap-2 rounded-full dark:bg-white dark:hover:bg-white bg-black hover:bg-black px-4 py-2"
          >
            <span className="text-sm text-white dark:text-black font-semibold">
              Ngobrol, Yuk!
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
