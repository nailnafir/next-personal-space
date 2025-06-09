import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { infos, jobs } from "@/lib/data/infos";
import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import TypeWriter from "@/components/type-writer";

export default function InfoSection() {
  return (
    <section className="sm:h-[calc(100dvh-64px)] flex flex-col items-center px-8 py-8">
      <div className="w-full max-w-full mx-auto text-center sm:max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="text-3xl font-bold tracking-tight sm:mt-[660px] mt-[340px] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block font-bold">
            <AnimatedGradientText>Nailul Firdaus</AnimatedGradientText>
          </span>
          <span className="block text-xl font-light text-muted-foreground sm:text-2xl">
            <TypeWriter sentences={jobs} />
          </span>
        </motion.h1>
      </div>
      <div className="w-full max-w-full mx-auto text-center sm:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="grid justify-center grid-cols-3 gap-4 mt-2 sm:mt-8"
        >
          {infos.map((info, index) => (
            <Card
              key={index}
              className="relative items-center transition-all duration-300 ease-in-out bg-transparent hover:bg-foreground/10 backdrop-blur text-foreground"
            >
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <CardContent>
                <div className="items-center justify-center hidden p-4 mb-6 rounded-full sm:flex bg-foreground/10">
                  <info.icon />
                </div>
                <NumberTicker
                  value={info.count}
                  className="text-3xl font-bold"
                />
                <p className="text-sm">{info.title}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
      <div className="w-full max-w-full mx-auto text-center sm:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="flex flex-col justify-center gap-4 mt-8 lg:hidden"
        >
          <Button
            variant="default"
            onClick={() => window.open("https://t.me/nailnafir", "_blank")}
            className="gap-2 px-4 py-2 transition duration-300 rounded-full animate-border-pulse bg-foreground hover:bg-foreground/75"
          >
            <MessageSquare className="text-background" />
            <span className="text-sm font-semibold text-background">
              Ngobrol, Yuk!
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
