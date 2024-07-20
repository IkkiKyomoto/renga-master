"use client";

import HokkuCard from "@/app/ui/tsukeku/hokkuCard";
import TsukekuForm from "@/app/ui/tsukeku/tsukeku-form";
import { useParams, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Hokku } from "@/app/lib/definitions";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const ikku = searchParams.get("ikku") as string;
  const niku = searchParams.get("niku") as string;
  const sanku = searchParams.get("sanku") as string;
  const description = searchParams.get("description") as string;

  if (!(ikku && niku && sanku)) {
    notFound();
  }
  return (
    <div>
      <HokkuCard
        ikku={ikku}
        niku={niku}
        sanku={sanku}
        description={description}
        isPosted={false}
      />
      <TsukekuForm />
    </div>
  );
}
