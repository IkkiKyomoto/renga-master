import React from "react";
import styles from "../Card.module.css";

export default function TsukekuCard({
  yonku,
  goku,
  description,
}: {
  yonku: string;
  goku: string;
  description: string | null;
}) {
  return (
    <div className={styles.card_right_dashed}>
      <p>{yonku+ goku}</p>
    </div>
  );
}
