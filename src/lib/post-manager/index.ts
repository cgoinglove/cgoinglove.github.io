import { join } from 'path';
import { scan } from './scan';
import { arrayToMap } from '@lib/shared';

const AllPosts = scan(join(process.cwd(), 'src', 'posts', '*.mdx'));

const PostBySlug = arrayToMap(AllPosts, (post) => post.slug);

export const PostManager = {
  getBySlug: (slug: string) => PostBySlug.get(decodeURIComponent(slug)),
  getAll: () =>
    [...AllPosts].sort((a, b) => b.metadata.timestamp - a.metadata.timestamp),
};
