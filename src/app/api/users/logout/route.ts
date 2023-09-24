import { signOut } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    cookies().delete("next-auth.session-token");
    cookies().delete("userRole");
    console.log('hiii');
    
console.log('yooo');

    return NextResponse.json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
