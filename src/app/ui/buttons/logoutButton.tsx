'use client'

import { useRouter } from "next/navigation";
import {signOut} from "@/auth"

export function LogoutButton() {
    const router = useRouter();
    return (
      <button
        onClick={async() => {
            await signOut()
        }}
      >
        ログアウト
      </button>
    );
  }