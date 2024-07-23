"use client";
import { createTsukeku } from "@/app/lib/rengaActions";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function TsukekuForm() {
  const params = useParams();
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const hokkuId = params.id as string;

    const message = await createTsukeku(
      form.shiku.value,
      form.tsukeku.value,
      form.description.value,
      hokkuId,
    );
    if (message === undefined) {
      toast.success("送信しました");
      router.push("/tsukeku");
    } else {
      toast.error(message);
    }
  }
  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="shiku" className="block text-black text-base font-bold mb-2">第四句</label>
          <input type="text" id="shiku" name="shiku"  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="mb-4">
          <label htmlFor="tsukeku" className="block text-black text-base font-bold mb-2">第五句</label>
          <input type="text" id="tsukeku" name="goku"  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="mb-4">
          <label htmlFor="tsukeku" className="block text-black text-base font-bold mb-2">説明</label>
          <textarea name="description" id="description"  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">送信</button>
      </form>
    </div>
  );
}
