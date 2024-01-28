import { CompleteAssignment } from "@/dbconfig/dbconfig";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
config();
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { uploadBase64Image } from "@/controllers/userController";


interface usercountInterface {
  submittedCode?: any;
  name: string,
  date: string,
  markedAs: string,
  result?: any,
  image?: any
}



export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const req = await request.json();
    const {
      currecntAssignment,
      name,
      subbmissionType,
      submittedCode,
      imageData,
    } = req;
    console.log(req, "req from frontend");

    const res = await CompleteAssignment.findOne({
      assignmentId: new ObjectId(currecntAssignment._id),
    });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    let usercount: usercountInterface = {
      name,
      date: formattedDate,
      markedAs: "complete",

    }  

    if (subbmissionType === "code") {
      const model = new OpenAI({ temperature: 0 });
      const template =
        "Given a student's code submission for a specific programming assignment, please analyze the code and provide a comprehensive review. Evaluate the code for correctness, efficiency, and adherence to best practices. Identify any issues, bugs, or potential improvements in the code. Offer specific feedback, including code snippets or explanations for suggested changes. Additionally, assign Marks the code on a scale of 1 to 10 based on its quality, with 10 being the highest Marks. Provide comments or praise for well-written code segments. Your feedback should help the student understand areas for improvement and appreciate their coding skills \n Assignment: {Assignment} \n{Code}";
      const prompt = new PromptTemplate({
        template,
        inputVariables: ["Assignment", "Code"],
      });

      const chain = new LLMChain({ llm: model, prompt });

      const result = await chain.call({
        Assignment:
          "Assignment name " +
          "Assignment Details " +
          currecntAssignment.description +
          " Code Subbmited by user " +
          submittedCode,
        Code: submittedCode,
      });
      usercount.submittedCode = submittedCode;
      usercount.result = result.text;
    } else if (subbmissionType === "Pdf") {
      console.log("this is pdf");

      const awsS3link: any = await uploadBase64Image(imageData);
      usercount.image = awsS3link;
    }
    if (subbmissionType === "Image") {
      const awsS3link: any = await uploadBase64Image(imageData);
      usercount.image = awsS3link;
    }

    if (res!.completedBy) {
      const completed = res!.completedBy;

      completed.push(usercount);
      res!.completedBy = completed;
    } else {
      res!.completedBy = [usercount];
    }

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

    console.log(currecntAssignment.name);
    if (subbmissionType === "Code") {
      return NextResponse.json(usercount.result);
    }
    return NextResponse.json({ message: "Successfully Sent The Request", success: true });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
