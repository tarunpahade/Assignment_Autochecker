import { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { config } from "dotenv";
import { uploadBase64Image } from "@/controllers/userController";
import { assignments } from "@/types/interface";
config();



export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const image = reqBody.image;
    if (reqBody.image) {
      
      const awsS3link = await uploadBase64Image(image);
      reqBody.image = awsS3link;
    }
    const datainDatabase: assignments = {
      ...reqBody,
    };
 
    const res = await Assignments.insertOne(datainDatabase);

    const res3 = await CompleteAssignment.insertOne({
      assignmentId: res.insertedId,
      assignmentName: reqBody.name,
      dateUploaded: datainDatabase.dateUploaded,
      submissionDate: datainDatabase.submissionDate,
      uploadedBy: datainDatabase.uploadedBy,
      completedCount: 0,
    });
    console.log(res3);
    

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
