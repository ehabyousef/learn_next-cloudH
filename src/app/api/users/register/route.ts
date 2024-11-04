import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";
/**
 *  @method  post
 *  @route   ~/api/users/register
 *  @desc    create account
 *  @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return NextResponse.json(
        { messsage: "user already exist" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        userName: body.userName,
        password: hashedPassword,
      },
      select: {
        id: true,
        userName: true,
        email: true,
        isAdmin: true,
      },
    });
    const cookie = setCookie({
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      userName: newUser.userName,
    });
    return NextResponse.json(
      { ...newUser, message: "Registered && Authenticated" },
      { status: 201, headers: { "Set-Cokkie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server erro" },
      { status: 500 }
    );
  }
}
