import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default:"UniFinder | Discover Top Universities Worldwide",
    template:"%s | UniFinder"
  },
   description: "The most popular university search tool for international students. Filter by global ranking, safety scores, student satisfaction, and post-study work visa policies.",
   keywords: ["study abroad", "university finder", "global rankings", "compare universities", "scholarships", "international students"],
  authors: [{ name: "UniFinder Team" }],
  creator: "UniFinder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50 overflow-x-hidden relative selection:bg-blue-100 selection:text-blue-900`}>
        <Navbar/>
        <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden bg-gray-50">
                    {children}
          </main>
          <Footer/>
      </body>
    </html>
  );
}
