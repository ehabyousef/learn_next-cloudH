"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { toast } from "react-toastify";

const CommentItem = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">ehab</strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">
          22/10/2024
        </span>
      </div>
      <p className="text-gray-800 mb-2">new comment</p>
      <div className="flex justify-end items-center">
        <FaEdit className="text-green-600 text-xl cursor-pointer me-3" />
        <FaTrash className="text-red-600 text-xl cursor-pointer" />
      </div>
      {/* {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )} */}
    </div>
  );
};

export default CommentItem;
