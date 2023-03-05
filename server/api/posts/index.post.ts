import { Prisma } from '@prisma/client';
import db from '@/db';
import slugify from 'slugify';
import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { getPost } from './[slug].get';

interface PostData {
    title: string;
    content: string;
    author: number;
    tags: number[];
    series: number;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<PostData>(event);

    try {
        return await createPost(body);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientValidationError) {
            setResponseStatus(event, 403);
            return { error: error.message }
        }
        setResponseStatus(event, 500);
        return { error: (error as { message: string }).message || 'Internal server error' };
    }
});

export async function createPost(data: PostData) {
    let slug = slugify(data.title, {
        lower: true,
        strict: true,
    });
    while (await slugExist(slug)) slug = incrementSlug(slug);

    const result = await db.post.create({
        data: {
            title: data.title,
            slug,
            content: data.content,
            author: {
                connect: { id: data.author }
            },
            series: {
                connect: { id: data.series }
            },
            tags: {
                connect: data.tags.map(tag => ({ id: tag }))
            }
        }
    });
    return await getPost(result.id);
}

async function slugExist(slug: string) {
    return !!(await getPost(slug))?.slug
}

function incrementSlug(slug: string) {
    const [slugPart, num] = slug.split('--');
    return +num
        ? `${slugPart}--${+num + 1}`
        : `${slugPart}--1`;
}

