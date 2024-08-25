"use client";

import React, { useState } from "react";
import { createHokku } from "@/app/lib/rengaActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

//　発句作成フォーム
export function HokkuForm({ session }: { session: Session | null }) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    // ボタンを無効化
    form.submitButton.disabled = true;
    if (!session || !session.user || !session.user.id) {
      toast.error(
        "ユーザー情報が読み取れません。もう一度やり直すか再ログインをお願いします。",
      );
      return;
    }

    // toast.error("エラーが発生しました。サインアウトします")
    // await logout()
    // バリデーション
    if (!form.shoku.value || !form.niku.value || !form.sanku.value) {
      setErrorMessage("全ての句を入力してください");
      form.submitButton.disabled = false;
      return;
    }
    try {
      await createHokku(
        form.shoku.value,
        form.niku.value,
        form.sanku.value,
        "", //form.description.value,
        session.user.id,
      );
      toast.success("投稿しました");
      router.push("/");
    } catch (error: any) {
      form.submitButton.disabled = false;
      setErrorMessage(error.message);
    }
    
  }
  return (
    <div className="flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {errorMessage && (
          <div className="text-red-500 text-xs italic">{errorMessage}</div>
        )}
        <div className="mb-4">
          <label
            htmlFor="shoku"
            className="block text-black text-base font-bold mb-2"
          >
            初句
          </label>
          <input
            type="text"
            id="shoku"
            name="shoku"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="niku"
            className="block text-black text-base font-bold mb-2"
          >
            第二句
          </label>
          <input
            type="text"
            id="niku"
            name="niku"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="sanku"
            className="block text-black text-base font-bold mb-2"
          >
            第三句
          </label>
          <input
            type="text"
            id="sanku"
            name="sanku"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6"></div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            name="submitButton"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
}

export default HokkuForm;
