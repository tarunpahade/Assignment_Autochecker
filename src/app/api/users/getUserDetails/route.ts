import { CompletedProblems, Problems } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";


config();

interface reqInterface {
  name: string;
  rollno: number;
  semester: number;
  course: string;
  college: string;
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody: reqInterface = await request.json();
    console.log(reqBody, "This is request body");
    const { name ,college, course,rollno, semester }= reqBody
    const problems = await Problems.find({}).toArray();
    console.log(problems, "starting to map");

    // Later Add Filters like filter by college course and semester 
    // const filteredAssignments = res.filter((x) => x.forYear === user!.year);


    const filter2 = await Promise.all(
      problems.map(async (y) => {
        console.log("starting to map");

        //Searches for problem in a ID
        const completed = await CompletedProblems.findOne({ 
          problemId: y._id,
        });
        
        const filteredAssignment = {
          ...y,
        };

        //Checks if the problem is completed by the user or not
        if (completed!.completedBy  && Array.isArray(completed!.completedBy)) {
          const filtered = completed!.completedBy;
console.log('Yhis is complete');

          const emailExists = filtered.some(
            (feedback: any) => feedback.name === name
          );
          if (emailExists) {
            console.log(filtered,'this is filtered');
          
            filteredAssignment.completed = true
            //filteredAssignment.submittedCode= filtered.find((feedback: any) => feedback.name === name)?.submittedCode
            //const result = filtered.find((feedback: any) => feedback.name === name)?.result
            //filteredAssignment.result=result
           
          }  else {
            filteredAssignment.completed = false;
            console.log('This is Incomplete');
            
            // filteredAssignment.result = null;
          }
          
        } else {
          filteredAssignment.completed = false;

        }

        return filteredAssignment;
      })
    );

    return NextResponse.json({ output: filter2, success: true }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
