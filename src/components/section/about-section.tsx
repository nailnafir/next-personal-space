import { motion } from "motion/react";
import { socials } from "@/lib/data/socials";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { LinkPreview } from "@/components/aceternity/link-preview";

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="flex flex-col items-center justify-center px-4 py-4 sm:h-dvh"
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
              &quot;Tak Kenal, Maka Tak Sayang&quot;
            </h3>
            <p className="mt-8 text-base text-muted-foreground">
              Seorang{" "}
              <span className="italic font-semibold underline">developer</span>{" "}
              kreatif dan penasaran akut yang fokus di{" "}
              <span className="italic font-semibold underline">
                Mobile & Web Development
              </span>
              , tapi gak pernah puas di zona nyaman. Suka banget ngulik
              teknologi baru, apalagi kalo soal{" "}
              <span className="italic font-semibold underline">Software</span>,{" "}
              <span className="italic font-semibold underline">
                IT Security
              </span>
              ,{" "}
              <span className="italic font-semibold underline">Blockchain</span>
              , dan{" "}
              <span className="italic font-semibold underline">
                Artificial Intelligence
              </span>
              . Dunia teknologi itu cepet banget geraknya. Kalo males belajar
              bakal ketinggalan, kalo rajin ngulik bakal jadi{" "}
              <span className="italic font-semibold underline">
                game changer
              </span>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {socials.map((social, index) => (
                <LinkPreview
                  key={index}
                  url={social.url}
                >
                  <Card
                    data-cursor-target
                    key={index}
                    className="relative items-center transition-all duration-300 ease-in-out bg-transparent hover:bg-foreground/10 backdrop-blur"
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
