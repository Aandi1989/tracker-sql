import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";
import { createIssue } from "@/sql/data";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest){
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({}, { status: 401 });
    }

    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status: 400 })
    };

    const newIssue = await createIssue(body.title, body.description);

    return NextResponse.json(newIssue, { status:201 });
}


