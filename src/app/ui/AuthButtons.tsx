import { auth } from "@/auth";

import { LoginButton } from "./buttons/loginButton";
import { LogoutButton } from "./buttons/logoutButton";
import { RegisterButton } from "./buttons/registerButton";

export default async function AuthButtons() {
  const session = await auth();
  return session ? (
    <div>
      <LogoutButton />
    </div>
  ) : (
    <ul className="flex gap-3">
      <li>
        <LoginButton />
      </li>
      <li>
        <RegisterButton />
      </li>
    </ul>
  );
}
