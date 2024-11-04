import { DOMAIN } from "@/utils/validationSchema";
import { Article } from "@prisma/client";

export async function getArticles(pageNumber: string): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`
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
