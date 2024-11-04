"use client";

import Link from "next/link";
interface errorPage {
  error: Error;
  reset: () => void;
}
export default function error({ error, reset }: errorPage) {
  return (
    <div className="h-80 text-xl w-full text-center flex flex-col justify-center items-center gap-3">
      <p>error page</p>
      <h3 className="text-red-600">error :{error.message}</h3>
      <button
        className="text-xl text-blue-500 capitalize font-bold"
        onClick={() => reset()}
      >
        Try again
      </button>
      <Link href="/">click to go to Home page</Link>
    </div>
  );
}
