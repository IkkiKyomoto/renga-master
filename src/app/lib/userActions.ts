"use server"

import { sql } from "@vercel/postgres";
import { error } from "console";
import Email from "next-auth/providers/email";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { custom, z } from "zod";

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

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

export async function createUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const validateFields = FormScheme.safeParse({
        email,
        password,
        passwordConfirm: formData.get("passwordConfirm") as string,
    });
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "入力内容に誤りがあります",
        }
    }
    const data = validateFields.data;

    try {
        await sql`
        INSEERT INTO users (email, password)
        VALUES (${data.email}, ${data.password})
        `
        redirect('/login')
    } catch (error) {
        return {
            message: '登録に失敗しました',
        }
    }
}