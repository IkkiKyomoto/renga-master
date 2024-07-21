"use client";

import React, { useState } from "react";
import { createHokku } from "@/app/lib/rengaActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function HokkuForm() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // toast.error("エラーが発生しました。サインアウトします")
    // await logout()
    const message = await createHokku(
      form.shoku.value,
      form.niku.value,
      form.sanku.value,
      form.description.value,
    );
    if (message === undefined) {
      toast.success("投稿しました");
      router.push("/");
    }
    setErrorMessage(message);
  }
  return (
<div className="flex justify-center items-center ">
  <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label htmlFor="shoku" className="block text-black text-base font-bold mb-2">初句</label>
      <input type="text" id="shoku" name="shoku" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-4">
      <label htmlFor="niku" className="block text-black text-base font-bold mb-2">第二句</label>
      <input type="text" id="niku" name="niku" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-4">
      <label htmlFor="sanku" className="block text-black text-base font-bold mb-2">第三句</label>
      <input type="text" id="sanku" name="sanku" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-6">
      <label htmlFor="description" className="block text-black text-sm font-bold mb-2">説明</label>
      <textarea name="description" id="description" className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="*任意" rows={3}></textarea>
    </div>
    <div className="flex items-center justify-between">
      <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        送信
      </button>
    </div>
  </form>
  {errorMessage && <div className="text-red-500 text-xs italic">{errorMessage}</div>}
</div>
  );
}

export default HokkuForm;
