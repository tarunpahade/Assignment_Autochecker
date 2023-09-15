import { Assignments } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest,res: NextResponse){
    try {
  console.log('Yoyo');
  
      const res=await Assignments.find({}).toArray()
      console.log(res);
      
   
      return NextResponse.json(res);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }