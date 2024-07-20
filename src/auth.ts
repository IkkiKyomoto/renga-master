import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/lib/definitions";
import prisma from "@/app/lib/prisma";
import { passwordMatch } from "@/app/lib/hash";

async function getUser(email: string): Promise<User | undefined> {
  const data = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      password: true,
    },
    where: {
      email: email,
    },
  });
  const user = {
    id: data?.id as string,
    name: data?.name as string,
    password: data?.password as string,
  } as User;

  return user;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
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
            return null;
          }
          const user = await getUser(email);
          //console.log('Credentials')
          // const user = await getUser(email);

          if (!user) {
            return null;
          }
          const isPasswordMatched = passwordMatch(password, user.password as string);
          //const passwordsMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatched) {
            return user;
          }
          return null;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
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
