import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "@/app/globals.css";
import SideBar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/supabaseProviders";
import UserProvider from "@/providers/userProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import ReactQueryClientProvider from "@/providers/ReactQueryProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy-Listen",
  description: "Listen to Music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <ReactQueryClientProvider>
              <SideBar>{children}</SideBar>
            </ReactQueryClientProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
