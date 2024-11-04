import Image from "next/image";
import travel from "@/travel.jpg";
import { Metadata } from "next";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
interface singleArticle {
  params: { id: string };
}
type Props = {
  params: {
    id: string;
  };
};
export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `article ${params.id}`,
  };
};
export default async function singleArticle({ params }: singleArticle) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const article = await response.json();
  return (
    <div className="w-5/6 md:w-2/3 mx-auto my-32">
      <div className="w-full xl:w-1/2 mx-auto">
        <Image
          alt="image"
          src={travel}
          className="h-full w-full object-contain object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h2 className="text-sm text-gray-700">
            id:
            <span aria-hidden="true" className="absolute inset-0" />
            {article.id}
          </h2>
          <h3 className="text-sm text-gray-700">
            title:
            <span aria-hidden="true" className="absolute inset-0" />
            {article.title}
          </h3>
          <hr />
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            body:
            {article.body}
          </p>
        </div>
      </div>
      <AddCommentForm />
      <h4 className="text-xl text-gray-800 ps-1 mb-2 mt-7">comments</h4>
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}
