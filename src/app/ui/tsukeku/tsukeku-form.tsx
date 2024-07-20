"use client";
import { createTsukeku } from "@/app/lib/rengaActions";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function TsukekuForm() {
  const params = useParams();
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const hokkuId = params.id as string;

    const message = await createTsukeku(
      form.shiku.value,
      form.tsukeku.value,
      form.description.value,
      hokkuId,
    );
    if (message === undefined) {
      toast.success("送信しました");
      router.push("/tsukeku");
    } else {
      toast.error(message);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shiku">第四句</label>
          <input type="text" id="shiku" name="shiku" />
        </div>
        <div>
          <label htmlFor="tsukeku">第五句</label>
          <input type="text" id="tsukeku" name="goku" />
        </div>
        <div>
          <label htmlFor="tsukeku">説明</label>
          <textarea name="description" id="description"></textarea>
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
}
