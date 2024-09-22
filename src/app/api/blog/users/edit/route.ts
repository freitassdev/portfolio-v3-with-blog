import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  try {
    if (id) {
      const usr = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (usr) {
        const { password, ...user } = usr;
        return NextResponse.json(user, { status: 200 });
      }

      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User ID is required." },
      { status: 400 }
    );
  } catch (error) {
    console.log("Error while getting user", error);
    return NextResponse.json(
      { message: "Error Occured While getting the User." },
      { status: 500 }
    );
  }
}
