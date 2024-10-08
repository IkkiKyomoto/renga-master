"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { createLike } from "@/app/lib/rengaActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CardLikeWrapper({
  children,
  rengaId,
  likeNum,
  isLikedisable,
}: {
  children: React.ReactNode;
  rengaId: string;
  likeNum: number;
  isLikedisable: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();


    if (!isLikedisable) {
      isLikedisable = true;
      try {
        const userId = session?.user?.id as string;
        await createLike(userId, rengaId);
        router.refresh();
      } catch (error) {
        isLikedisable = false;
        toast.error("良の送信に失敗しました");
      }
    }
  }
  return (
    <button id="button" className="" onClick={handleClick}>
      {children}
      <p className="text-center text-xs">{likeNum}</p>
    </button>
  );
}
