import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    return NextResponse.json(
        { message: "not implemented" },
        { status: 501 }
    );
}
