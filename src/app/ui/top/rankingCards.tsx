"use server";

import { Renga } from "@/app/lib/definitions";
import { getRengasByGoodForWeek } from "@/app/lib/data";

import { auth } from "@/auth";
import CardList from "../cardList";
import { color } from "@/color";

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
  const session = await auth();

  return (
    <div className={`bg-white p-6 m-6 ${color["card-border"]}`}>
      <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-6">
        人気連歌
      </h1>
      <CardList rengas={rengas} session={session} />

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
