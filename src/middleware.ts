import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/profile") {
    const response = NextResponse.next();
    const theme = request.cookies.get("theme");
    if (!theme) {
      response.cookies.set("theme", "dark");
    }
    // return NextResponse.rewrite(new URL("/", request.url));
  }
  //   return NextResponse.redirect(new URL("/", request.url));
}
// export const config = {
//   matcher: "/profile",
// };
