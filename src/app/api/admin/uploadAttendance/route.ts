import { Attendance } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
import { attendance } from "@/types/interface";
config();

export async function POST(request: NextRequest) {
  try {
    
    
        const reqBody: attendance =await request.json();
        
        

        const savedUser = await Attendance.insertOne(reqBody);
   
    
    return NextResponse.json(savedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
