'use server'

import Link from "next/link";
import React from "react";
import { verifyEmail } from "@/app/lib/userActions";

export default async function Page({ params }: { params: { token: string } }) {
  var errorMessage: string | null = null;
  var verified = false;
  try {
    verified = await verifyEmail(params.token);
  } catch (error: any) {
    console.error(error);
    errorMessage = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!verified ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">メール認証</h1>
          <p>メールアドレスの認証に失敗しました。{errorMessage}</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 mt-6 text-center">
            メール認証
          </h1>
          <div className="text-center">
            <p className="mb-4">
              メールアドレスの認証が完了しました。ログインが可能になります。
            </p>
            <Link href="/login">
              <a className="text-blue-500 hover:underline">ログインする</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
