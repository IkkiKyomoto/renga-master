"use server";

import React from "react";
import HokkuForm from "@/app/ui/hokku/hokku-form";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();
  return (
    <div className="h-screen">
      <h1 className="text-center text-3xl font-bold mb-6 mt-6">発句する</h1>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <HokkuForm session={session} />
        </Suspense>
      </div>
    </div>
  );
}
