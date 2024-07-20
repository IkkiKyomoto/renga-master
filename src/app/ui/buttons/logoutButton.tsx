"use client";

import { logout } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export function LogoutButton() {
  //const router = useRouter();
  return (
    <form action={logout}>
      <button
        onClick={async () => {
          await logout();
          toast.success("ログアウトしました");
        }}
      >
        ログアウト
      </button>
    </form>
  );
}
