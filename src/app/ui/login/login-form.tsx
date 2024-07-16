'use client'

import { useSearchParams } from "next/navigation";
import { useActionState } from "react"
import { authenticate } from "@/app/lib/userActions";

export default function LoginForm() {


  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const [errorMessage, formAction] = useActionState(authenticate, undefined);
  return (
    <div>
      <form action={formAction}>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        <button type="submit">ログイン</button>
        {/* <button onClick={() => signIn('google', {callbackUrl})}>Google</button> */}
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
