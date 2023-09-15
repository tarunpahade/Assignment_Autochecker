import { Assignments } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

import axios from "axios";
import { config } from "dotenv";
config();

// ...

export async function POST(request: NextRequest) {
  try {
    console.log("Hii");

    const reqBody = await request.json();

    const octokit = new Octokit({
      auth: process.env.PERSONAL_ACCESS_TOKEN,
    });

    // Replace these variables with your organization and repository details
    const orgName = "DITMS";
    const repoName = "Create-a-Hospital-website";
    const path = "README.md"; // You can specify a different path if needed
    const readmeContent =
      `## ${reqBody.name}${reqBody.description}
      ## Screenshots
      ![image](${reqBody.image})`;

    // Encode the content as base64
    const contentBase64 = Buffer.from(readmeContent).toString("base64");
    // Make a PUT request to create or update the README file
 const res=   await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: orgName,
      repo: repoName,
      path: path,
      message: "Create README2",
      content: contentBase64,
    });
console.log(res);

    console.log(`README.md created successfully in ${orgName}/${repoName}`);
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
