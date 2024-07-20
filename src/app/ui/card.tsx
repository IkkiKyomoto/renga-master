//カードを表示するコンポーネント
import React from "react";
import styles from "./Card.module.css";

export default function Card({
  kaminoku,
  shimonoku,
  likeNum,
}: {
  kaminoku: string;
  shimonoku: string;
  likeNum: number;
}) {
  return (
    <div className="pt-5 pr-5 pb-5 pl-5 border border-1 border-green-800 bg-amber-50">
      <div className={styles.vertical_text}>
        <p>{kaminoku}</p>
        <p className="indent-2">{shimonoku}</p>
      </div>
      <div className="flex flex-row-reverse">
        <div className="flex flex-col">
          <p className="text-center rounded-full border border-red-500 w-6 h-7 text-red-500">
            良
          </p>
          <p className="text-center text-xs">{likeNum}</p>
        </div>
      </div>
    </div>
  );
}
