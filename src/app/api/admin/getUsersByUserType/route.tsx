import Users, { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
import { uploadBase64Image } from "@/controllers/userController";
import { User } from "next-auth";
import { SignUp } from "@/types/interface";
config();
interface findTeachers {
    college: string,
    university: string
}

export async function POST(request: NextRequest) {
  try {
    
    
        const reqBody: any =await request.json();
        const {college,userType}=reqBody
        
        const users = await Users.find({}).toArray();
//console.log(users,college);

        let teachers;
        teachers = users.filter((teacher) => teacher.userType === userType);
        console.log(teachers,'this is teachjer');
        
          teachers = teachers.filter((teacher) => teacher.college === college);
  //console.log(teachers);
  
    
    return NextResponse.json(teachers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
