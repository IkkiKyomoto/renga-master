import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from 'bcrypt';
import {User} from '@/app/lib/definitions';
import prisma from '@/app/lib/prisma';

type ClientType = {
    clientId: string;
    clientSecret: string;
  };

export const authOptions: NextAuthOptions = {
    pages: {
      signIn: "/login",
      // error: "/login",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      } as ClientType),
      Credentials({
        name: 'Credentials',
        credentials: {
          email: {type: "text" },
          password: {type: "password" }
        },
        async authorize(credentials, req) {
          const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);


          if (parsedCredentials.success) {
            let email
            let password
            if (credentials) {
              email = credentials.email
              password = credentials.password
            } else {
              return null
            }
            const data = await prisma.user.findFirst({
              where: {
                email: email
              }
            }
            
            )
            const user = {
              id: data?.id as string,
              name: data?.name as string,
              email: data?.email as string,
              password: data?.password as string,
              createdAt: data?.createdAt as Date,
              updatedAt: data?.updatedAt as Date,
            } as User
              console.log('Credentials')
              // const user = await getUser(email);
  
              if (!user) return null;
              const passwordsMatch = await bcrypt.compare(password, user.password);
              console.log(passwordsMatch)
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