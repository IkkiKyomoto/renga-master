"use client";

import Link from "next/link";
import "@/app/ui/instruction/instruction.css";

export default function Page() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-6 mt-6">遊び方</h1>
      <nav className="ml-20 mb-6 mr-20">
        <ul className="">
          <li className="font-bold text-lg mb-6 border-b">
            <Link href="/instruction#whats_renga">連歌とは</Link>
          </li>
          <li className="font-bold text-lg mb-6 border-b">
            <Link href="/instruction#instruction">遊び方</Link>
          </li>
          <li>
            <ul>
              <li className="mb-6">
                　
                <Link href="/instruction#instruction-1">1.自分で発句する</Link>
              </li>
              <li className="mb-6">
                　
                <Link href="/instruction#instruction-2">
                  2.誰かの発句に付句する
                </Link>
              </li>
              <li className="mb-6">
                　
                <Link href="/instruction#instruction-3">
                  3.連歌を完成させる
                </Link>
              </li>
              <li className="mb-6">
                　<Link href="/instruction#instruction-like">いいねする</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <article
        id="instruction__article"
        className="mr-20 ml-20 bg-white p-3 mb-20"
      >
        <h2>連歌とは</h2>
        <p>
          　連歌とは、古来より日本に伝わる詩形の一種です。連歌は一人で詠むものではなく、長句（5・７・５）と短句（7・７）を複数人が重ねて交互に読んで、一つの和歌を
          <span className="emphasis">共同作業</span>により完成させます。
          <br />　<span className="emphasis">長連歌</span>と
          <span className="emphasis">短連歌</span>
          の二種類の形式が広く知られており、短連歌は平安時代に、長連歌は鎌倉時代以降に盛んに行われました。短連歌は二人の詠み手が上の句（発句）と下の句（付句）をそれぞれ詠んで一首を完成させます。一方で、長連歌は複数人が長句と短句を交互に長く続けて、それを一首とします。連歌ますたぁでは、
          <span className="emphasis">短連歌</span>
          の形式をもとにして、インターネット上で遊ぶことができるアプリとして再構成しています。
        </p>

        <h2 id="instruction">遊び方</h2>
        <p>
          では、早速連歌を作ってみましょう。次の三つの流れで、連歌を作ります。
        </p>
        <h3 id="instruction-1">1.自分で発句する</h3>
        <p>まずは、上の句を作りましょう。</p>
        <p>
          一. 画面上の「<span className="emphasis">発句する</span>
          」をクリックorタップしてみましょう。
        </p>
        <p>
          二. 画面から上の句を<span className="emphasis">入力</span>
          することができます。5・7・5に合わせて（字余り・字足らずも構いません）発句を作ってみましょう。
        </p>
        <p>
          三. 投稿が終わった発句は、
          <span className="emphasis">トップ画面から確認</span>
          することができます。
        </p>
        <h3 id="instruction-2">2.誰かの発句に付句する</h3>
        <p>
          一. 画面上の「<span className="emphasis">付句する</span>
          」をクリックorタップしてみましょう。
        </p>
        <p>
          二. <span className="emphasis">好きな発句</span>を選択し、
          <span className="emphasis">付句</span>
          しましょう。なお、あなたが作った発句や既にあなたが付句を行っている発句には、付句できません。
        </p>
        <p>
          三. 画面から下の句を<span className="emphasis">入力</span>
          することができます。7・７に合わせて（もちろん字余り・字足らずもOK）付句を作ってみましょう。
        </p>
        <h3 id="instruction-3">3.連歌を完成させる</h3>
        <p>
          一. あなたの発句には、
          <span className="emphasis">他の詠み手の付句</span>
          が投稿されてきます。その中からお好みの付句を
          <span className="emphasis">選択</span>し、連歌を完成させましょう！
        </p>
        <p>
          二. <span className="emphasis">トップ画面</span>に、あなたの
          <span className="emphasis">未完成の発句</span>
          が表示されます。クリックorタップしてみましょう。
        </p>
        <p>
          三. お好みの付句を<span className="emphasis">選択</span>
          し、投稿してみましょう。
        </p>
        <p>
          四. 連歌が完成しました！
          <span className="emphasis">トップ画面から確認</span>
          することができます。
        </p>
        <h3 id="instruction-like">いいねする</h3>
        <p>
          トップ画面に表示される連歌の中で、気に入ったものには
          <span className="emphasis">良を送信</span>
          することができます。良の数によって人気連歌の並び順が決まります。気に入った連歌にはどんどん良をつけましょう！
        </p>
      </article>
    </div>
  );
}
