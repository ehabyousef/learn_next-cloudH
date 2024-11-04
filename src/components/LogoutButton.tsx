"use client";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/validationSchema";
import { useState } from "react";
import ButtonSpinner from "./ButtonSpinner";

const LogoutButton = () => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const logoutHandler = async () => {
    setloading(true);
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
      setloading(false);
    } catch (error) {
      setloading(false);
      toast.warning("Something went wrong");
      console.log(error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="bg-gray-700 text-gray-200 p-1 rounded"
    >
      {loading ? <ButtonSpinner /> : "Log out"}
    </button>
  );
};

export default LogoutButton;
