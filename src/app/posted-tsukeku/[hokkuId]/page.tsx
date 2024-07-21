"use server";

import React from "react";
import HokkuCard from "@/app/ui/tsukeku/hokkuCard";
import { getHokkuById } from "@/app/lib/data";
import PostedTsukekuCardList from "@/app/ui/posted-tsukeku/postedTsukekuCardList";
import { Hokku } from "@/app/lib/definitions";
import { toast } from "react-toastify";

export default async function Page({
  params,
}: {
  params: {
    hokkuId: string;
  };
}) {
  var hokku: Hokku | null = null;
  try {
    hokku = await getHokkuById(params.hokkuId);
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
  return (
    <div className="text-center">
        <div className="absolute right-10">
          {hokku && (
            <HokkuCard
              ikku={hokku.ikku}
              niku={hokku.niku}
              sanku={hokku.sanku}
              description={hokku.description}
            />
          )}

      </div>
      <div>
        <PostedTsukekuCardList hokkuId={params.hokkuId} />
      </div>
    </div>
  );
}
