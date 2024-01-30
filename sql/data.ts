import sql from 'sql-template-strings';
import { executeQuery } from '../sql/db';
import { unstable_noStore as noStore } from 'next/cache';

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
        throw new Error('Failed to fetch revenue data.');
    }
}