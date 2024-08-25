"use server";

import { Renga } from "@/app/lib/definitions";
import { getRengasByGoodForWeek } from "@/app/lib/data";
import { Session } from "next-auth";
import CardList from "../cardList";
import { color } from "@/color";

export default async function RankingCards({
  session,
}: {
  session: Session | null;
}) {
  const num = 12;
  var errorMessage: string | null = null;
  var rengas: Renga[] = [];
  //   const [rengas, setRengas] = useState<Renga[]>([]);
  //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //   useEffect(() => {
  //     getRengasByGoodForWeek(num)
  //       .then((rengas) => {
  //         setRengas(rengas);
  //       })
  //       .catch((error: any) => {
  //         setErrorMessage(error.message);
  //       });
  //   }, []
  // )
  try {
    rengas = await getRengasByGoodForWeek(num);
  } catch (error: any) {
    errorMessage = error.message;
  }

  return (
    <div className={`bg-white p-6 m-6 w-80 lg:w-96 ${color["card-border"]}`}>
      <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-6">
        人気連歌
      </h1>
      <CardList rengas={rengas} session={session} />
      {!errorMessage && rengas.length === 0 && <p>まだありません</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
