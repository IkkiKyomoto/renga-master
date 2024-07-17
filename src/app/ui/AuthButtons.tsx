

import { LoginButton } from "./buttons/loginButton";
import { LogoutButton } from "./buttons/logoutButton";
import { RegisterButton } from "./buttons/registerButton";

export default function AuthButtons({session} : {session: any}) {
  return session ? (
    <div>
      <li>
        <LogoutButton />
      </li>
    </div>
  ) : (
    <div className="flex gap-3">
      <li>
        <LoginButton />
      </li>
      <li>
        <RegisterButton />
      </li>
    </div>
  );
}
