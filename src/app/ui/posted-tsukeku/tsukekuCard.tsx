import React from "react";
import styles from "@/app/ui/Card.module.css";
import { color } from "@/color";

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
    <div>
      <p>{yonku + goku}</p>
    </div>
  );
}
