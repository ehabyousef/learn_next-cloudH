import { getArticlesSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/Article";
import { Article } from "@prisma/client";

interface SearchArticlePageProps {
  searchParams: { searchText: string };
}

const SearchArticlePage = async ({
  searchParams: { searchText },
}: SearchArticlePageProps) => {
  const articles: Article[] = await getArticlesSearch(searchText);

  return (
    <section className="fix-height container m-auto px-5">
      {articles.length === 0 ? (
        <>
          <h2 className="text-gray-500 text-2xl font-bold p-5">
            Articles based on
            <span className="text-red-500 mx-1">{searchText}</span>
            not found
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-gray-500 text-2xl font-bold p-5">
            Articles based on
            <span className="text-red-500 mx-1">{searchText}</span>
          </h2>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((art) => (
              <ArticleItem key={art.id} article={art} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SearchArticlePage;
