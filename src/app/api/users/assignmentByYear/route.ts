import Users, { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { completeAssignments } from "@/types/interface";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const { email } = await request.json();
    console.log("Hii", email);

    const user = await Users.findOne({ email: email });

    console.log(user, "this is user");

    const res = await Assignments.find({}).toArray();
    console.log(res);

    const filteredAssignments = res.filter((x) => x.forYear === user!.year);
    //this checks if user has completed the given assignment
    const filter2 = await Promise.all(filteredAssignments.map(async (y) => {
      console.log("starting to map");

      const completed = await CompleteAssignment.findOne({
        assignmentId: y._id,
      });
      console.log(completed);

      const filtered = completed!.completedBy;
      console.log(filtered);
      const emailExists = filtered.some(
        (feedback: any) => feedback.email === email
      );
      console.log(emailExists, "tyhsi sis email exisita");
      y.markedAs = emailExists ? "complete" : "incomplete";

      console.log("comparison", email);
      const result = emailExists
      ? filtered.find((feedback: any) => feedback.email === email)?.result
      : null;
      return { ...y, markedAs: emailExists ? "complete" : "incomplete" ,result};
    }))
    console.log("yoyo");

    console.log(filter2, "thsi si filter 2");

    return NextResponse.json(filter2);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
