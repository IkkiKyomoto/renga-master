import React from 'react';
import LoginForm from '@/app/ui/login/login-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Page() {
    return (
        <div>
            <h1>ログイン</h1>
            <div>
                <LoginForm />
            </div>
            <div>
                {/* <button onClick={() => signIn('google')}>Google</button> */}
            </div>
            <div>
                <Link href='/register'>新規登録</Link>
            </div>
        </div>
    )
}