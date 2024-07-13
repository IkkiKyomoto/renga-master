import CardList from "./ui/cardList";
import NewCards from "./ui/top/newCards";
import RankingCards from "./ui/top/rankingCards";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <NewCards />
      <RankingCards />
    </main>
  );
}
