import type { Metadata } from "next";
import "./ui/globals.css";

import SomethingProvider from "./ui/somethingProvider";
import { auth } from "@/auth";
import Header from "@/app/ui/header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "連歌ますたぁ",
  description: "連歌を作って遊ぶSNS",
};
import { AdsCard } from "./ui/adsCard";


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
      <body>
        <SomethingProvider session={session}>
          <Header session={session} />
          {children}
        </SomethingProvider>
        {/* <Suspense fallback={<div>loading...</div>}>

        <AdsCard />
        </Suspense> */}
      </body>
    </html>
  );
}
