import type { Metadata } from "next";
import "./ui/globals.css";

import SomethingProvider from "./ui/somethingProvider";
import { auth } from "@/auth";
import Header from "@/app/ui/header";

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
      <body>
        <SomethingProvider session={session}>
          <Header session={session} />
          {children}
        </SomethingProvider>
      </body>
    </html>
  );
}
