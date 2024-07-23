"use client";

//カードを表示するコンポーネント
import React from "react";
import styles from "./Card.module.css";
import { useSession } from "next-auth/react";
import CardLikeWrapper from "@/app/ui/cardLikeWrapper";


export default function Card({
  kaminoku,
  shimonoku,
  likeNum,
  rengaId,
  isLiked,
  usersName,
}: {
  kaminoku: string;
  shimonoku: string;
  likeNum: number;
  rengaId: string;
  isLiked: boolean;
  usersName: string;
}) {
  const { data: session } = useSession();
  const isLikedisable = isLiked || session === null;
  return (
    <div className={styles.card}>
      <div className={styles.vertical_text}>
        <div className="font-bold">
          <p>{kaminoku}</p>
          <p className="indent-2">{shimonoku}</p>
        </div>
      </div>
      <div className="flex flex-row ">
        <p className={styles.vertical_text}>{usersName}</p>
        <div>
          <CardLikeWrapper
            rengaId={rengaId}
            likeNum={likeNum}
            isLikedisable={isLikedisable}
          >
            <p
              className={`text-center rounded-full border w-6 h-7 ${isLikedisable ? "border-red-500 text-red-500" : "border-gray-400  text-gray-400"}`}
            >
              良
            </p>
          </CardLikeWrapper>
        </div>
      </div>
    </div>
  );
}
