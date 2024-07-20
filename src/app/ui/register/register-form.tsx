"use client";

import { createUser } from "@/app/lib/userActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const message = await createUser(
      form.name.value,
      form.email.value,
      form.password.value,
      form.passwordConfirm.value,
    );
    if (message === undefined) {
      toast.success("登録しました");
      router.push("/");
    } else {
      toast.error(message);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">名前</label>
        <input name="name" id="name" />
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="passwordConfirm">パスワード確認</label>
        <input type="password" name="passwordConfirm" id="passwordConfirm" />
        <button type="submit">登録</button>
      </form>
    </div>
  );
}
