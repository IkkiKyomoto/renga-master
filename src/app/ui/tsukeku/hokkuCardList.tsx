"use server";

import React from "react";
import { Hokku } from "@/app/lib/definitions";
import HokkuCard from "@/app/ui/tsukeku/hokkuCard";
import Link from "next/link";
import { auth } from "@/auth";
import { getHokkus } from "@/app/lib/data";
import { toast } from "react-toastify";
import { Suspense } from "react";

export default async function HokkuCardList() {
  const session = await auth();
  const user = session?.user;
  var hokkus: Hokku[] = [];
  try {
    hokkus = await getHokkus();
  } catch (error) {
    toast.error("発句の取得に失敗しました");
  }

  return (
    <div>
      <ul>
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
          return (
            <li key={i}>
              <Link
                href={
                  isPosted || isMine
                    ? ""
                    : `/tsukeku/${hokku.id}/create?ikku=${hokku.ikku}&niku=${hokku.niku}&sanku=${hokku.sanku}&description=${hokku.description}`
                }
              >
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
      </ul>
    </div>
  );
}