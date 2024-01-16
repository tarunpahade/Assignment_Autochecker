import Users, { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
import { uploadBase64Image } from "@/controllers/userController";
import { User } from "next-auth";
import { SignUp } from "@/types/interface";
config();

export async function POST(request: NextRequest) {
  try {
    const reqBody:SignUp[]  = await request.json();
    

    const res = await Users.insertMany(reqBody);
    
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
