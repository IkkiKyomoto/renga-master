import { getRengasByDate } from "../../lib/data";
import Card from "../card";

export default function RankingCards() {
    const rengas = getRengasByDate()
    return (
        <div>
            <h1 className='text-3xl font-bold'>新着連歌</h1>        
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {rengas.map((renga, index) => {
                    return (<Card key={index} renga={renga}/>)
                })}
            </div>
        </div>
    );
}