"use client";
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/validationSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    setloading(true);
    try {
      await axios
        .post(`${DOMAIN}//api/users/login`, { email, password })
        .then((res) => {
          setloading(false);
          toast.success(res.data.message);
          router.replace("/");
          router.refresh();
        })
        .catch((err) => {
          setloading(false);
          toast.success(err.response.data.message);
        });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <form onSubmit={loginHandler} className="flex flex-col">
      <input
        className="mb-4 border rounded p-2 text-xl text-black"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 border rounded p-2 text-xl text-black"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
      >
        {loading ? <ButtonSpinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
