import Users, { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const data: { name: any; completedBy: any; count: any }[] = [];
    const rres2 = await CompleteAssignment.find({}).toArray();
    const users = await Users.find({}).toArray();
    const newenail = new Set(); // Use a Set to store unique emails

    const allUser = users
      .filter((x) => x.userType === "Student")
      .map((x) => x.name);

    const userAndUsersWhoCompletedPromises = rres2.map(async (y) => {
      const res = await Assignments.findOne({
        _id: new ObjectId(y.assignmentId),
      });

      if (y.completedBy) {
        const name = y.completedBy.map((user: any) => user.name);
        y.completedBy.forEach((name: any) => newenail.add(name.name)); 
console.log(name,y);

        return {
          name: res!.name,
          completedBy:name,
          count: y.completedCount,
        };
      } else {
        return { name: res!.name, completedBy: null, count: y.completedCount };
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
      allUser,
      userData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
