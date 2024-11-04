import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { verifyToken } from "@/utils/generateToken";
import { UpdateUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchema";

/**
 *  @method  post
 *  @route   ~/api/users/profile/id
 *  @desc    user delete his account
 *  @access  public
 */
interface Props {
  params: { id: string };
}
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comments: true },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      // delete user account
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      // delete comments from that user
      const commentsId = user?.comments.map((c) => c.id);
      await prisma.comment.deleteMany({
        where: { id: { in: commentsId } },
      });
    }
    return NextResponse.json(
      { message: "account deleted successfully" },
      { status: 200 }
    );
    return NextResponse.json(
      { message: "only user can delete his profile" },
      { status: 403 } //forbidden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
/**
 *  @method  GET
 *  @route   ~/api/users/profile/id
 *  @desc    user GET his account
 *  @access  public
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        comments: true,
        id: true,
        userName: true,
        createdAt: true,
        isAdmin: true,
        email: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json(
      { message: "only user can GET his profile" },
      { status: 403 } //forbidden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
/**
 *  @method  PUT
 *  @route   ~/api/users/profile/id
 *  @desc    user update his account
 *  @access  public
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "only user can update his profile" },
        { status: 403 } //forbidden
      );
    }
    const body = (await request.json()) as UpdateUserDto;
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updateUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        userName: body.userName,
        email: body.email,
        password: body.password,
      },
      select: {
        id: true,
        userName: true,
        createdAt: true,
        email: true,
      },
    });
    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
