"use server";
import NewCards from "./ui/top/newCards";
import RankingCards from "./ui/top/rankingCards";
import MyTsukekuList from "./ui/top/myTsukekuList";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      {session && (
        <div>
          <MyTsukekuList />
        </div>
      )}
      <NewCards />
      <RankingCards />
    </main>
  );
}
