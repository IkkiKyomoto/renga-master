"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import prisma from "@/app/lib/prisma";
import { passWordHash } from "@/app/lib/hash";
import { redirect } from "next/navigation";



const FormScheme = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "6文字以上で入力してください" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
      .max(20, { message: "20文字以下で入力してください" }),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        path: ["passwordConfirm"],
        code: "custom",
        message: "パスワードが一致しません",
      });
    }
  });

  export async function authenticate(
    email: string,
    password: string,
  ) {
    try {
      await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
    } catch (e) {
      return "ログインに失敗しました";
    }
    //console.log(res)
  }

export async function createUser(
  email: string,
  password: string,
  passwordConfirm: string
) {
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

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    //redirect('/login')
  } catch (error) {
    console.log(error);
    return "登録に失敗しました";
  }
  redirect("/login");
}
