import Image from "next/image";
import travel from "@/travel.jpg";
import { Metadata } from "next";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { singleArticleType } from "@/utils/types";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/generateToken";
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
export default async function singleArticle({ params }: Props) {
  const article: singleArticleType = await getSingleArticle(params.id);
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  await new Promise((resolve) => setTimeout(resolve, 2000));
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
        <div className="flex items-center flex-col justify-center w-full gap-4">
          <h2 className="text-xl text-gray-300">id :{article.id}</h2>
          <h3 className="text-xl text-gray-300">title :{article.title}</h3>
          <hr />
          <p className="mt-1 text-xl text-gray-300 line-clamp-2">
            body :{article.description}
          </p>
          <h4 className="text-xl text-gray-500">
            createdAt :{new Date(article.createdAt).toDateString()}
          </h4>
        </div>
      </div>
      {payload ? (
        <AddCommentForm articleId={article.id} />
      ) : (
        <p className="text-blue-500">log in to add comments</p>
      )}
      <h4 className="text-xl text-gray-400 ps-1 mb-2 mt-7">comments</h4>
      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
      ))}
    </div>
  );
}
