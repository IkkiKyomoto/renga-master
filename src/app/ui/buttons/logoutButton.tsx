"use client";

import { logout } from "@/app/lib/userActions";
import { toast } from "react-toastify";

export function LogoutButton() {
  
  return (
    <form action={logout}>
      <button
        onClick={async () => {
          await logout();
          toast.success("ログアウトしました");

        }}
        className="text-red-700"
      >
        ログアウト
      </button>
    </form>
  );
}
