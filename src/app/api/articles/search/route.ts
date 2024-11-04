import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
/**
 *  @method  GET
 *  @route   ~/api/articles/:id
 *  @desc    Get Articles
 *  @access  public
 */

export async function GET(request: NextRequest) {
  try {
    const serchText = request.nextUrl.searchParams.get("searchText");
    let articles;
    if (serchText) {
      articles = await prisma.article.findMany({
        where: { title: { startsWith: serchText, mode: "insensitive" } },
      });
      return NextResponse.json(articles, { status: 200 });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
      return NextResponse.json(articles, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
