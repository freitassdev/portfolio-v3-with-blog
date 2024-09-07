import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { zodUserType, UserSchema } from "@/zod/types";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: zodUserType = await req.json();

    const parsedBody = UserSchema.safeParse(body);
    if (!parsedBody.success) {
      const serverErrors = Object.fromEntries(
        parsedBody.error?.issues?.map((issue) => [
          issue.path[0],
          issue.message,
        ]) || []
      );

      return NextResponse.json(
        {
          errors: serverErrors,
          message: "Validation Error",
        },
        { status: 400 }
      );
    }
    const { email, password, username, fullName } = parsedBody.data;

    const existsEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    const existsUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existsEmail) {
      return NextResponse.json(
        { message: "Email já cadastrado." },
        { status: 500 }
      );
    }

    if (existsUsername) {
      return NextResponse.json(
        { message: "Nome de usuário já cadastrado." },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        fullName: fullName,
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    console.log("Error while Registeing", error);
    return NextResponse.json(
      { message: "Error Occured While Registering the user." },
      { status: 500 }
    );
  }
}
