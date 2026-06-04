import type { Metadata } from "next";
import { Roboto, Fruktur } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const fruktur = Fruktur({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-fruktur",
});

export const metadata: Metadata = {
  title: "Resumely",
  description:
    "Create professional ATS-friendly resumes with a simple mobile-first resume builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${fruktur.variable}`}>
      <body className="relative min-h-screen bg-white/50 text-zinc-900 overflow-x-hidden">
        {/* Background image */}
        <Image
          src="/paper.jpg"
          alt="Background"
          fill
          priority
          className="object-cover opacity-40 -z-10"
        />

        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}