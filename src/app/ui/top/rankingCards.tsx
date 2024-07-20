"use server";

import { Renga } from "@prisma/client";
import { getRengasByGoodForWeek } from "@/app/lib/data";
import Card from "../card";

export default async function RankingCards() {
  const num = 12;
  var errorMessage: string | null = null;
  var rengas: Renga[] = [];
  try {
    rengas = await getRengasByGoodForWeek(num);
  } catch (error: any) {
    console.log(error);
    errorMessage = error.message;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">週間ランキング</h1>
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
