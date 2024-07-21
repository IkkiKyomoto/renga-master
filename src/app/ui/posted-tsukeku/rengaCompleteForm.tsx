"use client";

import React from "react";
import { Tsukeku } from "@/app/lib/definitions";
import TsukekuCard from "@/app/ui/posted-tsukeku/tsukekuCard";
import {
  ComponentRadioWrapper,
  ComponentRadio,
} from "@/app/util/componentRadio";
import { toast } from "react-toastify";
import { createRenga } from "@/app/lib/rengaActions";
import { useRouter } from "next/navigation";

export default function RengaCompleteForm({
  tsukekus,
  hokkuId,
}: {
  tsukekus: Tsukeku[];
  hokkuId: string;
}) {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const selectedTsukekuId = form.tsukekuSelect.id as string;
    try {
      await createRenga(hokkuId, selectedTsukekuId);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      return;
    }
    toast.success("連歌が完成しました！");
    router.push("/");
  }
  return (
    <form onSubmit={handleSubmit}>
      <ComponentRadioWrapper legend="お気に入りの付句を選択してください">
        {tsukekus.map((tsukeku, i) => {
          return (
            <div key={i}>
              <ComponentRadio name="tsukekuSelect" id={tsukeku.id}>
                <TsukekuCard
                  yonku={tsukeku.yonku}
                  goku={tsukeku.goku}
                  description={tsukeku.description}
                />
              </ComponentRadio>
            </div>
          );
        })}
      </ComponentRadioWrapper>
      {tsukekus.length > 0 &&
      <button type="submit">投稿する</button>
    }
    </form>
  );
}
