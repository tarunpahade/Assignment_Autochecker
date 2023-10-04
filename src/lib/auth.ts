import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { cookies } from "next/headers";

import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import Users from "@/dbconfig/dbconfig";
import { redirect, useRouter } from "next/navigation";

export const authOptions: NextAuthOptions = {
  secret: process.env.TOKEN_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "PAHADE TARUN NITIN",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials || !credentials.name || !credentials.password) {
          return null;
        }

        const name = credentials?.name as string;
        const password = credentials?.password as string;
let userType;

        console.log(name, password);
        console.log(credentials);
        if (password === "12345") {
          cookies().set("userRole", "Student");
          userType='Student'
        } else if (password === "54321") {
          cookies().set("userRole", "Teacher");
          userType='Teacher'
        }

        const token = cookies().get("next-auth.session-token");
        if (!token) {
          cookies().set("next-auth.session-token", password);
        }

        const user = await Users.findOne({ name });

        if (!user) {
          console.log("user Not Found");

          return null;
        }
        const session = {
          userType:cookies().get("userRole"),
          name: user.name,
        };
      
        return {
          ...session,
        } as any
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
