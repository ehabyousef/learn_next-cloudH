import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken");
  const authToken = jwtToken?.value as string;
  if (!authToken && request.method === "DELETE") {
    return NextResponse.json(
      { message: "no token provided ,access denied" },
      { status: 401 } //unauthorized
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/profile/:path*",
};
