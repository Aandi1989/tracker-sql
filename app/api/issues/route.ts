import { NextRequest, NextResponse } from "next/server";
import sql from 'sql-template-strings';
import { executeQuery } from '../../../sql/db';
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status: 400 })
    };

    try {
        await executeQuery (sql`
              INSERT INTO issue (
                title, 
                description, 
                updateAt
                )
              VALUES (
                ${body.title}, 
                ${body.description}, 
                CURRENT_TIMESTAMP(3)
                )
            `);

            return NextResponse.json(body, {status: 201})
      } catch (error) {
            console.log(error)
            return NextResponse.json({ message: error }, { status: 500 });

      }
    /* для получения полного содержания созданной записи запрос должен выглядеть так
    try {
        const result = await executeQuery (sql`
              INSERT INTO issue (title, description, updateAt)
              VALUES (${body.title}, ${body.description}, CURRENT_TIMESTAMP(3))
        `);

        const insertedId = result.insertId;

        const [createdIssue] = await executeQuery(sql`
              SELECT * FROM issue WHERE id = ${insertedId}
        `);

        return NextResponse.json(createdIssue, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
    */
}


