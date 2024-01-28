import Users, {
  Classes,
  CompleteAssignment,
} from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

// Data That I need To Collect
//  1. Assignments Fetch All And Show Based On Choosen Assignments
//  2. Get Assignment Name and Number of People that Have Completed Assignments

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username , college, university } = reqBody;

    const rres3 = await Classes.find({}).toArray();

    const rres2 = await CompleteAssignment.find({}).toArray();

    const rres4 = await Users.find({}).toArray();

    const filteredClasses=rres2.filter((teacher) => teacher.uploadedBy === username);

    const filteredAssignments = rres3.filter((assignment) => 
    assignment.teachers.map((teacher: { name: any; }) => teacher.name === username));
    
    const filteredUsers = rres4.filter(user => user.college === college);
    filteredUsers.filter(user => user.university === university);
    filteredUsers.filter(user => user.userType === 'Student');


    
    return NextResponse.json({
      classList:  filteredAssignments,
      assignments:filteredClasses,
      users: filteredUsers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
