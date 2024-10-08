"use client";
import { createTsukeku } from "@/app/lib/rengaActions";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Session } from "next-auth";

export default function TsukekuForm({ session }: { session: Session | null }) {
  const params = useParams();
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    form.submitButton.disabled = true;
    const hokkuId = params.id as string;
    if (!session || !session.user || !session.user.id) {
      toast.error(
        "ユーザー情報が読み取れません。もう一度やり直すか再ログインをお願いします。",
      );
      return;
    }
    if (!form.shiku.value || !form.tsukeku.value) {
      toast.error("全ての句を入力してください");
      form.submitButton.disabled = false;
      return;
    }

    try {
      await createTsukeku(
        form.shiku.value,
        form.tsukeku.value,
        "",
        hokkuId,
        session.user.id as string,
      );

      toast.success("送信しました");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
      form.submitButton.disabled = false;
    }
  }
  return (
    <div className="flex justify-center items-center w-4/5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="shiku"
            className="block text-black text-base font-bold mb-2"
          >
            第四句
          </label>
          <input
            type="text"
            id="shiku"
            name="shiku"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tsukeku"
            className="block text-black text-base font-bold mb-2"
          >
            第五句
          </label>
          <input
            type="text"
            id="tsukeku"
            name="goku"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          name="submitButton"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          送信
        </button>
      </form>
    </div>
  );
}
