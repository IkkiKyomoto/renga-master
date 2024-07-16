
import {LoginButton} from "./buttons/loginButton";
import { LogoutButton } from "./buttons/logoutButton";
import { RegisterButton } from "./buttons/registerButton";
import { auth } from "@/auth";


export default async function AuthButtons() {
  const isAuthorized = await auth()
 return (
  isAuthorized ? <div><li><LogoutButton/></li></div> : <div className="flex gap-3">
    <li><LoginButton /></li>
    <li><RegisterButton /></li>
    </div>
 ) 
}



