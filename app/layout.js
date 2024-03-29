import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Nestle",
  description: "Job Nestle",
  image: "/JobNestle.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NavBar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
