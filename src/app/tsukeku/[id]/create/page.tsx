"use server";

import HokkuCard from "@/app/ui/tsukeku/hokkuCard";
import TsukekuForm from "@/app/ui/tsukeku/tsukeku-form";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();
  const searchParams = useSearchParams();
  const ikku = searchParams.get("ikku") as string;
  const niku = searchParams.get("niku") as string;
  const sanku = searchParams.get("sanku") as string;
  const description = searchParams.get("description") as string;

  if (!(ikku && niku && sanku)) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-6 items-center justify-center mb-12">
      <Suspense fallback={<div>Loading...</div>}>
        <HokkuCard
          ikku={ikku}
          niku={niku}
          sanku={sanku}
          description={description}
          isPosted={false}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TsukekuForm session={session} />
      </Suspense>
    </div>
  );
}
