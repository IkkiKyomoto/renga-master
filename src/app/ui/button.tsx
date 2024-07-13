"use client";
import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/login");
      }}
    >
      ログイン
    </button>
  );
}

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/");
      }}
    >
      ログアウト
    </button>
  );
}

export function RegisterButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/register");
      }}
    >
      新規登録
    </button>
  );
}
