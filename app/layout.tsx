import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Suspense } from "react";
import AuthProviders from "./components/AuthProviders/AuthProviders";
import Filter from "./components/Filter/Filter";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AnimeTuon",
  description: "Created by Tuon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="bg-lightgreen scroll-smooth">
              <div className="w-full relative flex flex-col justify-between max-w-[1335px] m-auto">
                <div className="mt-24 w-full">
                  <Header />
                </div>
                {/* <div className="my-5 bg-pinkpastel">
                  <Filter/>
                </div> */}
                {children}

                {/* <Footer /> */}
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProviders>
        <Toaster />
      </body>
    </html>
  );
}
