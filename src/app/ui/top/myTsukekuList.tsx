"use client";

import React, {useState, useEffect} from "react";
import { auth } from "@/auth";
import { Hokku } from "@/app/lib/definitions";
import { getHokkusByUserId } from "@/app/lib/data";
import Link from "next/link";
import HokkuCard from "../tsukeku/hokkuCard";
import { color } from "@/color";
import { Session } from "next-auth";

export default function MyTsukekuList({session}: {session: Session}) {
  // マイ付句リストを表示
  const [hokkus, setHokkus] = useState<Hokku[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // ユーザーIDで付句を取得
  useEffect(() => {
    getHokkusByUserId(session?.user?.id as string)
      .then((hokkus) => {
        setHokkus(hokkus);
      })
      .catch((error: any) => {
        // エラー発生時はエラーメッセージを表示
        setErrorMessage(error.message);
      });
  }, []);
  // try {
  //   hokkus = await getHokkusByUserId(session.user.id);
  // } catch (error: any) {
  //   errorMessage = error.message;
  // }

  return (
    <div className={`md:w-2010 bg-white p-6 ${color["card-border"]}`}>
      <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-6">
        未完成のマイ発句
      </h1>
      <ul className="flex flex-raw gap-6 grid grid-cols-4 md:grid-cols-6  lg:grid-cols-12">
        {hokkus.map((hokku, i) => {
          return (
            <li key={i}>
              <Link href={`/posted-tsukeku/${hokku.id}`}>
                <div className="relative top--2 text-xl text-red-600 z-10">
                  {hokku.tsukeku?.length}
                </div>
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
      {!errorMessage && hokkus.length === 0 && <p>未完成の発句はありません</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
