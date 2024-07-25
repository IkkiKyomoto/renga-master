'use client'

import React from "react";
import { sendVerificationEmail } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { email: string } }) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    console.log(params.email);
    if (!email){
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
    <div>
      <div className="flex flex-col items-center justify-between ">
        <h1 className="text-3xl font-bold mb-6 mt-6">Eメール認証</h1>
        <div>
          <p>
            まだメールアドレスの認証が完了していません。登録したEメールに認証用のリンクが送信されますので、リンクより認証を完了してください。認証メールが届かない場合は下のボタンから再送信してください。
          </p>
          <button onClick={handleSubmit}>再送信</button>
        </div>
      </div>
    </div>
  );
}