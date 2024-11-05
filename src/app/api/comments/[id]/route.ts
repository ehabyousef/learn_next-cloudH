import prisma from "@/utils/db";
import { CreateCommentDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  PUT
 *  @route   ~/api/comments
 *  @desc    user update comment
 *  @access  public
 */
interface Props {
  params: { id: string };
}
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in users" },
        { status: 401 } //forbidden
      );
    }
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "can't find comment" },
        { status: 404 }
      );
    }
    const body = (await request.json()) as CreateCommentDto;
    if (user.id === comment?.userId) {
      const updateComment = await prisma.comment.update({
        where: { id: parseInt(params.id) },
        data: {
          text: body.text,
        },
      });
      return NextResponse.json(updateComment, { status: 200 });
    }
    return NextResponse.json(
      { message: "only user can update his comment" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
/**
 *  @method  DELETE
 *  @route   ~/api/comments
 *  @desc    user DELETE comment
 *  @access  public
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in users" },
        { status: 401 }
      );
    }
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "can't find comment" },
        { status: 404 }
      );
    }
    if (user.id === comment?.userId || user.isAdmin === true) {
      await prisma.comment.delete({
        where: { id: parseInt(params.id) },
      });
      return NextResponse.json(
        { message: "deleted Comment successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "only user can delete his comment" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "intenrnal server error" },
      { status: 500 }
    );
  }
}
