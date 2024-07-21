import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./ui/globals.css";

import SomethingProvider from "./ui/somethingProvider";
import { auth } from "@/auth";
import Header from "@/app/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const myFont = localFont({
  src: '../custom-font/TsukimiRounded-SemiBold.ttf',
  display: 'swap',
  style: 'calligraphy'
})
export const metadata: Metadata = {
  title: "連歌ますたぁ",
  description: "連歌を作って遊ぶSNS",
};

// export const LayoutContext = createContext<{
//   setState: Dispatch<SetStateAction<Session | null>>
//   state: Session | null
// }>

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ja">
      <body className={inter.className}>
        <SomethingProvider session={session}>
          <Header />
          {children}
        </SomethingProvider>
      </body>
    </html>
  );
}
