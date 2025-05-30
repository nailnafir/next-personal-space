import { motion } from "motion/react";
import { socials } from "@/lib/data/socials";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { LinkPreview } from "@/components/ui/link-preview";

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="h-dvh flex flex-col items-center justify-center sm:px-32 px-4 py-4 sm:py-8"
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
              &quot;Tak Kenal, Maka Tak Sayang&quot;
            </h3>
            <p className="mt-8 text-base text-gray-600 dark:text-gray-400">
              Seorang{" "}
              <span className="italic underline font-semibold">developer</span>{" "}
              kreatif dan penasaran akut yang fokus di{" "}
              <span className="italic underline font-semibold">
                Mobile & Web Development
              </span>
              , tapi gak pernah puas di zona nyaman. Suka banget ngulik
              teknologi baru, apalagi kalo soal{" "}
              <span className="italic underline font-semibold">Software</span>,{" "}
              <span className="italic underline font-semibold">
                IT Security
              </span>
              ,{" "}
              <span className="italic underline font-semibold">Blockchain</span>
              , dan{" "}
              <span className="italic underline font-semibold">
                Artificial Intelligence
              </span>
              . Dunia teknologi itu cepet banget geraknya. Kalo males belajar
              bakal ketinggalan, kalo rajin ngulik bakal jadi{" "}
              <span className="italic underline font-semibold">
                game changer
              </span>
              .
            </p>
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              {socials.map((social, index) => (
                <LinkPreview key={index} url={social.url}>
                  <Card
                    key={index}
                    className="relative bg-white dark:bg-black hover:bg-black/5 hover:dark:bg-white/5 transition-all duration-300 ease-in-out"
                  >
                    <ShineBorder
                      shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    />
                    <CardContent>
                      <social.icon className="w-8 h-8" />
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
