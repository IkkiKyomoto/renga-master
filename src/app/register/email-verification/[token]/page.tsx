import Link from "next/link";
import React from "react";
import { verifyEmail } from "@/app/lib/userActions";

export default async function Page({ params }: { params: { token: string } }) {
  var errorMessage: string | null = null;
  try {
    await verifyEmail(params.token);
  } catch (error: any) {
    console.error(error);
    errorMessage = error.message;
  }

  return (
    <div>
      {errorMessage ? (
        <div>
          <h1>メール認証</h1>
          <p>メールアドレスの認証に失敗しました。{errorMessage}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between ">
          <h1 className="text-3xl font-bold mb-6 mt-6">メール認証</h1>
          <div>
            <p>
              メールアドレスの認証が完了しました。ログインが可能になります。
            </p>
          </div>
          <div>
            <Link href={"/login"}>ログインする</Link>
          </div>
        </div>
      )}
      ;
    </div>
  );
}
