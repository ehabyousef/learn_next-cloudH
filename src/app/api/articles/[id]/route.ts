import { NextRequest, NextResponse } from "next/server";
import { updateArticleDto } from "@/utils/dtos";
import { PrismaClient } from "@prisma/client";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/generateToken";

interface Props {
  params: { id: string };
}

/**
 *  @method  GET
 *  @route   ~/api/articles/:id
 *  @desc    Get Articles
 *  @access  public
 */

export async function GET(request: NextRequest, props: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(props.params.id),
      },
      include: {
        comments: {
          include: {
            User: {
              select: {
                userName: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
/**
 *  @method  PUT
 *  @route   ~/api/articles/:id
 *  @desc    update Articles
 *  @access  private admin only
 */
export async function PUT(request: NextRequest, props: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user?.isAdmin === false) {
      return NextResponse.json(
        { message: "only admins can add articles" },
        { status: 403 }
      );
    }
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(props.params.id),
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    const body = (await request.json()) as updateArticleDto;
    const updateArticle = await prisma.article.update({
      where: { id: parseInt(props.params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updateArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
/**
 *  @method  DELETE
 *  @route   ~/api/articles/:id
 *  @desc    DELETE Articles
 *  @access  private admin only
 */
export async function DELETE(request: NextRequest, props: Props) {
  try {
    const user = verifyToken(request);
    if (user === null || user?.isAdmin === false) {
      return NextResponse.json(
        { message: "only admins can add articles" },
        { status: 403 }
      );
    }
    const article = await prisma.article.findUnique({
      where: { id: parseInt(props.params.id) },
      include: { comments: true },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    // delete article
    await prisma.article.delete({ where: { id: parseInt(props.params.id) } });
    // delete comments on article
    const commentsId = article?.comments.map((c) => c.id);
    await prisma.comment.deleteMany({
      where: { id: { in: commentsId } },
    });
    return NextResponse.json({ msg: "article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
