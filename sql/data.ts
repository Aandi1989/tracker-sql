'use server';

import sql from 'sql-template-strings';
import { executeQuery } from '../sql/db';
import { Issue, Status } from './definitions';

export async function createIssue(title: string, description: string){
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


export async function fetchIssues(
    status?: Status, 
    orderBy?: keyof Issue, 
    direction?: string ,
    limit?: number, 
    offset?: number, 
    assigned: boolean = false) {
    try {
        const query = `SELECT issue.*` + 
            (assigned ? ` ,user.image` : '') +
            (` FROM issue` ) +
            (assigned ? ` LEFT JOIN user ON issue.assigninedToUserId = user.id` : '') +
            (status ? ` WHERE status = '${status}'` : '') +
            (orderBy ? ` ORDER BY ${orderBy}` : '') +
            (direction ? ` ${direction}` : '') +
            (limit ? ` LIMIT ${limit}` : '') +
            (offset ? ` OFFSET ${offset}` : '' );
        // console.log(query)
        const data = await executeQuery(query);
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch issue data.');
    }
}



export async function fetchIssueById(id: string) {
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

export async function updateIssue(id: string, title: string, description: string, assigninedToUserId?: string){
    try {
        const data = await executeQuery(sql`
            UPDATE issue
            SET 
                title = ${title}, 
                description = ${description}, 
                updateAt =  CURRENT_TIMESTAMP(3), 
                assigninedToUserId = ${assigninedToUserId}
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

export async function getUser(email: string){
    try {
        const data = await executeQuery(sql`
            SELECT *
            FROM user
            WHERE email = ${email}
        `);
        // @ts-ignore   /* тк из базы данных мы получаем массив с одним объектом */
        return data[0] || null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to get user.');
    }
}

export async function createUser(email: string, password: string){
    try {
        const data = await executeQuery(sql`
            INSERT INTO user (
                email, 
                hashedPassword
                )
            VALUES (
                ${email}, 
                ${password} 
                )
        `);
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create user.');
    }
}

export async function getUsers(){
    try {
        const data = await executeQuery(sql`
            SELECT *
            FROM user
            ORDER BY name ASC
        `);
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to get users.');
    }
}

export async function getUserById(id: string){
    try {
        const data = await executeQuery(sql`
            SELECT *
            FROM user
            WHERE id = ${id}
        `);
        // @ts-ignore   /* тк из базы данных мы получаем массив с одним объектом */
        return data[0] || null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to get user.');
    }
}

