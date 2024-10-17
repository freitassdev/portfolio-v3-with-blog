import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });
  const id = req.nextUrl.searchParams.get("id");
  const username = req.nextUrl.searchParams.get("username");
  try {
    if (id || username) {
      let usr;
      if (id) {
        usr = await prisma.user.findUnique({
          where: { id }
        });
      } else if (username) {
        usr = await prisma.user.findUnique({
          where: { username }
        });
      }

      if (usr) {
        const { password: pass, ...userForAdmin } = usr;
        const {
          password: pass2,
          email,
          createdAt,
          updatedAt,
          interestedTopics,
          permissions,
          ...userForUser
        } = usr;
        const userPosts = await prisma.post.findMany({
          where: {
            authorId: usr.id
          }
        })
        const user = session?.user.role === "ADMIN" ? userForAdmin : userForUser;
        if (!session || session.user.role === "USER")
          return NextResponse.json({ ...user, posts: userPosts }, { status: 200 });

        return NextResponse.json({ ...user, posts: userPosts, totalPosts: userPosts.length }, { status: 200 });
      }

      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!session || session.user.role === "USER")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const allUsers = await prisma.user.findMany();
    const usersWithoutPassword = allUsers.map(({ password, ...user }) => user);
    return NextResponse.json(usersWithoutPassword, { status: 200 });
  } catch (error) {
    console.log("Error while getting user/users", error);
    return NextResponse.json(
      { message: "Error Occured While getting the user/users." },
      { status: 500 }
    );
  }
}
