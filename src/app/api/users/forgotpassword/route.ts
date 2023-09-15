
import Users from "@/dbconfig/dbconfig";
import { sendMail } from "@/helpers/mailer";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email } = reqBody;
  //Check if user already exists
  const user1 = await Users.findOne({ email: email });
  if (!user1) {
    return NextResponse.json(
   
        { error: "User Does not exist" },
   {statusText:"User Does not exist"}
    );
  }

  const res = await sendMail({
    email: email,
    emailtype: "reset",
    userId: Math.random().toString(36).substring(10),
  });
  console.log(res);
  return NextResponse.json(
    { message: "Mail sent to Your email", success: true },
    { status: 200 }
  );
}
