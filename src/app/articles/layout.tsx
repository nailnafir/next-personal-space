import Footer from "@/components/footer";
import Header from "@/components/header";

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-visible select-none">
      <Header variant="articles" />
      {children}
      <Footer />
    </div>
  );
}
