import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { PreLoader } from "@/components/pre-loader";
import { CircleCursor } from "@/components/circle-cursor";
import { ThemeProvider } from "@/components/theme-provider";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NailNafir",
  description: "Personal Space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${rubik.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <CircleCursor />
          <PreLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
