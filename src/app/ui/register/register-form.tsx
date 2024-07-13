export default function RegisterForm() {
  return (
    <div>
      <form action="">
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        <button type="submit">登録</button>
      </form>
    </div>
  );
}
