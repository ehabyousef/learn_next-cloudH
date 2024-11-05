import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/Article";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import prisma from "@/utils/db";
import { ARTICLES_PER_PAGE } from "@/utils/validationSchema";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "articles page",
    template: "%s | articles page",
  },
  description: "cloud hosting next js",
};
interface ArticlesPageNumberProps {
  searchParams: { pageNumber: string };
}
// main function
export default async function Articles({
  searchParams,
}: ArticlesPageNumberProps) {
  const { pageNumber } = searchParams;
  await new Promise((reso) => setTimeout(reso, 1000));
  const articles = await getArticles(pageNumber);
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLES_PER_PAGE);
  console.log(pages);
  return (
    <div className="">
      <div
        className="flex flex-col mx-auto px-4 py-4 sm:px-6 lg:px-8"
        style={{ minHeight: "90vh" }}
      >
        <SearchArticleInput />
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>
        <Pagination
          pageNumber={parseInt(pageNumber)}
          route="/articles"
          pages={pages}
        />
      </div>
    </div>
  );
}
