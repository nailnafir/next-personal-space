import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { LinkPreview } from "@/components/aceternity/link-preview";
import { skills } from "@/lib/data/skills";

export default function SkillSection() {
  return (
    <section
      id="keahlian"
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
          <div className="p-8 justify-center rounded-xl border-1 w-full transition duration-300 bg-white/50 dark:bg-black/50 shadow-xl shadow-black/10 dark:shadow-white/10 backdrop-blur border-gray-200 dark:border-gray-800 text-black dark:text-white">
            <h3 className="text-3xl font-bold">
              &quot;Keinginan: Pro Gamer, Kenyataan: Programmer&quot;
            </h3>
            <p className="mt-8 text-base text-gray-600 dark:text-gray-400">
              Kalo dulu{" "}
              <span className="italic underline font-semibold">push-up</span> &{" "}
              <span className="italic underline font-semibold">push-rank</span>,
              sekarang malah{" "}
              <span className="italic underline font-semibold">push code</span>{" "}
              &{" "}
              <span className="italic underline font-semibold">
                push commit
              </span>
              . Mulai dari{" "}
              <span className="italic underline font-semibold">Front-End</span>{" "}
              sampe{" "}
              <span className="italic underline font-semibold">Back-End</span>,
              dari{" "}
              <span className="italic underline font-semibold">Bootstrap</span>{" "}
              sampe{" "}
              <span className="italic underline font-semibold">Tailwind</span>,
              dari <span className="italic underline font-semibold">React</span>{" "}
              sampe{" "}
              <span className="italic underline font-semibold">Laravel</span>,
              dari{" "}
              <span className="italic underline font-semibold">
                Jetpack Compose
              </span>{" "}
              sampe{" "}
              <span className="italic underline font-semibold">Flutter</span>,
              dari <span className="italic underline font-semibold">JSON</span>{" "}
              sampe <span className="italic underline font-semibold">SQL</span>,
              semua udah pernah dicicip.{" "}
              <span className="italic underline font-semibold">
                Clean architecture
              </span>
              ,{" "}
              <span className="italic underline font-semibold">
                modular codebase
              </span>
              , dan{" "}
              <span className="italic underline font-semibold">
                reusable component
              </span>{" "}
              itu udah standarnya. Setiap{" "}
              <span className="italic underline font-semibold">commit</span> ada
              alasan & setiap{" "}
              <span className="italic underline font-semibold">deploy</span> ada
              tujuan.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              {skills.map((skill, index) => (
                <LinkPreview key={index} url={skill.url}>
                  <Card
                    data-cursor-target
                    className="relative bg-white dark:bg-black hover:bg-black/5 hover:dark:bg-white/5 transition-all duration-300 ease-in-out"
                  >
                    <ShineBorder
                      shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    />
                    <CardContent>
                      <skill.icon className="w-8 h-8" />
                    </CardContent>
                  </Card>
                </LinkPreview>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
