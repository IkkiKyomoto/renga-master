import React from "react";
import styles from "../Card.module.css";
import { color } from "@/color";

export default function HokkuCard({
  ikku,
  niku,
  sanku,
  description,
  isPosted,
  isMine,
}: {
  ikku: string;
  niku: string;
  sanku: string;
  description: string | null;
  isPosted?: boolean;
  isMine?: boolean;
}) {
  return (
    <div className={`${styles.card_left_dashed} mb-6`}>
      <div>
        <p className={styles.vertical_text}>{ikku + niku + sanku}</p>
        {/* <p>{description}</p> */}
      </div>
      {isPosted && (
        <p className="text-base text-center rounded-full border w-6 h-7 border-red-500 text-red-500">
          済
        </p>
      )}
      {isMine && (
        <p className="text-base text-center rounded-full border w-6 h-7 border-red-500 text-red-500 text-bottom">
          自
        </p>
      )}
    </div>
  );
}
