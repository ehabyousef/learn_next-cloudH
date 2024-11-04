import { serialize } from "cookie";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export type jwtType = {
  id: number;
  isAdmin: boolean;
  userName: string;
};
export function GenerateToken(jwtPayload: jwtType) {
  const token = Jwt.sign(jwtPayload, process.env.Jwt_Secret as string, {
    expiresIn: "7d",
  });
  return token;
}
// set cookiles
export function setCookie(jwtPayload: jwtType) {
  const token = GenerateToken(jwtPayload);
  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", //all pages
    maxAge: 60 * 60 * 24 * 30, //30 day
  });
  return cookie;
}
// verify token
export function verifyToken(request: NextRequest) {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;
    const userPayload = Jwt.verify(
      token,
      process.env.Jwt_Secret as string
    ) as jwtType;
    return userPayload;
  } catch (error) {
    return null;
  }
}
// verify tokenForPage
export function verifyTokenForPage(token: string) {
  try {
    const userPayload = Jwt.verify(
      token,
      process.env.Jwt_Secret as string
    ) as jwtType;
    return userPayload;
  } catch (error) {
    return null;
  }
}
