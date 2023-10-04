import Users, { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const { email } = await request.json();
    console.log("Hii", email);

    const user = await Users.findOne({ name: email });
  
  console.log('updated all users');
  
    console.log(user, "this is user");

    const res = await Assignments.find({}).toArray();
    console.log(res);

    const filteredAssignments = res.filter((x) => x.forYear === user!.year);
    console.log("theses aRAE Filteredf Assignments", filteredAssignments);

    const filter2 = await Promise.all(
      filteredAssignments.map(async (y) => {
        console.log("starting to map");

        const completed = await CompleteAssignment.findOne({
          assignmentId: y._id,
        });
        console.log(completed);
        const filteredAssignment = {
          ...y,
        };

        if (completed!.completedBy) {
          const filtered = completed!.completedBy;
          console.log(filtered);
          const emailExists = filtered.some(
            (feedback: any) => feedback.email === email
          );
          filteredAssignment.markedAs = "complete";
          filteredAssignment.submittedCode= filtered.find((feedback: any) => feedback.email === email)?.submittedCode
          const result = filtered.find((feedback: any) => feedback.email === email)?.result
          filteredAssignment.result=result
        } else {
          filteredAssignment.markedAs = "Incomplete";
          filteredAssignment.result = null;
        }

        return filteredAssignment;
      })
    );

    console.log(filter2, "This is filter 2");

    return NextResponse.json(filter2);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
