import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decode, getToken } from "next-auth/jwt";

const publicPages = ["/", "/images/*", "/spheron.glb"];
const authPages = ["/auth/*"];
const protectedPages = ["/dashboard"];

const testPagesRegex = (pages: string[], pathname: string) => {
  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const pagePattern = pages
    .map((page) => {
      if (page.endsWith("/*")) {
        return `${escapeRegex(page.slice(0, -2))}(?:/.*)?`;
      }
      return escapeRegex(page);
    })
    .join("|");

  const regex = `^(?:${pagePattern})(?:/|\\?|#|$)`;
  if (!pathname.endsWith("/")) {
    pathname += "/";
  }
  return new RegExp(regex, "i").test(pathname);
};

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const isPublicPage = testPagesRegex(publicPages, pathname);
  const isAuthPage = testPagesRegex(authPages, pathname);
  const isProtectedPage = testPagesRegex(protectedPages, pathname);

  // const token = req.cookies.get("next-auth.session-token")?.value.trim();
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  const token = await getToken({ req, secret });
  
  if (token) {
    if (isAuthPage) {
      const url = new URL("/", origin);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } else {
    if (isPublicPage || isAuthPage) {
      return NextResponse.next();
    }

    const url = new URL(`/?from=${encodeURIComponent(pathname)}`, origin);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|search.json).*)"],
};
