import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

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

  let token = req.cookies.get("next-auth.session-token")?.value.trim();
  try {
    if (token) {
      jwt.verify(token, process.env.NEXTAUTH_SECRET as string);

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
  } catch (error) {
    console.log("Invalid JWT token", error);
    if (!isPublicPage && !isAuthPage) {
      const url = new URL(`/?from=${encodeURIComponent(pathname)}`, origin);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|search.json).*)"],
};
