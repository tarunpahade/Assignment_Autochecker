import { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
  try {

    const req = await request.json();

    const { id } = req;
    const res = await Assignments.findOne({ _id: new ObjectId(id) });

    const rres2 = await CompleteAssignment.findOne({
      assignmentId: new ObjectId(id),
    });
    
    console.log(rres2!.completedCount, rres2!.completedBy);
    const completedBy=rres2!.completedBy || null
    return NextResponse.json({
      assignment: res,
      count: rres2!.completedCount,
      studentsWhoHaveCompleted: completedBy ,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
