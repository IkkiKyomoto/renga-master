'use client'

import { useRouter } from "next/navigation";

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