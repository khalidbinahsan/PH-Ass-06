import type { Metadata } from "next";
import { Inter, Oswald } from 'next/font/google';
import "./globals.css";

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
      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased bg-black text-white`}>{children}</body>
    </html>
  );
}
