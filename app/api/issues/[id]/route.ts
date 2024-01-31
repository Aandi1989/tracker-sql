import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { deleteIssue, fetchIssueById, updateIssue } from "@/sql/data";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const issue = await fetchIssueById(params.id);
    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
    }

    const updatedIssue = await updateIssue(params.id, body.title, body.description);

    return NextResponse.json(updatedIssue);
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const issue = await fetchIssueById(params.id);

    if(!issue){
        return NextResponse.json({ error: 'Invalid issue'}, { status: 404})
    }

    await deleteIssue(params.id);

    return NextResponse.json({});
}