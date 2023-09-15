import { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
  try {

    const req = await request.json();
    console.log(req);

    const { id } = req;
    const res = await Assignments.findOne({ _id: new ObjectId(id) });
    console.log(res);
    
    const rres2 = await CompleteAssignment.findOne({
      assignmentId: new ObjectId(id),
    });

    console.log(rres2!.completedCount, rres2!.completedBy);

    return NextResponse.json({
      assignment: res,
      count: rres2!.completedCount,
      studentsWhoHaveCompleted: rres2!.completedBy,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
