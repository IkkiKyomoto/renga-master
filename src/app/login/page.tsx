import React from "react";
import LoginForm from "@/app/ui/login/login-form";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-3xl font-bold mb-6 mt-6">ログイン</h1>
      <div className="w-screen">
        <LoginForm />
      </div>
      <div className="mt-6">
        <Link className="font-bold border border-b-black" href="/register">
          新規登録する
        </Link>
      </div>
    </div>
  );
}
