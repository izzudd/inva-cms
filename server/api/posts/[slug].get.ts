import db from '@/db';
import { defineEventHandler, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
    const identifier = event.context.params?.slug as string;
    const post = await getPost(identifier);
    if (!post) {
        setResponseStatus(event, 404);
        return { error: `post ${identifier} not found` };
    }
    return post;
})

export function getPost(idOrSlug: string | number) {
    const id = +idOrSlug || undefined;
    const slug = id ? undefined : idOrSlug as string;
    return db.post.findFirst({
        where: { id, slug },
        include: {
            author: true,
            series: true,
            tags: true
        }
    })
}
