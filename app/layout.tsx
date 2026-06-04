import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resumely",
  description:
    "Create professional ATS-friendly resumes with a simple mobile-first resume builder. Build, edit, export PDF, and import JSON anytime.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}