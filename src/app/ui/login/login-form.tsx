export default function LoginForm() {
    return (
        <div>
            <form>
                <label htmlFor="email">メールアドレス</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">パスワード</label>
                <input type="password" name="password" id="password" />
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}