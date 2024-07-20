"use client";

import React, { useState } from "react";
import { createHokku } from "@/app/lib/rengaActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function HokkuForm() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // toast.error("エラーが発生しました。サインアウトします")
    // await logout()
    const message = await createHokku(
      form.shoku.value,
      form.niku.value,
      form.sanku.value,
      form.description.value,
    );
    if (message === undefined) {
      toast.success("投稿しました");
      router.push("/");
    }
    setErrorMessage(message);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shoku">初句</label>
          <input type="text" id="shoku" name="shoku" />
        </div>
        <div>
          <label htmlFor="niku">二句</label>
          <input type="text" id="niku" name="niku" />
        </div>
        <div>
          <label htmlFor="sanku">三句</label>
          <input type="text" id="sanku" name="sanku" />
        </div>
        <div>
          <label htmlFor="sanku">説明</label>
          <textarea name="description" id="description"></textarea>
        </div>

        <button type="submit">送信</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default HokkuForm;
