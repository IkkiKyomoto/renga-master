"use client";

import React from "react";
import { sendVerificationEmail } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { email: string } }) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    if (!email) {
      toast.error("Eメールアドレスが見つかりません");
      return;
    }
    try {
      await sendVerificationEmail(email);
      toast.success("Eメールを再送信しました");
    } catch (error: any) {
      console.error(error);
      toast.error("Eメールの再送信でエラーが発生しました");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 mt-6 text-center">
          Eメール認証
        </h1>
        <div className="text-center">
          <p className="mb-4">
            まだメールアドレスの認証が完了していません。登録したEメールに認証用のリンクが送信されますので、リンクより認証を完了してください。認証メールが届かない場合は下のボタンから再送信してください。
          </p>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            再送信
          </button>
        </div>
      </div>
    </div>
  );
}
