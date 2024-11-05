import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/generateToken";

import { Metadata } from "next";
import { getArticles } from "@/apiCalls/articleApiCall";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import Pagination from "@/components/articles/Pagination";
import { ARTICLES_PER_PAGE } from "@/utils/validationSchema";
import Link from "next/link";
import DeleteArticleButton from "./DeleteArticleButton";
export const metadata: Metadata = {
  title: "article",
};
interface AdminArticlesTableProps {
  searchParams: { pageNumber: string };
}
export default async function articlesPage({
  searchParams: { pageNumber },
}: AdminArticlesTableProps) {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLES_PER_PAGE);

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-400">Articles</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block lg:p-2">Created At</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-t border-gray-300">
              <td className="p-3 text-gray-400">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-400 font-normal p-3">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-3">
                <Link
                  href={`/admin/articles-table/edit/${article.id}`}
                  className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </td>
              <td className="hidden lg:inline-block p-3">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800"
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/articles-table"
      />
    </section>
  );
}
