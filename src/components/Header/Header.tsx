import { verifyTokenForPage } from "@/utils/generateToken";
import { cookies } from "next/headers";
import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import LogoutButton from "../LogoutButton";
export default function Header() {
  const cookie = cookies().get("jwtToken")?.value || "";
  const user = verifyTokenForPage(cookie);
  return (
    <header className="flex justify-between w-full bg-gray-800 py-6 px-4 md:px-8">
      <nav className="flex justify-between w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl text-green-700"
        >
          cloud
          <GrTechnology color="white" />
          hosting
        </Link>
        <ul className="hidden md:flex gap-4 items-center text-xl capitalize">
          <Link href="/">Home</Link>
          <Link href="/articles?pageNumber=1">articles</Link>
          <Link href="/about">about</Link>
          {user?.isAdmin && <Link href="/admin">admin</Link>}
        </ul>
        {user ? (
          <div className="flex items-center justify-center gap-2 text-xl font-black">
            <p>{user.userName}</p>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-4 capitalize text-xl">
            <Link
              href="/login"
              className="text-gray-950 bg-slate-200 p-2 rounded-lg "
            >
              login
            </Link>
            <Link
              href="/register"
              className="text-gray-950 bg-slate-200 p-2 rounded-lg "
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
