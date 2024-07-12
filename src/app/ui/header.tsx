import { LoginButton, LogoutButton, RegisterButton } from "./button"

export default function Header() {
    return (
        <header className="flex justify-center gap-6 mt-6">
           <h1 className="text-2xl ">連歌ますたぁ</h1> 
           <nav className="">
              <ul className="flex gap-4 justify-end">
                <li>ホーム</li>
                <li>発句する</li>
                <li>付句する</li>
                <li>マイ連歌</li>
                <li>遊び方</li>
                <li><LoginButton /></li>
                <li><RegisterButton /></li>
              </ul>  
           </nav>
        </header>
    )
}