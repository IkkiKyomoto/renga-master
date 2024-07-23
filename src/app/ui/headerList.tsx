import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import AuthButtons from "./AuthButtons";
import { HeaderListStyle } from "@/app/ui/headerListStyle";
import useWindowSize from "@/hooks/useWindowSize";
import useToggleDrawer from "@/hooks/useToggleDrawer";

export default function HeaderList({
  session,
  style,
}: {
  session: Session | null;
  style: HeaderListStyle;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const windowSize = useWindowSize();
  const {open, setOpen} = useToggleDrawer();
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (windowSize.width < 768 && setOpen !== undefined) {
      console.log(open);
      setOpen(false);
    }

  }
  return (
    <ul className={` ${style.ul}`}>
      <li className={` ${style.li}`}>
        <Link onClick={handleClick} href="/">トップ</Link>
      </li>
      <li className={` ${style.li}`}>
        <Link onClick={handleClick}  href="/hokku">発句する</Link>
      </li>
      <li className={` ${style.li}`}>
        <Link onClick={handleClick}  href="/tsukeku">付句する</Link>
      </li>
      <li className={` ${style.li}`}>
        <Link onClick={handleClick}  href={`/my-page/${session?.user?.id}`}>マイページ</Link>
      </li>
      <li className={` ${style.li}`}>
        <Link onClick={handleClick}  href="/instruction">遊び方</Link>
      </li>
      <li className={` ${style.li}`}>
        <AuthButtons session={session} />
      </li>
    </ul>
  );
}
