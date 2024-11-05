"use client";
import { DOMAIN } from "@/utils/validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.error("Please write something");
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="my-10">
      <input
        className="rounded-lg text-xl p-2 w-full text-black bg-white focus:shadow-md"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition"
      >
        Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
