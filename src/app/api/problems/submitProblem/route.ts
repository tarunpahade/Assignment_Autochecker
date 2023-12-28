import { CompleteAssignment, CompletedProblems } from "@/dbconfig/dbconfig";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
config();

interface CompletedProblem {
  problemName: string;
  name: string;
  rollno: number; // Here session?.user.rollno
  department: string; //THIS IS BCA || CSE
  college: string; // Here session?.user.college
  university: string; // Here session?.user.university
}

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const req = await request.json();
    const { pid, name , rollno , department , college , university } = req;
    console.log(req);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1 and pad with '0' if needed
    const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with '0' if needed

    const formattedDate = `${year}-${month}-${day}`;

const hio={
  name: name,
  pid,
  subbmitedDate: formattedDate,
  rollno,
  college,
  university,
}

      

      const completed = {
        name: name,
        rollno,
       uploadedOn: formattedDate
      };
const comp=req.completedBy
      comp.push(completed)
  
    const finalResponse = await CompleteAssignment.findOneAndUpdate(
      { assignmentId: new ObjectId(req._id) },
      {
        $set: { completedBy: req!.completedBy },
        $inc: { completedCount: 1 },
      }
    );

    if (!finalResponse) {
      console.log("Document not found or not updated.");
    } else {
      console.log("Document updated successfully:", finalResponse);
    }

    return NextResponse.json({
      message: "Submitted code successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
