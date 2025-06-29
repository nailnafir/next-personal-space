import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMenu } from "@/hooks/use-menu";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AlertCircle, ArrowDown, RefreshCcw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { cn } from "@/lib/utils";
import { InfoModel } from "@/types/models";
import { readInfo } from "@/lib/network/endpoint";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import TypeWriter from "@/components/type-writer";
import useSWR from "swr";

export default function InfoSection() {
  const isMobile = useMobile();

  const { handleMenuClick } = useMenu();

  const [scrollLocked, setScrollLocked] = useState(true);

  const {
    data: info,
    error,
    isLoading,
    mutate,
  } = useSWR<InfoModel>("info", readInfo, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleRetry = async () => {
    const toastId = "retry-toast";

    try {
      toast.loading("Menghubungkan", {
        id: toastId,
        description: "Tunggu sebentar, lagi coba hubungin ke server dulu",
      });

      await mutate();

      toast.success("Berhasil", {
        id: toastId,
        description: "Udah terhubung ke server, data udah tampil!",
      });
    } catch (error) {
      toast.error("Kesalahan", {
        id: toastId,
        description: `Servernya gak mau terhubung, ada masalah: ${
          error instanceof Error ? error.message : "Masalah tidak diketahui"
        }`,
      });
    }
  };

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
      className="h-[calc(100svh-64px)] justify-center flex flex-col items-center px-4 py-4"
    >
      {error ? (
        <Alert
          variant="destructive"
          className="flex flex-col items-center justify-center p-6 border bg-background/50 rounded-xl backdrop-blur border-ring/50"
        >
          <AlertCircle className="!size-24 mb-8 animate-pulse" />
          <AlertTitle className="w-full text-3xl font-bold">
            Terjadi Kesalahan
          </AlertTitle>
          <AlertDescription className="flex flex-col items-center justify-center text-base">
            <div className="w-full">
              Tidak dapat menampilkan data{" "}
              <span className="font-bold">&apos;info&apos;</span> karena gagal
              menghubungkan ke <span className="italic">server</span>. Periksa
              koneksi internet dan pastikan sudah terhubung
            </div>
            <Button
              variant="destructive"
              className="mt-8 w-52"
              onClick={handleRetry}
              disabled={isLoading}
            >
              <RefreshCcw />
              <span>Coba Lagi</span>
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="relative w-full max-w-full mx-auto mt-8 text-center top-1/4 sm:max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: false }}
            className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <Skeleton className="h-12 mx-auto w-52" />
                <Skeleton className="w-32 h-4 mx-auto" />
              </div>
            ) : (
              <>
                <span className="block font-bold">
                  <AnimatedGradientText>{info?.user.name}</AnimatedGradientText>
                </span>
                <span className="block text-xl font-light text-muted-foreground sm:text-2xl">
                  <TypeWriter
                    sentences={info?.jobs?.map((job) => job.name) ?? []}
                  />
                </span>
              </>
            )}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: false }}
            className="grid items-center justify-center grid-cols-3 gap-4 mt-2"
          >
            {isLoading
              ? Array.from({ length: 3 }).map((_, indexIcon) => (
                  <Skeleton key={indexIcon} className="w-full h-28 rounded-xl" />
                ))
              : info?.types.map((info, index) => (
                  <Card
                    key={index}
                    data-cursor-target
                    className="relative items-center transition-all duration-300 ease-in-out bg-background/50 hover:bg-foreground/10 backdrop-blur text-foreground"
                  >
                    <ShineBorder
                      shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    />
                    <CardContent>
                      <NumberTicker
                        value={info.total || 0}
                        className="text-3xl font-bold"
                      />
                      <p className="text-sm">{info.name}</p>
                    </CardContent>
                  </Card>
                ))}
          </motion.div>
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
                "gap-2 px-4 py-2 transition duration-300 rounded-full",
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
      )}
    </section>
  );
}
