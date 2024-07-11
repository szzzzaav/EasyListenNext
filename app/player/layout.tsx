import { Figtree } from "next/font/google";

import "@/app/globals.css";

import ToasterProvider from "@/providers/ToasterProvider";

const font = Figtree({ subsets: ["latin"] });

export default function Player({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={font.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
