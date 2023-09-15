
import bcryptjs from "bcryptjs";
import { NextResponse ,NextRequest} from "next/server";
import Users from "@/dbconfig/dbconfig";
export async function POST(request: NextRequest,response: NextResponse) {
  try {
    const reqBody = await request.json()
   

    const { email, password } = reqBody;

    //check if user exists
  
    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user already exists",user ,email);

    //check password is correct
    const vaildPassword = await bcryptjs.compare(password, user.password);
    console.log(vaildPassword);
    
    if (!vaildPassword) {
      console.log('Invalid');
      
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    console.log(user);

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
 
    return response;
  } catch (error: any) {
    console.log('tHIS IS ERROR', error);
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
