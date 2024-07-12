//カードリストを表示するコンポーネント

import { Renga } from "../lib/definitions";
import {renga} from "../lib/placeholder";
import Card from "./card";

export default function CardList({rengas}: {rengas: Renga[]}) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {rengas.map((renga, index) => {
                return (<Card key={index} renga={renga}/>)
            })}
        </div>
    );
}