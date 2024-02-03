import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import { deleteIssue, fetchIssueById, getUserById, updateIssue } from "@/sql/data";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({}, { status: 401 });
    }

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    };

    if(body.assigninedToUserId){
        const user = await getUserById(body.assigninedToUserId); 
        if(!user){
            return NextResponse.json({ error: 'Invalid user.'}, { status: 400})
        }
    }

    const issue = await fetchIssueById(params.id);
    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
    }

    const updatedIssue = await updateIssue(params.id, body.title, body.description, body.assigninedToUserId);

    return NextResponse.json(updatedIssue);
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({}, { status: 401 });
    }


    const issue = await fetchIssueById(params.id);

    if(!issue){
        return NextResponse.json({ error: 'Invalid issue'}, { status: 404})
    }

    await deleteIssue(params.id);

    return NextResponse.json({});
}