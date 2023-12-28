import { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
import { uploadBase64Image } from "@/controllers/userController";
import { ObjectId } from "mongodb";
config();

interface Example {
    id: number;
    inputText: string;
    outputText: string;
    explanation: string;
    img?: string
}

interface Problem {
    id: string;
    title: string;
    difficulty: string;
    problemStatement: string;
    examples: Example[];
    constraints: string;
    starterCode: string;
    handlerFunction: string;
    starterFunctionName: string;
    order: number;
    language: string;
    uploadedBy: string;
    forSemester: number;
    dateUploaded: number;
    department: string; //THIS IS BCA || CSE
    college: string; // Here session?.user.college
    university: string; // Here session?.user.university
}

interface CompletedProblem {
    problemId: ObjectId,
    problemName: string,
    dateUploaded: string,
    uploadedBy: string,
    department: string; //THIS IS BCA || CSE
    college: string; // Here session?.user.college
    university: string;
    completedCount: number,
}
export async function POST(request: NextRequest) {
  try {
    const reqBody:  Problem = await request.json();
   
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1 and pad with '0' if needed
    const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with '0' if needed

    const formattedDate = `${year}-${month}-${day}`;

    const datainDatabase = {
      ...reqBody,
      dateUploaded: formattedDate
    };
    console.log(datainDatabase);
    console.log("Starting to insert in DB");

    const res = await Assignments.insertOne(datainDatabase);
const asat: CompletedProblem={
  problemId: res.insertedId,
  problemName: reqBody.id,
  dateUploaded: formattedDate,
  uploadedBy: reqBody.uploadedBy,
  department: reqBody.department,
  college: reqBody.college,
  university: reqBody.university,
  completedCount: 0
}
    const res3 = await CompleteAssignment.insertOne(asat);
    console.log(res3);
    

    return NextResponse.json(res3);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
