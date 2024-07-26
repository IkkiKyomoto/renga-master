"use client";

import React from "react";
import { sendVerificationEmail } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    try {
      await sendVerificationEmail(email);
    } catch (error: any) {
      console.error(error);
      toast.error("エラーが発生しました");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 mt-6 text-center">仮登録完了</h1>
        <div className="text-center">
          <p className="mb-4">
            仮登録が完了しました。登録したEメールに認証用のリンクが送信されます。リンクより、登録を完了してください。認証メールが届かない場合は、下のボタンから再送信してください。
          </p>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            再送信
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            ログインする
          </a>
        </div>
      </div>
    </div>
  );
}
