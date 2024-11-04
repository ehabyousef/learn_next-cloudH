import prisma from "@/utils/db";
import { CreateCommentDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/generateToken";
import { createCommentSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  POST
 *  @route   ~/api/comments
 *  @desc    user add comment
 *  @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in users" },
        { status: 403 } //forbidden
      );
    }
    const body = (await request.json()) as CreateCommentDto;
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
/**
 *  @method  GET
 *  @route   ~/api/comments
 *  @desc    (admin) get all comments
 *  @access  private admin
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin can get it" },
        { status: 403 } //forbidden
      );
    }
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
