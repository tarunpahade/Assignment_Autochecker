'use client'

import Users from "@/dbconfig/dbconfig";
import { useSession } from "next-auth/react";

export const useAuth = () => {
  const {data : session,status: loading} = useSession();

  const getUserDetails = async () => {
    if (loading==='authenticated' && session) {
      const user = await Users.findOne({ email: session.user.email });
      return user;
    }
    return null;
  };

  return { session, loading, getUserDetails };
};
