import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { infos, jobs } from "@/lib/data/infos";
import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import BackgroundGradient from "@/components/aceternity/background-gradient";
import TypeWriter from "@/components/type-writer";
import Image from "next/image";

export default function InfoSection() {
  return (
    <section className="h-[calc(100dvh-64px)] flex flex-col items-center justify-center sm:px-32 px-4 py-4 sm:py-8">
      <div className="text-center max-w-full sm:max-w-6xl w-full mx-auto space-y-4 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="flex justify-center"
        >
          <BackgroundGradient className="rounded-3xl max-w-sm p-2 transition duration-300 bg-white dark:bg-black">
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
          className="flex flex-wrap items-center sm:justify-center justify-between gap-4 sm:mt-2 mt-12 w-full"
        >
          {infos.map((info, index) => (
            <Card
              key={index}
              data-cursor-target
              className="relative bg-white dark:bg-black hover:bg-black/5 hover:dark:bg-white/5 transition-all duration-300 ease-in-out backdrop-blur"
            >
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <CardContent>
                <div className="bg-black/10 dark:bg-white/10 p-4 mb-6 rounded-full">
                  <info.icon className="text-black dark:text-white" />
                </div>
                <NumberTicker
                  value={info.count}
                  className="text-3xl font-bold text-black dark:text-white"
                />
                <p className="text-sm text-black dark:text-white">
                  {info.title}
                </p>
              </CardContent>
            </Card>
          ))}
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
            className="animate-border-pulse gap-2 rounded-full transition duration-300 dark:bg-white dark:hover:bg-white bg-black hover:bg-black px-4 py-2"
          >
            <MessageSquare className="text-white dark:text-black" />
            <span className="text-sm text-white dark:text-black font-semibold">
              Ngobrol, Yuk!
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
