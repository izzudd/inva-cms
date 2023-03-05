import { describe, test, assert } from "vitest";
import { createPost } from '@/server/api/posts/index.post';
import { faker } from "@faker-js/faker";

describe('posts:post', () => {
    test('create post', async () => {
        const result = await createTestPost(faker.lorem.sentences());
        assert.exists(result);
    });

    test('create incremented slug for post with same title', async () => {
        const title = faker.lorem.sentences();
        for (let i=0; i<3; i++){
            const slug = (await createTestPost(title))?.slug;
            if (!slug) {
                assert.exists(slug);
                return;
            }

            const [_, num] = slug.split('--');
            if (i === 0) assert.notExists(num)
            else assert.equal(+num, i);
        }
    });
});

function createTestPost(title: string){
    return createPost({
        title,
        content: faker.lorem.paragraphs(5),
        tags: [1, 2, 3],
        series: 2,
        author: 1,
    });
}