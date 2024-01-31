'use server';

import sql from 'sql-template-strings';
import { executeQuery } from '../sql/db';
import { unstable_noStore as noStore } from 'next/cache';

export async function createIssue(title: string, description: string){
    noStore();
    try{
        const data = await executeQuery (sql`
              INSERT INTO issue (
                title, 
                description, 
                updateAt
                )
              VALUES (
                ${title}, 
                ${description}, 
                CURRENT_TIMESTAMP(3)
                )
            `);
            return data;
      }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to create issue data.');
      }
}

export async function fetchIssues() {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
        const data = await executeQuery(sql`
            SELECT *
            FROM issue
    `)
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch issue data.');
    }
}

export async function fetchIssueById(id: string) {
    noStore();
    try {
        const data = await executeQuery(sql`
            SELECT *
            FROM issue
            WHERE id = ${id}
    `);
        // @ts-ignore   /* тк из базы данных мы получаем массив с одним объектом */
        return data[0] || null;
     
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch issue data.');
    }
}

export async function updateIssue(id: string, title: string, description: string){
    noStore();
    try {
        const data = await executeQuery(sql`
            UPDATE issue
            SET title = ${title}, description = ${description}, updateAt =  CURRENT_TIMESTAMP(3)
            WHERE id = ${id}
        `);
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update issue data.');
    }
}

export async function deleteIssue(id: string){
    try {
        const data = await executeQuery(sql`
            DELETE FROM issue
            WHERE id = ${id}
        `);
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete issue.');
    }
}

