import { createArticleDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/generateToken";
import {
  ARTICLES_PER_PAGE,
  createArticleSchema,
} from "@/utils/validationSchema";
import { PrismaClient, Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method  GET
 *  @route   ~/api/articles
 *  @desc    Get Articles By Page Number
 *  @access  public
 */

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || null;
    console.log(pageNumber);
    if (pageNumber !== null) {
      const paginationArticles = await prisma.article.findMany({
        skip: ARTICLES_PER_PAGE * (parseInt(pageNumber) - 1),
        take: ARTICLES_PER_PAGE,
      });
      return NextResponse.json(paginationArticles, { status: 200 });
    }
    const articles = await prisma.article.findMany();
    return NextResponse.json(
      { articles, length: articles.length },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
/**
 *  @method  POST
 *  @route   ~/api/articles
 *  @desc    POST Articles
 *  @access  private admin only
 */

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user?.isAdmin === false) {
      return NextResponse.json(
        { message: "only admins can add articles" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as createArticleDto;
    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          path: validation.error.errors[0].path[0],
          msg: validation.error.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }
    const newArtcle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newArtcle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
