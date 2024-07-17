import { signOut } from "@/auth";


export function LogoutButton() {
  return (
    <form action={async() =>{
      'use server'
      await signOut()
    }
    }>
    <button>
      ログアウト
    </button>
</form>
  );
}
