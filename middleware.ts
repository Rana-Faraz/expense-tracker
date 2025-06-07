import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";

type Session = typeof auth.$Infer.Session;

const protectedRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    const { data: session } = await betterFetch<Session>(
      process.env.BETTER_AUTH_URL + "/api/auth/get-session",
      {
        baseURL: req.nextUrl.origin,
        headers: {
          //get the cookie from the req
          cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (!session) {
      return NextResponse.redirect(new URL("/admin/sign-in", req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
