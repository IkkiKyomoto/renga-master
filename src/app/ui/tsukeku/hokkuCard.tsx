export default function HokkuCard({
  ikku,
  niku,
  sanku,
  description,
  isPosted,
  isMine,
}: {
  ikku: string;
  niku: string;
  sanku: string;
  description: string | null;
  isPosted?: boolean;
  isMine?: boolean;
}) {
  return (
    <div>
      <div>
        <h1>{ikku}</h1>
        <p>{niku}</p>
        <p>{sanku}</p>
        <p>{description}</p>
      </div>
      {isPosted && <p>投稿済</p>}
      {isMine && <p>マイ発句</p>}
      <p></p>
    </div>
  );
}
