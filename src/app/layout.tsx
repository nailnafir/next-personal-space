import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { PreLoader } from "@/components/pre-loader";
import { CrosshairCursor } from "@/components/crosshair-cursor";
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
          <CrosshairCursor />
          <PreLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
