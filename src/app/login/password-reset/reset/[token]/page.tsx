"use server";

import React from "react";
import { verifyPasswordResetToken } from "@/app/lib/userActions";
import PasswordReset from '@/app/ui/login/passwordReset'

export default async function Page({ params }: { params: { token: string } }) {
  var verified = false;
  var errorMessage: string | null = null;
  var email: string = '';
  var loading = true
  try {
    email = await verifyPasswordResetToken(params.token);
    verified = true;
  } catch (error: any) {
    verified = false;
    errorMessage = error.message;
  } finally {
    loading = false;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 mt-6 text-center">
          パスワードリセット
        </h1>
        {loading ? <p>読み込み中</p> : <div>
          {verified || email ? (
          <div>
            <PasswordReset email={email} />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-500 font-bold">
              トークンの認証に失敗しました。{errorMessage}
            </p>
          </div>
        )}
          
          </div>}

      </div>
    </div>
  );
}
