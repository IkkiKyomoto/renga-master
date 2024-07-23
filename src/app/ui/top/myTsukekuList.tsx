"use server";

import React from "react";
import { auth } from "@/auth";
import { Hokku } from "@/app/lib/definitions";
import { getHokkusByUserId } from "@/app/lib/data";
import Link from "next/link";
import HokkuCard from "../tsukeku/hokkuCard";
import { color } from "@/color";

export default async function MyTsukekuList() {
  const session = await auth();
  var hokkus: Hokku[] = [];
  var errorMessage: any | null = null;
  if (!session || !session.user || !session.user.id) {
    return <p>セッションの読み込みに失敗しました</p>;
  }
  try {
    hokkus = await getHokkusByUserId(session.user.id);
  } catch (error: any) {
    errorMessage = error.message;
  }

  return (
    <div className={`bg-white p-6 ${color["card-border"]}`}>
      <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-6">
        未完成のマイ発句
      </h1>
      <ul className="flex flex-raw gap-6">
        {hokkus.map((hokku, i) => {
          return (
            <li key={i}>
              <Link href={`/posted-tsukeku/${hokku.id}`}>
                <HokkuCard
                  ikku={hokku.ikku}
                  niku={hokku.niku}
                  sanku={hokku.sanku}
                  description={hokku.description}
                />
              </Link>
            </li>
          );
        })}
      </ul>
      {hokkus.length === 0 && <p>未完成の発句はありません</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
