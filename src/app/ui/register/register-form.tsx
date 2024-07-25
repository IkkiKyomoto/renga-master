"use client";

import { createUser } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { sendVerificationEmail } from "@/app/lib/userActions";

export default function RegisterForm() {
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    try {
      await createUser(
        form.userName.value,
        form.email.value,
        form.password.value,
        form.passwordConfirm.value,
      );
      await sendVerificationEmail(form.email.value);
      router.push("/register/success?email=" + form.email.value);
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex justify-center">
      <form className="w-full max-w-md bg-white p-6" onSubmit={handleSubmit}>
        <label className="block text-base font-bold mb-2" htmlFor="userName">
          名前
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="text"
          name="userName"
          id="userName"
        />
        <label className="block text-base font-bold mb-2" htmlFor="email">
          メールアドレス
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="email"
          name="email"
          id="email"
        />
        <label className="block text-base font-bold mb-2" htmlFor="password">
          パスワード
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="password"
          name="password"
          id="password"
        />
        <label
          className="block text-base font-bold mb-2"
          htmlFor="passwordConfirm"
        >
          パスワード確認
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          登録
        </button>
      </form>
    </div>
  );
}
