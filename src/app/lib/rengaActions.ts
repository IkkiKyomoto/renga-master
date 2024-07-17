"use server";

import {  z } from "zod";
import prisma  from "@/app/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const tooMuchMessage = "文字数が多すぎます";
const tooFewMessage = "文字数が少なすぎます";

const rengaFormScheme = z
  .object({
    shoku: z.string({required_error:'入力してください'}).min(1, {message: '初句の' + tooFewMessage}).max(6, {message: '初句の' +tooMuchMessage}),
    niku: z.string({required_error:'入力してください'}).min(1, {message: '第二句の' +tooFewMessage}).max(8, {message:'第二句の' + tooMuchMessage}),
    sanku: z.string({required_error:'入力してください'}).min(1, {message:'第三句の' + tooFewMessage}).max(6, {message:'第三句の' + tooMuchMessage}),
    shiku: z.string({required_error:'入力してください'}).min(1, {message:'第四句の' + tooFewMessage}).max(8, {message: '第四句の' +tooMuchMessage}),
    goku: z.string({required_error:'入力してください'}).min(1, {message: '第五句の' +tooFewMessage}).max(8, {message: '第五句の' +tooMuchMessage}),

  });


const hokkuFormScheme = rengaFormScheme.omit({shiku: true, goku: true});
const tsukekuFormScheme = rengaFormScheme.omit({shoku: true, niku: true, sanku: true});
export async function createHokku(
    prevState: string | undefined,
    formData: FormData,
) {
    const session = await auth();
    const id = session?.user?.id;
    const shoku = formData.get("shoku") as string;
    const niku = formData.get("niku") as string;
    const sanku =  formData.get("sanku") as string;
    const description = formData.get("description") as string;
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
        return '送信に失敗しました'
    }
    redirect('/')
}

export async function createTsukeku(shiku: string, goku: string) {
    
}