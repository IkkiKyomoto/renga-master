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
            hokkuId: true,
            description: true,
            yonku: true,
            goku: true,
          },
        },
      },
    });
    return rengas;
  } catch (error) {
    console.log(error);
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
            hokkuId: true,
            description: true,
            yonku: true,
            goku: true,
          },
        },
      },
    });

    return rengas;
  } catch (error: unknown) {
    console.log(error);
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

export async function getTsukekusByHokkuId(hokkuId: string) {
  try {
    const tsukekus: Tsukeku[] = await prisma.tsukeku.findMany({
      where: {
        hokkuId: hokkuId,
      },
    });
    return tsukekus;
  } catch (error: unknown) {
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
    throw new Error("発句の取得に失敗しました");
  }
}
