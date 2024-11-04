import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { jwtType, setCookie } from "@/utils/generateToken";
/**
 *  @method  post
 *  @route   ~/api/users/login
 *  @desc    user login account
 *  @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    //   check email
    if (!user) {
      return NextResponse.json(
        { message: "please make an account first,this email have no one" },
        { status: 400 }
      );
    }
    //   check password
    const isPass = await bcrypt.compare(body.password, user.password);
    if (!isPass) {
      return NextResponse.json(
        { message: "invalid password" },
        { status: 400 }
      );
    }
    //   generate token
    const jwtPayload: jwtType = {
      id: user.id,
      isAdmin: user.isAdmin,
      userName: user.userName,
    };
    // set cookie make toke in function
    const cookie = setCookie(jwtPayload);

    return NextResponse.json(
      { message: "Authenticated" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
