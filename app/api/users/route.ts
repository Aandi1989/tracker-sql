import { getUsers } from "@/sql/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const users = await getUsers();
    return NextResponse.json(users);
}