import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(
        credentials: Record<string, string> | null 
      ): Promise<null | { email: string; name: string; image: string}> {
        try {
          // console.log(credentials);
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (user) {
            //checkpass
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return {
                email: user.email,
                name: user.username,
                image:user.avatar,
              };
            } else {
              throw new Error("Wrong Email or Password");
            }
          } else {
            throw new Error("Wrong Email or Password");
          }
        } catch (error) {
          throw new Error("Wrong Email or Password");
        }
      },
    }),
  ],
  pages: {
    error: "/login",
  },
  session:{
    maxAge: 1800
  }
};
