"use server";

import prisma from "@/app/lib/prisma";
import { Hokku, Tsukeku, User } from "@/app/lib/definitions";
import { Renga } from "@/app/lib/definitions";

export async function getRengasByDate(perPage = 12) {
  try {
    const rengas: Renga[] = await prisma.renga.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: perPage,
      select: {
        id: true,
        hokkuId: true,
        tsukekuId: true,
        likes: true,
        hokku: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            ikku: true,
            niku: true,
            sanku: true,
            description: true,
          },
        },
        tsukeku: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            hokkuId: true,
            description: true,
            yonku: true,
            goku: true,
          },
        },
      },
    });
    console.log(rengas);
    return rengas;
  } catch (error) {
    console.error(error);
    throw new Error("新着連歌の取得に失敗しました");
  }
}

export async function getRengasByGoodForWeek(perPage = 12) {
  try {
    const rengas: Renga[] = await prisma.renga.findMany({
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      take: perPage,
      select: {
        id: true,
        hokkuId: true,
        tsukekuId: true,
        likes: true,
        hokku: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            ikku: true,
            niku: true,
            sanku: true,
            description: true,
          },
        },
        tsukeku: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            hokkuId: true,
            description: true,
            yonku: true,
            goku: true,
          },
        },
      },
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    console.log(rengas);
    return rengas;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("週間いいねランキングの取得に失敗しました");
  }
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
    console.log(hokkus);
    return hokkus;
  } catch (error) {
    console.error(error);
    throw new Error("付句の取得に失敗しました");
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
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
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
    console.log(hokkus);

    return hokkus;
  } catch (error) {
    console.error(error);
    throw new Error("マイ発句の取得に失敗しました");
  }
}

export async function getTsukekusByHokkuId(hokkuId: string) {
  try {
    const tsukekus: Tsukeku[] = await prisma.tsukeku.findMany({
      where: {
        hokkuId: hokkuId,
      },
    });
    console.log(tsukekus);
    return tsukekus;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("付句の取得に失敗しました");
  }
}

export async function getHokkuById(id: string) {
  try {
    const hokku: Hokku | null = await prisma.hokku.findUnique({
      where: {
        id: id,
      },
    });
    console.log(hokku);
    return hokku;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("発句の取得に失敗しました");
  }
}

export async function getUser(email: string): Promise<User | null> {
  const user: User | null = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      password: true,
      emailVerified: true,
    },
    where: {
      email: email,
    },
  });
  return user;
}
