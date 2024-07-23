"use server";
import NewCards from "./ui/top/newCards";
import RankingCards from "./ui/top/rankingCards";
import MyTsukekuList from "./ui/top/myTsukekuList";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="pt-6 ps-3 md:p-6">
      <div className="flex flex-col items-center justify-between">
        {session && (
          <div className="">
            <MyTsukekuList />
          </div>
        )}
        <div className="md:flex mt-6 ">
          <NewCards />
          <RankingCards />
        </div>
      </div>
    </main>
  );
}
