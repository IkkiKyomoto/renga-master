"use server";

import { z } from "zod";
import prisma from "@/app/lib/prisma";

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
  userId: string,
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
  try {
    console.log(`submit hokku of ${userId}`);
    await prisma.user.update({
      where: { id: userId },
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
    console.log(`create hokku of ${userId}`);
  } catch (error: unknown) {
    console.error(error);
    throw new Error("発句の作成に失敗しました。");
  }
}

export async function createTsukeku(
  shiku: string,
  goku: string,
  description: string,
  hokkuId: string,
  userId: string,
) {
  const validateFields = tsukekuFormScheme.safeParse({
    shiku,
    goku,
  });
  if (!validateFields.success) {
    //return validateFields.error.errors[0].message;
    throw new Error("付句を完成させてください");
  }
  const data = validateFields.data;
  try {
    console.log(`try to submit tsukeku of ${userId} to ${hokkuId}`);
    await prisma.tsukeku.create({
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
    console.log(`create tsukeku of ${userId} to ${hokkuId}`);
  } catch (error: unknown) {
    console.error(error);
    throw new Error("付句の作成に失敗しました");
  }
}

export async function createRenga(hokkuId: string, tsukekuId: string) {
  try {
    console.log(`try to submit renga as ${hokkuId} and ${tsukekuId}`);
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
    console.log(`create renga as ${hokkuId} to ${tsukekuId}`);
  } catch (error: unknown) {
    console.log(error);
    throw new Error("連歌の作成に失敗しました");
  }
}

export async function createLike(userId: string, rengaId: string) {
  console.log(`try to submit like of ${userId} to ${rengaId}`);
  try {
    await prisma.like.create({
      data: {
        userId: userId,
        rengaId: rengaId,
      },
    });
    console.log(`create like of ${userId} to ${rengaId}`);
  } catch (error: unknown) {
    console.error(error);
    throw new Error("良の送信に失敗しました");
  }
}
