import { useActionState } from 'react';
import { createUser, State } from '@/app/lib/userActions';

export default function RegisterForm() {
  const initialState: State = {
    message: null,
    errors: {}
  };
  return (
    <div>
      <form action={createUser}>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        <button type="submit">登録</button>
      </form>
    </div>
  );
}
