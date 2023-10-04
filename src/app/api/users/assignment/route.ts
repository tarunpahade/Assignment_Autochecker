import { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { config } from "dotenv";
import { uploadBase64Image } from "@/controllers/userController";
config();

interface assignmentsDatabase {
  name: string;
  description: string;
  dateUploaded: string;
  submissionDate: string;
  image: string;
  uploadedBy: string;
  forYear: string;
  repoLink: string;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const image = reqBody.image;
    if (reqBody.image) {
      const awsS3link = await uploadBase64Image(image);
      reqBody.image = awsS3link;
      console.log(awsS3link, "this is link for api");
      console.log(reqBody);
    }
    const datainDatabase: assignmentsDatabase = {
      ...reqBody,
    };
    console.log(datainDatabase);
    console.log("Starting to insert in DB");

    const res = await Assignments.insertOne(datainDatabase);

    const res3 = await CompleteAssignment.insertOne({
      assignmentId: res.insertedId,
      assignmentName: reqBody.name,
      
      dateUploaded: datainDatabase.dateUploaded,
      submissionDate: datainDatabase.submissionDate,
      uploadedBy: datainDatabase.uploadedBy,
      repoLink: datainDatabase.repoLink,
      completedCount: 0,
    });
    console.log(res3);
    

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
