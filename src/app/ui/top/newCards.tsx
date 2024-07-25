"use server";

import { Renga } from "@/app/lib/definitions";
import { getRengasByDate } from "../../lib/data";
import { auth } from "@/auth";
import CardList from "@/app/ui/cardList";
import { color } from "@/color";

export default async function NewCards() {
  const num = 12;
  var errorMessage: string | null = null;
  var rengas: Renga[] = [];
  try {
    rengas = await getRengasByDate(num);
  } catch (error: any) {
    errorMessage = error.message;
  }
  const session = await auth();

  return (
    <div className={`bg-white p-6 m-6 w-80 lg:w-96 ${color["card-border"]}`}>
      <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-6">
        新着連歌
      </h1>
      <CardList rengas={rengas} session={session} />
      {!errorMessage && rengas.length === 0 && <p>まだありません</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
