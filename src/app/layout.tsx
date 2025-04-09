"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/loading-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [showLoading, setShowLoading] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false); // 初回判定用

  useEffect(() => {
    if (!firstLoadDone) {
      setFirstLoadDone(true); // 初回は何もせず終了
      return;
    }

    // 遷移時のみローディングを表示
    setShowLoading(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1500); // ← 表示時間：1.5秒

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {showLoading ? <LoadingScreen /> : children}
        </body>
      </html>
    </ClerkProvider>
  );
}
