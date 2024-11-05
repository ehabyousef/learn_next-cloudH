import { DOMAIN } from "@/utils/validationSchema";
import { Article, Comment } from "@prisma/client";
import { singleArticleType } from "@/utils/types";

export async function getArticles(pageNumber: string): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("error article");
  }
  return response.json();
}
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to get articles count");
  }

  const { count } = (await response.json()) as { count: number };
  return count;
}
export async function getArticlesSearch(
  searchText: string
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`
  );

  if (!response.ok) {
    throw new Error("Failed to get articles count");
  }

  return response.json();
}
export async function getSingleArticle(
  articleId: string
): Promise<singleArticleType> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("error article");
  }
  return response.json();
}

// Get all comments
export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}
