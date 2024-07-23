import { auth } from "@/auth";

import { LoginButton } from "./buttons/loginButton";
import { LogoutButton } from "./buttons/logoutButton";
import { RegisterButton } from "./buttons/registerButton";
import { Session } from "next-auth";

export default function AuthButtons({ session }: { session: Session | null }) {
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
