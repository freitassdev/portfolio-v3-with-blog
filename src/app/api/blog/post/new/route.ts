import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { zodUserType, UserSchema } from "@/zod/types";
import { TRequestNewPost } from "@/app/api/(types)/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      title,
      content,
      tags,
      imageUrl,
      simpleDescription,
    }: TRequestNewPost = await req.json();

    const session = await getServerSession({ req, ...authOptions });
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!title || !content || !tags || !simpleDescription || tags.length === 0)
      return NextResponse.json(
        { message: "Title, Content and Tags are required." },
        { status: 400 }
      );

    if (
      title.length < 5 ||
      content.length < 10 ||
      simpleDescription.length < 10 ||
      tags.length > 10 || 
      title.length > 100
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid propierts length. tags must have at most 10 elements.",
        },
        { status: 400 }
      );
    }
    const slug = title
      .toLowerCase()
      .normalize("NFD") // Decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
      .replace(/\s+/g, "-") // Substitui espaços por "-"
      .replace(/ç/g, "c") // Substitui "ç" por "c"
      .replace(/[^\w-]+/g, ""); // Remove caracteres especiais

    try {
      const hasPostWithSlug = await prisma.post.findFirst({
        where: {
          slug,
        },
      });

      if (hasPostWithSlug) {
        return NextResponse.json(
          { message: "Já existe um post com este título" },
          { status: 400 }
        );
      }

      await prisma.post.create({
        data: {
          title,
          content,
          imageUrl,
          simpleDescription,
          tags,
          authorId: session.user.id,
          authorName: session.user.fullName,
          slug,
        },
      });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Error while creating post" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Post created",
        data: {
          title,
          content,
          imageUrl,
          simpleDescription,
          tags,
          authorId: session.user.id,
          authorName: session.user.fullName,
          slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while creating post", error);
    return NextResponse.json(
      { message: "Error Occured While Registering the user." },
      { status: 500 }
    );
  }
}
