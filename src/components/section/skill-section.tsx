import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { skills } from "@/lib/data/skills";

export default function SkillSection() {
  return (
    <section
      id="kemampuan"
      className="sm:h-dvh flex flex-col items-center justify-center sm:px-32 px-4 py-4 sm:py-8"
    >
      <div className="text-center max-w-full sm:max-w-6xl w-full mx-auto space-y-4 sm:space-y-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="flex justify-center"
        >
          <div className="p-8 justify-center rounded-xl border-1 w-full bg-white/50 dark:bg-black/50 backdrop-blur border-gray-200 dark:border-gray-800 text-black dark:text-white">
            <h3 className="text-3xl font-bold">
              &quot;Keinginan: Pro Gamer, Kenyataan: Programmer&quot;
            </h3>
            <p className="mt-8 text-base text-gray-600 dark:text-gray-400">
              Kalo dulu <i>push-up</i> & <i>push-rank</i>, sekarang malah{" "}
              <i>push code</i> & <i>push commit</i>. Mulai dari <i>Front-End</i>{" "}
              sampe <i>Back-End</i>, dari Bootstrap sampe Tailwind, dari React
              sampe Laravel, dari Jetpack Compose sampe Flutter, dari JSON sampe
              SQL, semua udah pernah dicicip.
              <i>Clean architecture</i>, <i>modular codebase</i>, dan{" "}
              <i>reusable component</i> itu udah standarnya. Setiap <i>commit</i>{" "}
              ada alasan & setiap <i>deploy</i> ada tujuan.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              {skills.map((social, index) => (
                <Card
                  key={index}
                  className="relative bg-transparent hover:dark:bg-white/10 transition-all duration-500 ease-in-out"
                >
                  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  <CardContent>
                    <social.icon className="w-8 h-8" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
