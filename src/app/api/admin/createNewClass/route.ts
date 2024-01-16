import { NextRequest, NextResponse } from "next/server";
import  Users, { Classes } from "@/dbconfig/dbconfig";
import {  SignUp, classProps } from "@/types/interface";

interface CreateClass {
  students: SignUp[];
  classDetails: classProps
}

export async function POST(request: NextRequest) {
  try {
    const reqBody :CreateClass= await request.json();
    console.log(reqBody);

  
    const savedUser = await Classes.insertOne(reqBody.classDetails);
    const res = await Users.insertMany(reqBody.students);
console.log(res.insertedCount);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}