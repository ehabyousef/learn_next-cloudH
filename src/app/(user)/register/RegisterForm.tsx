"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    try {
      await axios
        .post(`${DOMAIN}/api/users/register`, { email, password, userName })
        .then((res) => {
          setloading(false);
          toast.success(res.data.message);
          router.replace("/login");
          router.refresh();
        })
        .catch((err) => {
          setloading(false);
          toast.error(err?.response?.data.messsage);
          console.log(err?.response?.data?.messsage);
        });
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error?.response?.data.message);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        className="text-black mb-4 border rounded p-2 text-xl"
        type="text"
        placeholder="Enter Your UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className="text-black mb-4 border rounded p-2 text-xl"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="text-black mb-4 border rounded p-2 text-xl"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="text-2xl   -white bg-blue-800 p-2 rounded-lg font-bold"
      >
        {loading ? <ButtonSpinner /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
