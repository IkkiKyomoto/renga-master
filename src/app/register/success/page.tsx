'use client'

import React from "react";
import { sendVerificationEmail } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") as string;
    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    try {
      await sendVerificationEmail(email);
    } catch (error: any) {
      console.error(error);
      toast.error("エラーが発生しました");
    }
}
  return (
    <div>
      <div className="flex flex-col items-center justify-between ">
        <h1 className="text-3xl font-bold mb-6 mt-6">仮登録完了</h1>
        <div>
          <p>
            仮登録が完了しました。登録したEメールに認証用のリンクが送信されます。リンクより、登録を完了してください。認証メールが届かない場合は、下のボタンから再送信してください。
          </p>
          <button onClick={handleSubmit}>再送信</button>
        </div>
        <div>
          <a href="/login">ログインする</a>
        </div>
      </div>
    </div>
  );
}
