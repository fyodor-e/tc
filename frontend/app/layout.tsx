import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Продукты",
  description: "Приложение для управления продуктами",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-[100vh] flex overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1`}
      >
        <div className="flex flex-col items-stretch justify-items-center min-h-screen p-10 gap-2 font-[family-name:var(--font-geist-sans)] h-[100%]">
          {children}
        </div>
      </body>
    </html>
  );
}
