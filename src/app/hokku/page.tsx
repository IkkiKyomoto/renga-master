import React from "react";
import HokkuForm from "@/app/ui/hokku/hokku-form";

export default function Page() {
  return (
    <div className="h-screen">
      <h1 className="text-center text-3xl font-bold mb-6 mt-6">発句する</h1>
      <div>
        <HokkuForm />
      </div>
    </div>
  );
}
