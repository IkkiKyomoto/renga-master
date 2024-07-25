"use server";

import React from "react";
import HokkuCard from "@/app/ui/tsukeku/hokkuCard";
import { getHokkuById } from "@/app/lib/data";
import PostedTsukekuCardList from "@/app/ui/posted-tsukeku/postedTsukekuCardList";
import { Hokku } from "@/app/lib/definitions";
import { toast } from "react-toastify";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    hokkuId: string;
  };
}) {
  var hokku: Hokku | null = null;
  const session = await auth();

  try {
    hokku = await getHokkuById(params.hokkuId);
  } catch (error: any) {
    console.log(error);
    //toast.error(error.message);
  }
  if (session?.user?.id !== hokku?.userId) {
    redirect("/");
  }
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-6 mt-6 text-center">付句選択</h1>
      <div className="mx-auto mt-6">
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
