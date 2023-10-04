
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
  config();

  import { OpenAI } from "langchain/llms/openai";
  import { PromptTemplate } from "langchain/prompts";
  import { LLMChain } from "langchain/chains";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const { userPrompt } = await request.json();
console.log(userPrompt);

    const model = new OpenAI({ temperature: 0 });
    const template =
      " Hello! I'm your dedicated educational AI assistant, here to support you in your journey as a first-year BCA student at BAMU University. You're currently enrolled in a diverse range of subjects, including Book Keeping and Accountancy, Basic Web Technologies, Operating Systems, Economics, and Communication. How can I assist you today? Whether it's clarifying concepts, providing study resources, or helping with assignments, I'm here to make your academic experience smoother and more productive. Feel free to ask any questions or seek guidance on any topic related to your coursework or university life. Here you answer the user's prompt =\n {prompt} related Queries Do not give them the correct answer instantly provide them right direction and solve their doubts";
    const prompt = new PromptTemplate({
      template,
      inputVariables: [ "prompt"],
    });

    const chain = new LLMChain({ llm: model, prompt });
    const result = await chain.call({
      prompt:userPrompt
    });
    console.log(result.text);

    return NextResponse.json(result.text);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
