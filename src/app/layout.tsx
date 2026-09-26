import type { Metadata } from "next";
import { Inter, Oswald } from 'next/font/google';
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { FitLogProvider } from "@/context/FitLogContext";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const oswald = Oswald({ 
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FitLog - Train with intent",
  description: "This is PH assignment project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased bg-black text-white`}>
        <Toaster position="top-right" toastOptions={{ style: { background: '#151518', color: '#fff', border: '1px solid #27272a' } }} />
        <FitLogProvider>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
        </FitLogProvider>
        </body>
    </html>
  );
}
