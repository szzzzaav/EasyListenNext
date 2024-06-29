import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/Sidebar";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy-Listen",
  description: "Listen to Music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cn-zh">
      <body className={font.className}>
        <SideBar>{children}</SideBar>
      </body>
    </html>
  );
}
