'use server';

import sql from 'sql-template-strings';
import { executeQuery } from '../sql/db';
import { unstable_noStore as noStore } from 'next/cache';
import { Issue, Status } from './definitions';

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

// these strings dont work 
// const data = await executeQuery(sql`SELECT * FROM issue ORDER BY ${orderBy}`)
// const data = await executeQuery(sql`SELECT * FROM issue WHERE status = ${status} ORDER BY title`)


export async function fetchIssues(status?: Status, orderBy?: keyof Issue) {
    try {
       if(!status && !orderBy){
        const data = await executeQuery(sql`SELECT * FROM issue`)
        return data;
       }
       else if(status || orderBy){
            if(status){
                const data = await executeQuery(sql`SELECT * FROM issue WHERE status = ${status}`)
                return data;
            }else{
                // doesn't work
                // const data = await executeQuery(sql`SELECT * FROM issue ORDER BY ${orderBy}`)
                if(orderBy === 'title'){
                    const data = await executeQuery(sql`SELECT * FROM issue ORDER BY title`)
                    return data;
                }
                if(orderBy === 'status'){
                    const data = await executeQuery(sql`SELECT * FROM issue ORDER BY status`)
                    return data;
                }
                if(orderBy === 'createdAt'){
                    const data = await executeQuery(sql`SELECT * FROM issue ORDER BY createdAt`)
                    return data;
                }
            }
       }else{
        // this sql request doesn't work
        if(orderBy === 'title'){
            const data = await executeQuery(sql`SELECT * FROM issue WHERE status = ${status} ORDER BY title`)
            return data;
        }
        if(orderBy === 'status'){
            const data = await executeQuery(sql`SELECT * FROM issue WHERE status = ${status} ORDER BY status`)
            return data;
        }
        if(orderBy === 'createdAt'){
            const data = await executeQuery(sql`SELECT * FROM issue WHERE status = ${status} ORDER BY createdAt`)
            return data;
        }
       }
    } catch (error) {
        console.log('error is here')
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

export async function updateIssue(id: string, title: string, description: string, assigninedToUserId?: string){
    noStore();
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

