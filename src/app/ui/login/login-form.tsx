"use client";
//import { useState } from "react";

import { authenticate } from "@/app/lib/userActions";
import { toast } from "react-toastify";
//import { useRouter } from "next/navigation";

export default function LoginForm() {
  //const router = useRouter();
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  //const [errorMessage, setErrorMessage] = useState<string | undefined>();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = await authenticate(form.email.value, form.password.value);

    if (message === undefined) {
      toast.success("ログインしました");
    } else {
      toast.error(message);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        <button type="submit">ログイン</button>
        {/* <button onClick={() => signIn('google', {callbackUrl})}>Google</button> */}
      </form>
      {/* {errorMessage && <p>{errorMessage}</p>} */}
    </div>
  );
}
