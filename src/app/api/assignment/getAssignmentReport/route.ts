import Users, { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { SignUp, completeAssignments } from "@/types/interface";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
  try {
const data: { name: any; completedBy: any; count: any; }[]=[]
    const rres2 = await CompleteAssignment.find({}).toArray();
    const users= await Users.find({}).toArray();


const allUser = users
.filter(x => x.userType === "Student")
.map(x => x.email);

const userAndUsersWhoCompletedPromises = rres2.map(async (y) => {
    const res = await Assignments.findOne({ _id: new ObjectId(y.assignmentId) });

    if (y.completedBy) {
        const emails = y.completedBy.map((user:any) => user.email);
        return { name: res!.name, completedBy: emails, count: y.completedCount };
    } else {
        return { name: res!.name, completedBy: null, count: y.completedCount };
    }
});

// Use Promise.all to wait for all promises to resolve
const userData=await Promise.all(userAndUsersWhoCompletedPromises)
    .then((userAndUsersWhoCompleted) => {
        console.log(userAndUsersWhoCompleted);
     return userAndUsersWhoCompleted
    })
    .catch((error) => {
        console.error(error);
    });
  console.log(allUser,userAndUsersWhoCompletedPromises!);

    return NextResponse.json({
        allUser,userData});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
