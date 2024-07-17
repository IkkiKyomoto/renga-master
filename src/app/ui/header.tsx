

import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { auth } from '@/auth'

export default async function Header() {
  const session = await auth()
  console.log(session)
  return (
    <header className="flex justify-center gap-6 mt-6">
      <h1 className="text-2xl ">連歌ますたぁ</h1>
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
            <Link href="/mypage">マイ連歌</Link>
          </li>
          <li>
            <Link href="/instruction">遊び方</Link>
          </li>
          <li>
            <AuthButtons session={session} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
