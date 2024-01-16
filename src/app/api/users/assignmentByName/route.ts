import Users, { Assignments, CompleteAssignment } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const req = await request.json();

    const { name } =req
    console.log(name,req,'this is name anfd request');
    
    const user = await Users.findOne({ name });  

    const res = await Assignments.find({}).toArray();

    const filteredAssignments = res.filter((x) => x.semester=== user!.semester);
    const filteredAssignments2 = filteredAssignments.filter((x) => x.department=== user!.department);

    console.log("Theses are Filtered Assignments", filteredAssignments);

    const filter2 = await Promise.all(
      filteredAssignments2.map(async (y) => {

        const completed = await CompleteAssignment.findOne({ 
          assignmentId: y._id,
        });

        const filteredAssignment = {
          ...y,
        };

        if (completed!.completedBy  && Array.isArray(completed!.completedBy)) {
          const filtered = completed!.completedBy;

          const nameExists = filtered.some(
            (feedback: any) => feedback.name === name
          );
          if (nameExists) {
            console.log(filtered,'this is filtered');
          
            filteredAssignment.markedAs = "complete";
            filteredAssignment.submittedCode= filtered.find((feedback: any) => feedback.name === name)?.submittedCode
            const result = filtered.find((feedback: any) => feedback.name === name)?.result
            filteredAssignment.result=result
           
          }  else {
            filteredAssignment.markedAs = "Incomplete";
            filteredAssignment.result = null;
          }
          
        }

        return filteredAssignment;
      })
    );

    return NextResponse.json(filter2);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
