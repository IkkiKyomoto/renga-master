//カードリストを表示するコンポーネント

import { Renga } from "../lib/definitions";
import Card from "./card";

export default function CardList({
  rengas,
  session,
}: {
  rengas: Renga[];
  session: any;
}) {
  return (
    <div>
      <div className="grid gap-6 grid-cols-3 :grid-cols-6">
        {rengas.map((renga, i) => {
          const kaminoku = ((((renga.hokku?.ikku as string) +
            renga.hokku?.niku) as string) + renga.hokku?.sanku) as string;
          const shimonoku = ((renga.tsukeku?.yonku as string) +
            renga.tsukeku?.goku) as string;
          const likeNum = renga.likes?.length;

          const isLiked = renga.likes.some(
            (like) => like.userId === session?.user?.id,
          );
          return (
            <Card
              key={i}
              kaminoku={kaminoku}
              shimonoku={shimonoku}
              likeNum={likeNum}
              rengaId={renga.id}
              isLiked={isLiked}
              usersName={
                renga.hokku?.user?.name + "&" + renga.tsukeku?.user?.name
              }
            />
          );
        })}
      </div>
    </div>
  );
}
