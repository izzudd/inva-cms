import { Prisma } from '@prisma/client';
import db from '@/db';
import { defineEventHandler, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
    const identifier = event.context.params?.slug;
    if (!identifier) {
        setResponseStatus(event, 400);
        return { error: 'no identifier provided' }
    }
    try {
        return await deletePost(identifier);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            switch (error.code) {
                case 'P2025':
                    setResponseStatus(event, 404);
                    return { error: `post ${identifier} not found` }
            }
        setResponseStatus(event, 500);
        return { error: 'internal server error' };
    }
})

export function deletePost(idOrSlug: string | number) {
    const id = +idOrSlug || undefined;
    const slug = id ? undefined : idOrSlug as string;
    return db.post.update({
        where: { id, slug },
        data: {
            deletedAt: new Date(),
        }
    })
}
