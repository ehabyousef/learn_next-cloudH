import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface pagination {
  pages: number;
  pageNumber: number;
  route: string;
}
export default function Pagination({ pageNumber, pages, route }: pagination) {
  let pagesArr: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArr.push(i);
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  // console.log(pagesArr);
  return (
    <div className="flex items-center justify-center my-10">
      {pageNumber !== 1 ? (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Prev
        </Link>
      ) : (
        <div className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-not-allowed">
          Prev
        </div>
      )}
      {pagesArr.map((page) => (
        <Link
          href={`${route}?pageNumber=${page}`}
          className={`${
            pageNumber === page ? "bg-gray-400" : ""
          } border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
          key={page}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages ? (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Next
        </Link>
      ) : (
        <div className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-not-allowed">
          Next
        </div>
      )}
    </div>
  );
}
