"use client";

import React from "react";
import HokkuForm from "@/app/ui/hokku/hokku-form";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className="h-screen">
      <h1 className="text-center text-3xl font-bold mb-6 mt-6">発句する</h1>
      <div>
        <HokkuForm session={session} />
      </div>
    </div>
  );
}
