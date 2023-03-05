import { describe, test, assert } from "vitest";
import { getPosts } from '@/server/api/posts/index.get';
import { getPost } from "~~/server/api/posts/[slug].get";

describe('posts:get', () => {
    test('get post with id', async () => {
        const result = await getPost(1);
        assert.exists(result);
        assert.isNotArray(result);
        assert.equal(result?.id, 1);
    });

    test('get post with slug', async () => {
        const postSlug = (await getPost(1))?.slug;
        if (!postSlug) assert.fail('post not found');

        const result = await getPost(postSlug);
        assert.isNotArray(result);
        assert.equal(result?.id, 1);
        assert.equal(result?.slug, postSlug);
    });

    test('get non existing post', async () => {
        const result = await getPost(9999);
        assert.notExists(result);
    });

    test('get posts', async () => {
        const result = await getPosts({});
        assert.isArray(result.posts);
    });

    test('get posts skip 10', async () => {
        const result = await getPosts({skip: 10});
        assert.equal(result.first, 10);
    });

    test('get 5 posts skip 10', async () => {
        const result = await getPosts({skip: 10, take: 5});
        assert.equal(result.first, 10);
        assert.equal(result.length, 5);
    });

    test('get non existing posts', async () => {
        const result = await getPosts({skip: 9999});
        assert.isEmpty(result.posts);
        assert.notExists(result.first);
    })
})