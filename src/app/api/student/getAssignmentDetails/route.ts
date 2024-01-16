import { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const reqBody = await request.json();
    const { username } = reqBody;
    console.log("this is username of the man", username);

    const res = await Assignments.find({}).toArray();
    console.log(res, "this is list of assignment");

    const rres2 = await CompleteAssignment.find({}).toArray();
    console.log("this ios ress 2", rres2);

    const newenail = new Set();
    const userAndUsersWhoCompletedPromises = rres2.map(async (y) => {
      const res = await Assignments.findOne({
        _id: new ObjectId(y.assignmentId),
      });
      if (y.completedBy === null || y.completedBy === undefined) {
        console.log("this is null");

        return {
          name: res!.name,
          completedBy: null,
          count: y.completedCount,
          ...res,
        };
      } else if (y.completedBy) {
        const name = y.completedBy.map((user: any) => user.name === username);
        console.log(name[0], "tame");

        y.completedBy.forEach((name: any) => newenail.add(name.name));
        return {
          name: res!.name,
          completedBy: name[0],
          count: y.completedCount,
          ...res,
        };
      } else {
        return {
          name: res!.name,
          completedBy: null,
          count: y.completedCount,
          ...res,
        };
      }
    });

    // Use Promise.all to wait for all promises to resolve
    const userData = await Promise.all(userAndUsersWhoCompletedPromises)
      .then((userAndUsersWhoCompleted) => {
        return userAndUsersWhoCompleted;
      })
      .catch((error) => {
        console.error(error);
      });

    return NextResponse.json({
      userData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
