import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
/**
 *  @method  GET
 *  @route   ~/api/users/logot
 *  @desc    user logout account
 *  @access  public
 */
export async function GET(request: NextRequest) {
  try {
    cookies().delete("jwtToken");
    return NextResponse.json({ message: "logout" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
