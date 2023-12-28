import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { config } from "dotenv";
config();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const payload  = req;
    console.log(req);

    // Submit code to runWithBull endpoint
    const { data } = await axios.post("http://localhost:3000/runWithBull", payload);
    console.log(data, 'this is data');
    return NextResponse.json({
        message: "Job completed",
        success: true,
        jobId: data.jobId,
      });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
