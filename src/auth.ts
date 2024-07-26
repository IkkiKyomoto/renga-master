import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/lib/definitions";
import { passwordMatch } from "@/app/lib/hash";
import { getUser } from "@/app/lib/data";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          let email: string;
          let password: string;
          if (credentials) {
            email = credentials.email as string;
            password = credentials.password as string;
          } else {
            console.log("No credentials");
            return null;
          }
          //console.log('Credentials')
          const user = await getUser(email);
          if (!user) {
            return null;
          }
          const isPasswordMatched = passwordMatch(
            password,
            user.password as string,
          );
          //const passwordsMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatched) {
            return user;
          }
          console.log("passwords do not match");
          return null;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
        token.sub = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.id = token.sub as string;
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   else return `${baseUrl}/`;
    // },
  },
});
