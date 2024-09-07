
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { username, email, password } = await req.json();
        console.log({ username, email, password });

        const exists = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        })

        if (exists) {
            console.log('User already exists!')
            return NextResponse.json({ message: 'Username or Email Already Exists.' }, {
                status: 500
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: 'User Registered' }, { status: 201 });

    } catch (error) {
        console.log("Error while Registeing", error);
        return NextResponse.json({ message: 'Error Occured While Registering the user.' }, { status: 500 });
    }
}