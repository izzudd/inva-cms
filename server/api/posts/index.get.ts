import db from '@/db';
import { defineEventHandler, getQuery, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as {
        take: string;
        skip: string;
    };

    try {
        return await getPosts({
            take: +query.take || undefined,
            skip: +query.skip || undefined
        });
    } catch (error) {
        setResponseStatus(event, 503);
    }
})

export async function getPosts({ take, skip }: { take?: number, skip?: number }) {
    const result = await db.post.findMany({
        take, skip,
        include: {
            author: true,
            series: true,
            tags: true
        }
    });

    return {
        length: result.length,
        first: result.length > 0 ? skip : undefined,
        posts: result,
    }
}