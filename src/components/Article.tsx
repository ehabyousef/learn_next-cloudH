import Image from "next/image";
import articleImage from "@/EnglishArticles.png";
import Link from "next/link";
import { Article } from "@prisma/client";

interface articleProps {
  article: Article;
}
export default function ArticleItem({ article }: articleProps) {
  return (
    <Link
      href={`articles/${article.id}`}
      key={article.id}
      className="group relative cursor-pointer"
    >
      <div className="w-full overflow-hidden rounded-md bg-gray-200 transition group-hover:opacity-75 lg:h-80">
        <Image
          alt="image"
          src={articleImage}
          className="h-full w-full object-fill object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            title:
            <span aria-hidden="true" className="absolute inset-0" />
            {article.title}
          </h3>
          <hr />
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            body:
            {article.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
