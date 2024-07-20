"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const tooMuchMessage = "文字数が多すぎます";
const tooFewMessage = "文字数が少なすぎます";

const rengaFormScheme = z.object({
  shoku: z
    .string({ required_error: "入力してください" })
    .min(1, { message: "初句の" + tooFewMessage })
    .max(6, { message: "初句の" + tooMuchMessage }),
  niku: z
    .string({ required_error: "入力してください" })
    .min(1, { message: "第二句の" + tooFewMessage })
    .max(8, { message: "第二句の" + tooMuchMessage }),
  sanku: z
    .string({ required_error: "入力してください" })
    .min(1, { message: "第三句の" + tooFewMessage })
    .max(6, { message: "第三句の" + tooMuchMessage }),
  shiku: z
    .string({ required_error: "入力してください" })
    .min(1, { message: "第四句の" + tooFewMessage })
    .max(8, { message: "第四句の" + tooMuchMessage }),
  goku: z
    .string({ required_error: "入力してください" })
    .min(1, { message: "第五句の" + tooFewMessage })
    .max(8, { message: "第五句の" + tooMuchMessage }),
});

const hokkuFormScheme = rengaFormScheme.omit({ shiku: true, goku: true });
const tsukekuFormScheme = rengaFormScheme.omit({
  shoku: true,
  niku: true,
  sanku: true,
});
export async function createHokku(
  shoku: string,
  niku: string,
  sanku: string,
  description: string,
) {
  const validateFields = hokkuFormScheme.safeParse({
    shoku,
    niku,
    sanku,
  });
  if (!validateFields.success) {
    return validateFields.error.errors[0].message;
  }
  const data = validateFields.data;
  const session = await auth();
  const id = session?.user?.id;
  try {
    const hokku = await prisma.user.update({
      where: { id: id },
      data: {
        hokkus: {
          create: {
            ikku: data.shoku,
            niku: data.niku,
            sanku: data.sanku,
            description: description,
          },
        },
      },
    });
  } catch (error: unknown) {
    return "送信に失敗しました";
  }
}

export async function createTsukeku(
  shiku: string,
  goku: string,
  description: string,
  hokkuId: string,
) {
  const validateFields = tsukekuFormScheme.safeParse({
    shiku,
    goku,
  });
  if (!validateFields.success) {
    return validateFields.error.errors[0].message;
  }
  const data = validateFields.data;
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const tsukeku = await prisma.tsukeku.create({
      data: {
        yonku: data.shiku,
        goku: data.goku,
        description: description,
        hokku: {
          connect: {
            id: hokkuId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error: unknown) {
    return "送信に失敗しました";
  }
}

export async function createRenga(hokkuId: string, tsukekuId: string) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.renga.create({
        data: {
          hokku: {
            connect: {
              id: hokkuId,
            },
          },
          tsukeku: {
            connect: {
              id: tsukekuId,
            },
          },
        },
      });
      await prisma.hokku.update({
        where: {
          id: hokkuId,
        },
        data: {
          completed: true,
        },
      });
    });
  } catch (error: unknown) {
    throw new Error("連歌の作成に失敗しました");
  }
}
