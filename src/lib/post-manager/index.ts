import { join } from 'path';
import { scan } from './scan';
import { arrayToMap } from '@lib/shared';

const AllPosts = scan(join(process.cwd(), 'src', 'posts', '*.mdx'));

const PostBySlug = arrayToMap(AllPosts, (post) => post.slug);

export const PostManager = {
  getBySlug: (slug: string) => PostBySlug.get(slug),
  getAll: () =>
    [...AllPosts].sort((a, b) => a.metadata.timestamp - b.metadata.timestamp),
};
