'use client'

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  return (
    <div>
      <form>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        <button type="submit">ログイン</button>
        <button onClick={() => signIn('google', {callbackUrl})}>Google</button>
      </form>
    </div>
  );
}
