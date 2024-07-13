import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from 'bcrypt';
import {User} from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';

type ClientType = {
  clientId: string;
  clientSecret: string;
};

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    } as ClientType),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      id: "myCredential",
      type: "credentials",
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);

            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
 
            if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({token, user}) => {
      if (user) {
        const u = user as any
        return {
          ...token,
          email: u.email,
          id: u.id,
        }
      }
      return token
    },
    session: ({session, token}) => {
      return {
        ...session,
        user: {
          email: token.email,
          id: token.id,
        }
      }
    }
  },
  
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
