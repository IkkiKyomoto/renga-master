"use server"

import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn } from "@/auth"
import AuthError from "next-auth";
import bcypt from 'bcrypt';
import prisma from "@/app/lib/prisma";
import {passWordHash} from "@/app/lib/hash";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await signIn('credentials',{redirect: true, email: email, password: password});
    console.log('success');
  } catch (error) {
    console.log(error);
      if (error instanceof AuthError) {
        if (error) {
          console.log(error);
          return "ログインに失敗しました";
        }
      } else {
        console.log(error);
        return "ログインに失敗しました";
        
      }
        
  }
}

const FormScheme = z.object({
    email: z.string().email(),
    password: z.string()
    .min(6, { message: '6文字以上で入力してください' })
    .regex(/^[a-zA-Z0-9]+$/, { message: '半角英数字で入力してください' })
    .max(20, {message: "20文字以下で入力してください"}),
    passwordConfirm: z.string(),
})
.superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
            path: ['passwordConfirm'],
            code: 'custom',
            message: 'パスワードが一致しません',
        })
      }

})


   



export async function createUser( prevState: string | undefined,formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;
    const validateFields = FormScheme.safeParse({
        email,
        password,
        passwordConfirm,
    });
    if (!validateFields.success) {
        return validateFields.error.errors[0].message;  
    }

    const data = validateFields.data;

    try {
        const hashedPassword = passWordHash(data.password);
        const User = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            }
        })
        console.log(User);
        //redirect('/login')
    } catch (error) {
        console.log(error);
        return "登録に失敗しました";
    }
}