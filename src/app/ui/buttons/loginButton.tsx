"use client";

import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/login");
      }}
      className="text-blue-600"
    >
      ログイン
    </button>
  );
}
