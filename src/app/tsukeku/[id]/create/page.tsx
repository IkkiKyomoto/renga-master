"use server";

import HokkuCard from "@/app/ui/tsukeku/hokkuCard";
import TsukekuForm from "@/app/ui/tsukeku/tsukeku-form";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Suspense } from "react";
import { getHokkuById } from "@/app/lib/data";

export default async function Page({ params }: { params: {id: string } }) {
  const session = await auth();
  const hokku = await getHokkuById(params.id);
  if (!hokku) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-6 items-center justify-center mb-12">
      <Suspense fallback={<div>Loading...</div>}>
        <HokkuCard
          ikku={hokku.ikku}
          niku={hokku.niku}
          sanku={hokku.sanku}
          description={hokku.description}
          isPosted={false}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TsukekuForm session={session} />
      </Suspense>
    </div>
  );
}
