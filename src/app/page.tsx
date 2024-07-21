"use server";
import NewCards from "./ui/top/newCards";
import RankingCards from "./ui/top/rankingCards";
import MyTsukekuList from "./ui/top/myTsukekuList";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="p-10">
      <div className="flex flex-col items-center justify-between">
      {session && (
        <div className="">
          <MyTsukekuList />
        </div>
      ) }
        <div className="flex flex-raw mt-6 ">
          <NewCards />

          <RankingCards />
        </div>
      </div>
    </main>
  );
}

