"use server";

import { getTsukekusByHokkuId } from "@/app/lib/data";
import { Suspense } from "react";
import RengaCompleteForm from "@/app/ui/posted-tsukeku/rengaCompleteForm";

export default async function PostedTsukekuCardList({
  hokkuId,
}: {
  hokkuId: string;
}) {
  const tsukekus = await getTsukekusByHokkuId(hokkuId);

  return (
    <div className="text-center mx-6 mt-6">
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <RengaCompleteForm tsukekus={tsukekus} hokkuId={hokkuId} />
        </Suspense>
      </div>
    </div>
  );
}
