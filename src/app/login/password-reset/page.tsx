import React from "react";
import PasswordResetForm from "@/app/ui/login/pasword-reset-form"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 mt-6 text-center">
          パスワードの再設定
        </h1>
        <div className="text-center">
          <p className="mb-4">
            パスワードの再設定を行います。メールアドレスを入力し、以下のボタンから再設定用メールを送信しますので、リンクより再設定を行なってください。
          </p>
          <PasswordResetForm />
        </div>
      </div>
    </div>
  );
}
