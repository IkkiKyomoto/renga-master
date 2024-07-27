"use client";

import React, { useState } from "react";
import { Tsukeku } from "@/app/lib/definitions";
import TsukekuCard from "@/app/ui/posted-tsukeku/tsukekuCard";
import { toast } from "react-toastify";
import { createRenga } from "@/app/lib/rengaActions";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/Card.module.css";

export default function RengaCompleteForm({
  tsukekus,
  hokkuId,
}: {
  tsukekus: Tsukeku[];
  hokkuId: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    setSelected(event.currentTarget.id);
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.submitButton.disabled = true;
    console.log(selected);
    if (!selected) {
      toast.error("連歌を選択してください");
      return;
    }
    try {
      await createRenga(hokkuId, selected);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      event.currentTarget.submitButton.disabled = false
      return;
    }
    toast.success("連歌が完成しました！");
    router.push("/");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
        {tsukekus.map((tsukeku, i) => {
          return (
            <div
              key={i}
              onClick={handleClick}
              id={`${tsukeku.id}`}
              className={
                selected === `${tsukeku.id}`
                  ? styles.card_selected
                  : styles.card_right_dashed
              }
            >
              <TsukekuCard
                yonku={tsukeku.yonku}
                goku={tsukeku.goku}
                description={tsukeku.description}
              />
            </div>
          );
        })}
      </div>
      <div>
        {tsukekus.length > 0 ? (
          <button
          name="submitButton"
            type="submit"
            className="mt-10 mb-10 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            投稿する
          </button>
        ) : (
          <p>付句がまだ届いていません</p>
        )}
      </div>
    </form>
  );
}
