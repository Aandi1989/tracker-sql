import { createUser, getUser } from "@/sql/data";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import bcrypt from 'bcrypt';

const schema =  z.object({
    email: z.string().email(),
    password: z.string().min(5)
});

export async function POST(request: NextRequest){
    const body = await request.json();
    
    const validation = schema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const user = await getUser(body.email);

    if(user){
        return NextResponse.json({ error: 'User already exists'}, { status: 400})
    };

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await createUser(body.email, hashedPassword);

    return NextResponse.json({ newUser });
}