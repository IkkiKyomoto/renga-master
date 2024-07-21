import React from "react";
import RegisterForm from "@/app/ui/register/register-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-between ">
      <h1 className="text-3xl font-bold mb-6 mt-6">新規登録</h1>
      <div className="w-screen">
        <RegisterForm />
      </div>
      <div className="mt-6">
        <Link className="font-bold border border-b-black" href="/login">ログインする</Link>
      </div>
    </div>
  );
}
