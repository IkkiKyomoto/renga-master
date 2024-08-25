"use server";

import HokkuCard from "@/app/ui/tsukeku/hokkuCard";
import TsukekuForm from "@/app/ui/tsukeku/tsukeku-form";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function Page({ params }: { params: { ikku: string; niku: string, sanku:string, description:string } }) {
  const session = await auth();


  if (!(params.ikku && params.niku && params.sanku)) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-6 items-center justify-center mb-12">
      <Suspense fallback={<div>Loading...</div>}>
        <HokkuCard
          ikku={params.ikku}
          niku={params.niku}
          sanku={params.sanku}
          description={params.description}
          isPosted={false}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TsukekuForm session={session} />
      </Suspense>
    </div>
  );
}
