import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { LinkPreview } from "@/components/aceternity/link-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SkillsResponse } from "@/model/models";
import { readSkills } from "@/lib/service/endpoints";
import { parseBoldUnderline } from "@/lib/helpers";
import { getSupabaseURL } from "@/lib/utils";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import useSWR from "swr";
import Image from "next/image";

export default function SkillsSection() {
  const {
    data: skills,
    error,
    isLoading,
    mutate,
  } = useSWR<SkillsResponse>("/api/skills", readSkills, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleRetry = async () => {
    const retryPromise = () => mutate();

    toast.promise(retryPromise, {
      loading: "Menghubungkan...",
      success: "Berhasil terhubung ke server, data udah tampil!",
      error: (error) => {
        return `Servernya gak mau terhubung, ada masalah: ${
          error instanceof Error ? error.message : "Masalah tidak diketahui"
        }`;
      },
    });
  };

  return (
    <section
      id="keahlian"
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
          <div className="justify-center w-full p-8 transition-all duration-300 shadow-xl bg-background/50 text-foreground border-ring/50 shadow-background/5 rounded-xl border-1 backdrop-blur">
            <h3 className="text-3xl font-bold text-foreground">
              &quot;Keinginan: Pro Gamer, Kenyataan: Programmer&quot;
            </h3>
            {isLoading ? (
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col items-center justify-center gap-4 overflow-auto">
                  {Array.from({ length: 3 }).map((_, indexText) => (
                    <Skeleton
                      key={indexText}
                      className="w-full h-6 rounded-full"
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 overflow-auto">
                  {Array.from({ length: 16 }).map((_, indexIcon) => (
                    <Skeleton
                      key={indexIcon}
                      className="w-20 h-20 rounded-xl"
                    />
                  ))}
                </div>
              </div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="contents"
              >
                <Alert
                  variant="destructive"
                  className="flex flex-col items-center justify-center p-6 border bg-background/50 rounded-xl backdrop-blur border-ring/50"
                >
                  <AlertCircle className="!size-24 mb-8 animate-pulse" />
                  <AlertTitle className="flex-col items-center justify-center w-full text-3xl font-bold">
                    Terjadi Kesalahan
                  </AlertTitle>
                  <AlertDescription className="flex flex-col items-center justify-center text-base">
                    <div className="w-full">
                      Tidak dapat menampilkan data{" "}
                      <span className="font-bold">&apos;keahlian&apos;</span>{" "}
                      karena gagal menghubungkan ke{" "}
                      <span className="italic">server</span>. Periksa koneksi
                      internet dan pastikan sudah terhubung
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
              </motion.div>
            ) : (
              <>
                <p className="mt-8 text-base text-muted-foreground">
                  {parseBoldUnderline(skills?.user.story || "")}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  {skills?.tools?.map((tool, index) => (
                    <LinkPreview key={index} url={`${tool.url}`}>
                      <Card
                        data-cursor-target
                        className="relative items-center transition-all duration-300 ease-in-out bg-foreground/10 hover:bg-foreground/10 backdrop-blur"
                      >
                        <ShineBorder
                          shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                        />
                        <CardContent>
                          <Image
                            src={`${getSupabaseURL(tool.iconUrl)}`}
                            alt={tool.name}
                            width={32}
                            height={32}
                            className="w-8 h-8"
                          />
                        </CardContent>
                      </Card>
                    </LinkPreview>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
