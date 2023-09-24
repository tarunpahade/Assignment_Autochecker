import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { cookies } from 'next/headers'

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
        email: {
          label: "Email",
          type: "email",
          placeholder: "abc@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const userType = credentials?.userType as string;

        console.log(email, password);
        console.log(credentials);
        const oneDay = 24 * 60 * 60 * 1000
        cookies().set('userRole', userType)
  const token = cookies().get("next-auth.session-token")
  if(!token){
 cookies().set("next-auth.session-token",password)

  }

        const user = await Users.findOne({ email });

        if (!user) {
          console.log("user Not Found");

          return null;
        }
        if (user.userType.toUpperCase() !== userType.toUpperCase()) {
          console.log(userType, user.userType);

          console.log("UserType Specified Not Correct ");

          return null;
        }

        const vaildPassword = await bcryptjs.compare(password, user.password);
        console.log(vaildPassword);

        if (vaildPassword) {
          console.log("Hurray Valid Pass");

          return user;
        }
        return {
          user,
        } as any;
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
