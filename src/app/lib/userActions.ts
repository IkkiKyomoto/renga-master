"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import prisma from "@/app/lib/prisma";
import { passWordHash } from "@/app/lib/hash";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { createTransport } from "nodemailer";
import { randomUUID } from "crypto";
import { getUser } from "./data";
import { EmailNotVerifiedError } from "../error/emailNotVerifiedError";


const FormScheme = z
  .object({
    name: z
      .string()
      .min(1, { message: "名前は1文字以上で入力してください" })
      .max(10, { message: "名前は10文字以下で入力してください" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "パスワードは6文字以上で入力してください" })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "パスワードは半角英数字で入力してください",
      })
      .max(20, { message: "パスワードは20文字以下で入力してください" }),
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

export async function authenticate(email: string, password: string) {
  
    const user = await getUser(email);

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }
    if (user.emailVerified === false) {
      throw new EmailNotVerifiedError();
    }
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

  redirect("/");
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
) {
  const validateFields = FormScheme.safeParse({
    name,
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
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    sendVerificationEmail(data.email);
  } catch (error: any) {
    console.log(error);
    throw new Error('ユーザーの作成に失敗しました');
  }
  redirect("/register/success");
}

export async function logout() {
  await signOut();
  redirect("/");
}

export async function sendVerificationEmail(email: string) {
  const transport = createTransport({
    host: process.env.EMAIL_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const token = randomUUID().toString();
  const baseUrl = process.env.BASE_URL;
  const verificationUrl = new URL(
    `/register/email-verification/${token}`,
    baseUrl,
  );
  try {
    await prisma.verificationToken.create({
      data: {
        token: token,
        identifier: email,
        expires: new Date(Date.now() + 1000 * 60 * 20),
      },
    });
    await transport.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Eメール認証",
      text: `以下のリンクから、Eメール認証を完了してください\n\n${verificationUrl}\n\n＊本メールに覚えがない場合、他のユーザーが誤ってメールアドレスを入力した可能性がありますので、お手数ですが、本メールの破棄をお願いします。`,
    });
  } catch (error) {
    console.error(error);
    throw new Error("認証メールの送信に失敗しました");
  }
}

export async function verifyEmail(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token: token,
      },
    });
    if (!verificationToken) {
      console.error("token not found");
      throw new Error("認証トークンが見つかりません");
    }
    if (verificationToken?.expires < new Date()) {
      console.error("token expired");
      throw new Error("認証トークンの期限が切れています");
    }
    const email = verificationToken.identifier;
    await prisma.$transaction([
      prisma.verificationToken.delete({
        where: {
          token: token,
        },
      }),
      prisma.user.update({
        where: {
          email: email,
        },
        data: {
          emailVerified: true,
        },
      }),
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("認証トークンの取得に失敗しました");
  }
}
