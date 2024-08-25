"use client";

import { useState, useEffect } from "react";
import { Renga } from "@/app/lib/definitions";
import { getRengasByDate } from "../../lib/data";
import { Session } from "next-auth";
import CardList from "@/app/ui/cardList";
import { color } from "@/color";

export default function NewCards({ session }: { session: Session | null }) {
  const num = 12;
  const [rengas, setRengas] = useState<Renga[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    getRengasByDate(num)
      .then((rengas) => {
        setRengas(rengas);
      })
      .catch((error: any) => {
        setErrorMessage(error.message);
      });
  }, []
)

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
