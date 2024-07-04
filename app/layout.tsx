import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/supabaseProviders";
import UserProvider from "@/providers/userProvider";

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
    <html lang="zh-CN">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <SideBar>{children}</SideBar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
