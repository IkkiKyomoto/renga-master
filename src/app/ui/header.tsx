import { LoginButton, LogoutButton, RegisterButton } from "./button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  //const {data: session} = useSession()
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
          
          <li><LoginButton /></li>
          <li><RegisterButton /></li>

        </ul>
      </nav>
    </header>
  );
}
