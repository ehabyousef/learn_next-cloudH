"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { commentWithUser } from "@/utils/types";
import axios from "axios";
import { DOMAIN } from "@/utils/validationSchema";
import { useRouter } from "next/navigation";
interface commentInterface {
  comment: commentWithUser;
  userId?: number;
}
const CommentItem = ({ comment, userId }: commentInterface) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const deleteComment = async () => {
    try {
      if (confirm("want to delete the comment")) {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment?.user?.userName}
        </strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-800 mb-2">{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center">
          <FaEdit
            onClick={() => setOpen(true)}
            className="text-green-600 text-xl cursor-pointer me-3"
          />
          <FaTrash
            onClick={deleteComment}
            className="text-red-600 text-xl cursor-pointer"
          />
        </div>
      )}
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;
