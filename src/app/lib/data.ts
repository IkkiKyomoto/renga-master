import { renga } from "./placeholder";
import prisma from "@/app/lib/prisma";
import { Hokku, User } from "@/app/lib/definitions";

export function getRengasByDate() {
  const rengas = [];
  for (var i = 0; i < 12; i++) {
    rengas.push(renga);
  }
  return rengas;
}

export function getRengasByGoodForWeek() {
  const rengas = [];
  for (var i = 0; i < 12; i++) {
    rengas.push(renga);
  }
  return rengas;
}

export async function getHokkus() {
  try {
    const hokkus: Hokku[] = await prisma.hokku.findMany({
      select: {
        userId: true,
        id: true,
        ikku: true,
        niku: true,
        sanku: true,
        description: true,
        completed: true,
        tsukeku: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        completed: false,
      },
    });
    return hokkus;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const user: User | null = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        image: true,
        likes: true,
      },
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("ユーザー情報の取得に失敗しました");
  }
}

export async function getHokkusByUserId(userId: string) {
  try {
    const hokkus: Hokku[] = await prisma.hokku.findMany({
      select: {
        userId: true,
        id: true,
        ikku: true,
        niku: true,
        sanku: true,
        description: true,
        completed: true,
        tsukeku: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            tsukeku: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        completed: false,
        userId: userId,
      },
    });

    return hokkus;
  } catch (error) {
    console.log(error);
    throw new Error("マイ発句の取得に失敗しました");
  }
}
