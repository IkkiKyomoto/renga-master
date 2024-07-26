'use client';

import React from "react";
import { toast } from "react-toastify";
import { passwordReset } from "@/app/lib/userActions";
import { useRouter } from "next/navigation";

export default function PasswordReset({ email }: { email: string }) {
  const router = useRouter()
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;
    try {
      await passwordReset(email, password, passwordConfirm);
      toast.success("パスワードをリセットしました");
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-left mb-2 font-bold text-gray-700"
        >
          新しいパスワード
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="passwordConfirm"
          className="block text-left mb-2 font-bold text-gray-700"
        >
          新しいパスワード（確認）
        </label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          required
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <input
        type="submit"
        value="パスワードをリセットする"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
      />
    </form>
  );
}
