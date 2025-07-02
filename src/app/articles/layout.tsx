import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Personal Space",
};

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-visible select-none">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
