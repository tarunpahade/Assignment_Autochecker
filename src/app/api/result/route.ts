import Users, { Assignments } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
  import { config } from "dotenv";
  config();

  import { OpenAI } from "langchain/llms/openai";
  import { PromptTemplate } from "langchain/prompts";
  import { LLMChain } from "langchain/chains";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const { repolink, name } = await request.json();
    console.log(repolink, name);

    const axios = require("axios");

    // Your GitHub Personal Access Token
    const githubToken = process.env.PERSONAL_ACCESS_TOKEN;

    // GitHub repository details
    const owner = "tarunpahade";
    const repo = "html";
    const branch = "main"; // or any other branch you want to access
    const pathToFile = "index.html"; // Path to the file you want to retrieve

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pathToFile}?ref=${branch}`;

    const headers = {
      Authorization: `Bearer ${githubToken}`,
    };
    const fileContent = await axios
      .get(apiUrl, { headers })
      .then((response: any) => {
        console.log(response.data);

        const fileContent = Buffer.from(
          response.data.content,
          "base64"
        ).toString("utf-8");
        console.log(fileContent);
        return fileContent;
      })
      .catch((error: any) => {
        console.error("Error fetching file:", error);
      });
    console.log("yshs kaha");

    const model = new OpenAI({ temperature: 0 });
    const template =
      "Given a student's code submission for a specific programming assignment, please analyze the code and provide a comprehensive review. Evaluate the code for correctness, efficiency, and adherence to best practices. Identify any issues, bugs, or potential improvements in the code. Offer specific feedback, including code snippets or explanations for suggested changes. Additionally, rate the code on a scale of 1 to 5 based on its quality, with 5 being the highest rating. Provide comments or praise for well-written code segments. Your feedback should help the student understand areas for improvement and appreciate their coding skills \n Assignment: {Assignment} \n{Code}";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["Assignment", "Code"],
    });

    const chain = new LLMChain({ llm: model, prompt });
    const assignment = name;
    const result = await chain.call({
      Assignment: assignment,
      Code: fileContent,
    });
    console.log(result.text);

    return NextResponse.json(result.text);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
