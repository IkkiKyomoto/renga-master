"use server";

import { auth } from "@/auth";

import Link from "next/link";
import AuthButtons from "./AuthButtons";
import Image from "next/image";
import logoImage from "@/../public/logo.png"
import { myFont } from "../layout";

export default async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 flex justify-center items-center gap-6 h-20 w-full border-b-4 border-slate-700 bg-white">
<Link href="/">      <h1 className="text-2xl"><span className="font-bold">連歌</span><span className={myFont.className}>ますたぁ</span></h1></Link>
      <nav className="">
        <ul className="flex gap-4 justify-end">
          <li>
            <Link href="/">トップ</Link>
          </li>
          <li>
            <Link href="/hokku">発句する</Link>
          </li>
          <li>
            <Link href="/tsukeku">付句する</Link>
          </li>
          <li>
            <Link href={`/my-page/${session?.user?.id}`}>マイページ</Link>
          </li>
          <li>
            <Link href="/instruction">遊び方</Link>
          </li>
          <li>
            <AuthButtons />
          </li>
        </ul>
      </nav>
    </header>
  );
}
