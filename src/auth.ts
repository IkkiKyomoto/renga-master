import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import {User} from '@/app/lib/definitions';
import prisma from '@/app/lib/prisma';
import {passwordMatch} from '@/app/lib/hash';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [      
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
            let email : string
            let password : string
            if (credentials) {
              email = credentials.email as string
              password = credentials.password as string
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
              const isPasswordMatched = passwordMatch(password, user.password)
              //const passwordsMatch = await bcrypt.compare(password, user.password);
              console.log(isPasswordMatched)
              if (isPasswordMatched) return user;
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
  });