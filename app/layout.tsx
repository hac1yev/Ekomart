import type { Metadata } from "next";
import "./plugins.css";
import "./globals.css";
import "@uploadthing/react/styles.css";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProviderWrapper from "@/components/ReduxProvider/ProviderWrapper";

export const metadata: Metadata = {
  title: "Ekomart",
  description: "Do not miss our amazing grocery deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          <Header />
          <Navbar />
          {children}
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  );
}