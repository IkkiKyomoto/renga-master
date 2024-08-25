"use client";

import Link from "next/link";

import HeaderList from "@/app/ui/headerList";
import useWindowSize from "@/hooks/useWindowSize";
import DrawerComponentHeader from "./drawerComponentHeader";
import { pcStyle } from "@/app/ui/headerListStyle";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session | null }) {
  const windowSize = useWindowSize();

  return (
    <header className="sticky top-0 flex justify-center items-center gap-6 h-20 w-full border-b-4 border-slate-700 bg-white z-20">
      <Link href="/">
        {" "}
        <h1 className="text-2xl font-bold headerTitle">連歌ますたぁ</h1>
      </Link>

      {windowSize.width < 768 ? (
        <DrawerComponentHeader session={session} />
      ) : (
        <nav>
          <HeaderList session={session} style={pcStyle} />
        </nav>
      )}
    </header>
  );
}
