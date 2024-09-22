import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    if (id) {
      const usr = await prisma.user.findFirst({
        where: {
          id: id
        },
      });
      if (usr) {
        const { password, ...user } = usr;
        return NextResponse.json(user, { status: 200 });
      }

      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

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
