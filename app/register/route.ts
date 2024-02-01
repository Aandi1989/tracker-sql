import { NextRequest } from "next/server";
import { z } from 'zod';

z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

export async function POST(request: NextRequest){
    const body = await request.json();
}