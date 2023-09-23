import Users, { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { assignments } from "@/types/interface";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
config();

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains"; 
import axios from "axios";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    console.log("Hello Boys");

    const req = await request.json();
    const {  currecntAssignment, email, submittedCode} = req;
    console.log(req, currecntAssignment._id);

    const res = await CompleteAssignment.findOne({
      assignmentId: new ObjectId(currecntAssignment._id),
    });
    const res2 = await Users.findOne({
      email:email,
    });
    console.log(res, "YOUY");
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with '0' if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Pad with '0' if needed

    const formattedDate = `${year}-${month}-${day}`;

    
    const model = new OpenAI({ temperature: 0 });
    const template =
      "Given a student's code submission for a specific programming assignment, please analyze the code and provide a comprehensive review. Evaluate the code for correctness, efficiency, and adherence to best practices. Identify any issues, bugs, or potential improvements in the code. Offer specific feedback, including code snippets or explanations for suggested changes. Additionally, rate the code on a scale of 1 to 5 based on its quality, with 5 being the highest rating. Provide comments or praise for well-written code segments. Your feedback should help the student understand areas for improvement and appreciate their coding skills \n Assignment: {Assignment} \n{Code}";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["Assignment", "Code"],
    });

    const chain = new LLMChain({ llm: model, prompt });
    const assignment = currecntAssignment.name;
    const result = await chain.call({
      Assignment: assignment,
      Code: 'Assignment name '+assignment+' Code Subbmited by user '+submittedCode,
    });
    console.log(result.text);



    const newCount = res!.completedCount++;
    const userCount = {
      email,
      date:formattedDate,
      result:result.text,
      submittedCode
    };


    if (res!.completedBy) {
      console.log("incomplete");

      const completed = res!.completedBy;
      
      
      completed.push(userCount);
      console.log(completed);
      
      res!.completedBy = completed;
    } else {
      console.log("No one");

      res!.completedBy = [userCount];
    }
    console.log(res, newCount);
    const finalResponse = await CompleteAssignment.findOneAndUpdate(
      { assignmentId: new ObjectId(currecntAssignment._id) },
      {
        $set: { completedBy: res!.completedBy },
        $inc: { completedCount: 1 },
      }
    );

    if (!finalResponse) {
      console.log("Document not found or not updated.");
    } else {
      console.log("Document updated successfully:", finalResponse);
    }
    console.log(finalResponse);

    console.log( currecntAssignment.name);
    
    ///  Get Repo Information For later
     // // Your GitHub Personal Access Token
    // const githubToken = res2!.personalAccessToken

    // // GitHub repository details
    // const owner = "tarunpahade";
    // const repo = "html";
    // const branch = "main"; // or any other branch you want to access
    // const pathToFile = "public/index.html"; // Path to the file you want to retrieve

    // const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pathToFile}?ref=${branch}`;

    // const headers = {
    //   Authorization: `Bearer ${githubToken}`,
    // };
    // const fileContent = await axios
    //   .get(apiUrl, { headers })
    //   .then((response: any) => {
    //     console.log(response.data);

    //     const fileContent = Buffer.from(
    //       response.data.content,
    //       "base64"
    //     ).toString("utf-8");
    //     console.log(fileContent);
    //     return fileContent;
    //   })
    //   .catch((error: any) => {
    //     console.error("Error fetching file:", error);
    //   });



    return NextResponse.json(finalResponse);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
