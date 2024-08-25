"use server";

import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import { Hokku } from "@/app/lib/definitions";
import HokkuCard from "@/app/ui/tsukeku/hokkuCard";
import Link from "next/link";
import { auth } from "@/auth";
import { getHokkus } from "@/app/lib/data";
import { Suspense } from "react";

export default async function HokkuCardList() {
  const session = await auth();
  const user = session?.user;
  // const [hokkus, setHokkus] = useState<Hokku[]>([]);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // useEffect(() => {
  //   getHokkus()
  //     .then((hokkus) => {
  //       setHokkus(hokkus);
  //     })
  //     .catch((error: any) => {
  //       setErrorMessage(error.message);
  //     });
  // }, []);
  var hokkus: Hokku[] = [];
  var errorMessage;
  try {
    hokkus = await getHokkus();
  } catch (error: any) {
    errorMessage = error.message;
  }


  return (
    <div>
      <ul className="mb-12 place-items-center w-screen grid gap-2 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {hokkus.map((hokku, i) => {
          var isPosted = false;
          var isMine = false;
          hokku.tsukeku?.map((tsukeku, i) => {
            if (tsukeku.userId === user?.id) {
              isPosted = true;
              return;
            }
          });
          if (hokku.userId === user?.id) {
            isMine = true;
          }
          var href = "";
          if (isMine) {
            href = `/posted-tsukeku/${hokku.id}`;
          } else if (!isPosted) {
            href = `/tsukeku/${hokku.id}/create?ikku=${hokku.ikku}&niku=${hokku.niku}&sanku=${hokku.sanku}&description=${hokku.description}`;
          }
          return (
            <li key={i}>
              <Link href={href}>
                <Suspense fallback={<p>ロード中</p>}>
                  <HokkuCard
                    key={i}
                    ikku={hokku.ikku}
                    niku={hokku.niku}
                    sanku={hokku.sanku}
                    description={hokku.description}
                    isPosted={isPosted}
                    isMine={isMine}
                  />
                </Suspense>
              </Link>
            </li>
          );
        })}
        {errorMessage && <p>{errorMessage}</p>}
      </ul>
    </div>
  );
}
