import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Xeloria | Architect Your Professional DNA",
  description: "Xeloria lets you build a stunning, high-performance professional portfolio site in minutes. Synchronize your narrative and deploy your legacy instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans min-h-full flex flex-col bg-[#050505] text-white selection:bg-indigo-500 selection:text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
