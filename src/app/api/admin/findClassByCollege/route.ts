import  {Classes } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
config();
interface findTeachers {
    college: string,
    university: string
}

export async function POST(request: NextRequest) {
  try {
    const reqBody: any =await request.json();
        const {college,department}=reqBody
        const users = await Classes.find({}).toArray();
        let teachers;
        teachers = users.filter((teacher) => teacher.college === college);
        console.log(teachers,'this is teacher');
        teachers = teachers.filter((teacher) => teacher.department === department);

    return NextResponse.json(teachers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
