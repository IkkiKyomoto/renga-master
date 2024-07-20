"use server";

import React from "react";
import { auth } from "@/auth";
import { Hokku } from "@/app/lib/definitions";
import { getHokkusByUserId } from "@/app/lib/data";
import Link from "next/link";
import HokkuCard from "../tsukeku/hokkuCard";

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
    <div>
      <h1>未完成のマイ発句</h1>

      <ul>
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
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
