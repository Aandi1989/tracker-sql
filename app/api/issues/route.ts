import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";
import { createIssue } from "@/sql/data";

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status: 400 })
    };

    const newIssue = await createIssue(body.title, body.description);

    return NextResponse.json(newIssue, { status:201 });
}


