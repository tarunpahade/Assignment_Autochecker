// pages/api/problems/getProblem.js

import { Problems } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
   

    try {
        const req =await request.json();
        const {id} = req 
        console.log(id, 'this is Id');

        const problem = await Problems.findOne({ id: id });
        console.log(problem, 'this is backend');

        if (!problem) {
    return NextResponse.json({ error: 'Problem not found' }, { status: 500 });

        }

        return NextResponse.json({ problem });
    } catch (error:any) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message });
    }
}
