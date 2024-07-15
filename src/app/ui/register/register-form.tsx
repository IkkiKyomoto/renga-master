'use client';

import { useActionState } from 'react';
import { createUser } from '@/app/lib/userActions';

export default function RegisterForm() {
  const [errorMessage, formAction] = useActionState(createUser, undefined);

  return (
    <div>
      <form action={formAction}>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="passwordConfirm">パスワード確認</label>
        <input type="password" name="passwordConfirm" id="passwordConfirm" />
        <button type="submit">登録</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
