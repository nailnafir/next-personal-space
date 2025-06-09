import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { LinkPreview } from "@/components/aceternity/link-preview";
import { skills } from "@/lib/data/skills";

export default function SkillSection() {
  return (
    <section
      id="keahlian"
      className="flex flex-col items-center justify-center px-8 py-8 sm:h-dvh"
    >
      <div className="w-full max-w-full mx-auto mt-8 space-y-4 text-center sm:max-w-6xl sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="flex justify-center"
        >
          <div className="justify-center w-full p-8 transition-all duration-300 bg-transparent shadow-xl text-foreground border-ring/50 shadow-background/5 rounded-xl border-1 backdrop-blur">
            <h3 className="text-3xl font-bold text-foreground">
              &quot;Keinginan: Pro Gamer, Kenyataan: Programmer&quot;
            </h3>
            <p className="mt-8 text-base text-muted-foreground">
              Kalo dulu{" "}
              <span className="italic font-semibold underline">push-up</span> &{" "}
              <span className="italic font-semibold underline">push-rank</span>,
              sekarang malah{" "}
              <span className="italic font-semibold underline">push code</span>{" "}
              &{" "}
              <span className="italic font-semibold underline">
                push commit
              </span>
              . Mulai dari{" "}
              <span className="italic font-semibold underline">Front-End</span>{" "}
              sampe{" "}
              <span className="italic font-semibold underline">Back-End</span>,
              dari{" "}
              <span className="italic font-semibold underline">Bootstrap</span>{" "}
              sampe{" "}
              <span className="italic font-semibold underline">Tailwind</span>,
              dari <span className="italic font-semibold underline">React</span>{" "}
              sampe{" "}
              <span className="italic font-semibold underline">Laravel</span>,
              dari{" "}
              <span className="italic font-semibold underline">
                Jetpack Compose
              </span>{" "}
              sampe{" "}
              <span className="italic font-semibold underline">Flutter</span>,
              dari <span className="italic font-semibold underline">JSON</span>{" "}
              sampe <span className="italic font-semibold underline">SQL</span>,
              semua udah pernah dicicip.{" "}
              <span className="italic font-semibold underline">
                Clean architecture
              </span>
              ,{" "}
              <span className="italic font-semibold underline">
                modular codebase
              </span>
              , dan{" "}
              <span className="italic font-semibold underline">
                reusable component
              </span>{" "}
              itu udah standarnya. Setiap{" "}
              <span className="italic font-semibold underline">commit</span> ada
              alasan & setiap{" "}
              <span className="italic font-semibold underline">deploy</span> ada
              tujuan.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {skills.map((skill, index) => (
                <LinkPreview
                  key={index}
                  url={skill.url}
                >
                  <Card
                    data-cursor-target
                    className="relative items-center transition-all duration-300 ease-in-out bg-transparent hover:bg-foreground/10 backdrop-blur"
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
