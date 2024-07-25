"use client";
//import { useState } from "react";

import { authenticate } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { sendVerificationEmail } from "@/app/lib/userActions";
//import { useRouter } from "next/navigation";

export default function LoginForm() {
  //const router = useRouter();
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  //const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    var isEmailNotVerified = false;
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await authenticate(form.email.value, form.password.value);
      toast.success("ログインしました");
    } catch (error: any) {

      if (error.message ===  "メールアドレスが認証されていません") {
        
        toast.warning("メールアドレスが認証されていません");
        isEmailNotVerified = true;
      } else {
        toast.error("ログインに失敗しました");
      }

    }
    if (isEmailNotVerified) {
      await sendVerificationEmail(form.email.value);
      router.push("/login/not-verified?email=" + form.email.value, );

    }
  }
  return (
    // <div className="flex justify-center align-center">
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="email">メールアドレス</label>
    //     <input type="email" name="email" id="email" />
    //     <label htmlFor="password">パスワード</label>
    //     <input type="password" name="password" id="password" />
    //     <button type="submit">ログイン</button>
    //     {/* <button onClick={() => signIn('google', {callbackUrl})}>Google</button> */}
    //   </form>
    //   {/* {errorMessage && <p>{errorMessage}</p>} */}
    // </div>
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6">
        <label htmlFor="email" className="block text-base font-bold mb-2">
          メールアドレス
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <label htmlFor="password" className="block text-base font-bold mb-2">
          パスワード
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          ログイン
        </button>
        {/* <button onClick={() => signIn('google', {callbackUrl})} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Google</button> */}
      </form>
      {/* {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>} */}
    </div>
  );
}
