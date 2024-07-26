"use client";

import React from "react";
import { sendPasswordResetEmail } from "@/app/lib/userActions";
import { toast } from "react-toastify";

export default function PasswordResetForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    try {
    await sendPasswordResetEmail(email);
    toast.success("再設定メールを送信しました");
  } catch (error: any) {
    console.error(error);
    toast.error("再設定メールの送信に失敗しました");
  }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-left mb-2 font-bold text-gray-700"
        >
          メールアドレス
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <input
        name="submit"
        type="submit"
        value="再設定メールを送信する"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
      />
    </form>
  );
}
