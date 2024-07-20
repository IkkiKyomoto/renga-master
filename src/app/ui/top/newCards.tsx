"use server";

import { Renga } from "@/app/lib/definitions";
import { getRengasByDate } from "../../lib/data";
import Card from "../card";
import { useState } from "react";

export default async function NewCards() {
  const num = 12;
  var errorMessage: string | null = null;
  var rengas: Renga[] = [];
  try {
    rengas = await getRengasByDate(num);
  } catch (error: any) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">新着連歌</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rengas.map((renga, i) => {
          const kaminoku = ((((renga.hokku?.ikku as string) +
            renga.hokku?.niku) as string) + renga.hokku?.sanku) as string;
          const shimonoku = ((renga.tsukeku?.yonku as string) +
            renga.tsukeku?.goku) as string;
          const likeNum = renga.likes?.length;
          return (
            <Card
              key={i}
              kaminoku={kaminoku}
              shimonoku={shimonoku}
              likeNum={likeNum}
            />
          );
        })}
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
