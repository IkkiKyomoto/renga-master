import React from "react";
import { getUserById } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";

export default async function UserInfo({ userId }: { userId: string }) {
  let user: User | null = null;
  var userInfoGetError;
  console.log(userId);
  try {
    user = await getUserById(userId);
  } catch (error) {
    userInfoGetError = error;
  }

  return (
    <div>
      {userInfoGetError ? (
        <p>ユーザー情報の取得でエラーが発生しました</p>
      ) : (
        <div>
          <h1>あなたのプロフィール</h1>
          <p>名前：{user?.name}</p>
          <p>メールアドレス：{user?.email}</p>
        </div>
      )}
    </div>
  );
}
