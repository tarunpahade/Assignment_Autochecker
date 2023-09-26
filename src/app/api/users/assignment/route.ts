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
      repoLink: "Disabled Github Integration For Now",
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

    /////                  Adding Repo Disabled For Now
    // const octokit = new Octokit({
    //   auth: process.env.PERSONAL_ACCESS_TOKEN,
    // });
    // console.log("starting to create repo", process.env.PERSONAL_ACCESS_TOKEN);
    // const sanitizedDescription = reqBody.description.replace(/[\x00-\x1F\x7F]/g, "");

    // const createRepoResponse = await octokit.request("POST /orgs/DITMS/repos", {
    //   org: "ORG",
    //   name: reqBody.name,
    //   description: sanitizedDescription,
    //   homepage: "https://github.com",
    //   private: false,
    //   has_issues: true,
    //   has_projects: true,
    //   has_wiki: true,
    //   headers: {
    //     "X-GitHub-Api-Version": "2022-11-28",
    //   },
    // });
    // console.log(createRepoResponse, "response created");

    // const repoName = createRepoResponse.data.name; // Get the repository name

    /////                  Adding Readme Disabled For Now
    // Replace these variables with your organization and repository details
    //     const orgName = "DITMS";

    //     const path = "README.md"; // You can specify a different path if needed
    //     const readmeContent = `## ${reqBody.name} ${reqBody.description}
    // ## Screenshots
    // ![alt text](${awsS3link})`;
    //     console.log("Adding readme");

    //     // Encode the content as base64
    //     const contentBase64 = Buffer.from(readmeContent).toString("base64");
    //     // Make a PUT request to create or update the README file
    //     const res2 = await octokit.request(
    //       "PUT /repos/{owner}/{repo}/contents/{path}",
    //       {
    //         owner: orgName,
    //         repo: repoName,
    //         path: path,
    //         message: "Create README2",
    //         content: contentBase64,
    //       }
    //     );
    //     console.log(res, "ReadMe added");

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
