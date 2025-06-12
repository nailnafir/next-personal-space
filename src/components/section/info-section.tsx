import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMenu } from "@/hooks/use-menu";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { infos, jobs } from "@/lib/data/infos";
import { ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import TypeWriter from "@/components/type-writer";
import { cn } from "@/lib/utils";

export default function InfoSection() {
  const isMobile = useMobile();

  const {handleMenuClick} = useMenu();
  
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const info = document.getElementById("info");
      const bottom = info?.getBoundingClientRect().bottom || 0;
      
      setScrollLocked(bottom > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && scrollLocked) {
      document.body.style.touchAction = "none";
    } else {
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.touchAction = "";
    };
  }, [isMobile, scrollLocked]);

  return (
    <section
      id="info"
      className="h-[calc(100dvh-64px)] justify-end flex flex-col items-center px-4 py-4"
    >
      <div className="w-full max-w-full mx-auto text-center sm:max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block font-bold">
            <AnimatedGradientText>Nailul Firdaus</AnimatedGradientText>
          </span>
          <span className="block text-xl font-light text-muted-foreground sm:text-2xl">
            <TypeWriter sentences={jobs} />
          </span>
        </motion.h1>
      </div>
      <div className="w-full max-w-full mx-auto text-center sm:max-w-80">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
          className="grid items-center justify-center grid-cols-3 gap-4 mt-2"
        >
          {infos.map((info, index) => (
            <Card
              key={index}
              className="relative items-center transition-all duration-300 ease-in-out bg-transparent hover:bg-foreground/10 backdrop-blur text-foreground"
            >
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <CardContent>
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
            onClick={() => {
              handleMenuClick("tentang");
            }}
            className={cn(
              "z-50 gap-2 px-4 py-2 transition duration-300 rounded-full",
              scrollLocked && "animate-bounce"
            )}
          >
            <ArrowDown className="text-background" />
            <span className="text-sm font-semibold text-background">
              Selengkapnya
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
